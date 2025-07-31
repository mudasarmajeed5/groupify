export interface Room {
    room_id: string,
    room_name: string,
    room_description: string,
    created_by: string,
    created_at: Date
}
export interface UserRooms {
    room_id: string,
    user_id: string,
    status: string,
    role: string,
    joined_at: Date
}
export interface NewRoom {
    room_name: string,
    room_description: string,
}