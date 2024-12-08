// Endpoint:  https://vital-amused-ram.ngrok-free.app/api/webhooks/user


import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'



export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    interface UserEventData {
        id: string | null;
        email_addresses: { email_address: string | null }[];
        first_name: string | null;
        last_name: string | null;
        image_url: string | null;
    }

    const eventType = evt.type
    console.log(`Received webhook with event type of ${eventType}`)
    console.log('Webhook payload:', body)

    if (eventType === "user.created" || "user.updated") {
        try {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data as UserEventData

            //create a user in MySQL
            const upsertedUser = await prisma.user.upsert({
                where: { external_id: id ?? '' },
                update: {
                    email: email_addresses[0]?.email_address ?? '',
                    first_name: first_name ?? '',
                    last_name: last_name ?? '',
                    photo: image_url ?? ''
                },
                create: {
                    external_id: id ?? '',
                    email: email_addresses[0]?.email_address ?? '',
                    first_name: first_name ?? '',
                    last_name: last_name ?? '',
                    photo: image_url ?? ''
                },

            });
            console.log("New User Upserted Successfully!", upsertedUser);




        } catch (error) {
            return new Response("Error creating user in database", { status: 400 });

        }
    }

    if (eventType === "user.deleted") {
        try {
            const { id } = evt.data

            //delete a user in MySQL
            const deletedUser = await prisma.user.delete({
                where: { external_id: id ?? '' }
            });
            console.log("User Deleted Successfully!", deletedUser);

        } catch (error) {
            return new Response("Error deleting user in database", { status: 400 });

        }
    }
}
