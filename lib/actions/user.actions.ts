"use server"

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { handleError } from '@/lib/utils'
import { CreateUserParams, UpdateUserParams } from '@/types'


/**1.
 * Creates a new user in the database.
 *
 * @param {CreateUserParams} new_user - The parameters for creating a new user.
 * @returns {Promise<any>} The newly created user object.
 * @throws Will throw an error if the user creation fails.
 */
export async function createUser(new_user: CreateUserParams) {
    try {

        const newUser = await prisma.user.create({ data: new_user })
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

/**2.
 * Retrieves a user by their unique external ID.
 *
 * @param {string} user_id - The external ID of the user to retrieve.
 * @returns {Promise<object>} The user object if found.
 * @throws {Error} If the user is not found or if an error occurs during retrieval.
 */
export async function getUserById(user_id: string) {
    try {

        const user = await prisma.user.findUnique({
            where: {
                user_id: user_id
            }
        })

        if (!user) throw new Error('User not found')
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}

/**3.
 * Updates a user in the database with the given external ID and update parameters.
 * @param external_id - The external ID of the user to update.
 * @param update_user - The parameters to update the user with.
 * @returns The updated user object.
 * @throws If the user update fails.
 */
export async function updateUser(user: string, update_user: UpdateUserParams) {
    try {

        const updatedUser = await prisma.user.update({
            where: { user_id: user },
            data: update_user
        })

        if (!updatedUser) throw new Error('User update failed')
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error)
    }
}

/**4.
 * Deletes a user from the database based on the provided external ID.
 * 
 * This function performs the following steps:
 * 1. Finds the user to delete using the provided external ID.
 * 2. If the user is not found, throws an error.
 * 3. Unlinks relationships by updating the 'events' and 'orders' collections to remove references to the user.
 * 4. Deletes the user from the database.
 * 5. Revalidates the root path.
 * 
 * @param {string} external_id - The external ID of the user to delete.
 * @returns {Promise<object|null>} - The deleted user object, or null if the user was not found.
 * @throws {Error} - If the user is not found.
 */
export async function deleteUser(user: string) {
    try {

        // Find user to delete
        const userToDelete = await prisma.user.findUnique({
            where: {
                user_id: user
            }
        })

        if (!userToDelete) {
            throw new Error('User with ID ${user} not found')
        }

        // Unlink relationships
        await prisma.$transaction([
            // Update the 'events' collection to remove references to the user
            prisma.event.updateMany({
                where: { organizer_id: userToDelete! },
                data: { organizer: null }
            }),

            // Update the 'orders' collection to remove references to the user
            prisma.order.updateMany({
                where: { user_id: userToDelete.user_id },
                data: { user_id: "" }
            }),
        ])

        // Delete user
        const deletedUser = await prisma.user.delete({ where: { user_id: userToDelete.user_id } })
        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
        handleError(error)
    }
}