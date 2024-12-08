// ====== USER PARAMS
export type CreateUserParams = {
    user_id: string
    first_name: string
    last_name: string
    email: string
    photo: string
}

export type UpdateUserParams = {
    email: string
    first_name: string
    last_name: string
    photo: string
}

// ====== EVENT PARAMS
export type CreateEventParams = {
    user_id: string
    event: {
        title: string
        description: string
        location: string
        image_url: string
        start_at: Date
        terminate_at: Date
        category_id: string
        price: number
        isFree: boolean
        url: string
    }
    path: string
}

export type UpdateEventParams = {
    organizer_id: string
    event: {
        id: number
        title: string
        image_url: string
        description: string
        location: string
        start_at: Date
        terminate_at: Date
        category_id: string
        price: number
        isFree: boolean
        url: string
    }
    path: string
}

export type DeleteEventParams = {
    event_id: number
    path: string
}

export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
}

export type GetEventsByUserParams = {
    user_id: string
    limit?: number
    page: number
}

export type GetRelatedEventsByCategoryParams = {
    category_id: string
    event_id: string
    limit?: number
    page: number | string
}

export type Event = {
    event_id: number
    title: string
    description: string
    price: number
    isFree: boolean
    image_url: string
    location: string
    start_at: Date
    terminate_at: Date
    url: string
    organizer_id: string
    category_id: number
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
    category_name: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
    title: string //event title
    event_id: string
    price: string
    isFree: boolean
    user_id: string // buyer id
}

export type CreateOrderParams = {
    stripe_id: string
    event_id: string
    user_id: string // buyer id
    total_amount: string
    created_at: Date
}

export type GetOrdersByEventParams = {
    event_id: string
    search_string: string
}

export type GetOrdersByUserParams = {
    user_id: string | null
    limit?: number
    page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}