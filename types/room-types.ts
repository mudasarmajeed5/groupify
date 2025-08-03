export type Column = {
    id: string,
    title: string
}
export interface RoomMembers {
    role: string;
    user: {
        name: string;
        profile_url: string;
    } | {
        name: string;
        profile_url: string;
    }[];
    user_id: string;
}
export type TodoComment = {
    id: string;
    todo_id: string;
    commented_by: string;
    commented_at: string;
    comment: string;
    room_id: string;
};
export type Todo = {
    id: string;
    todo_title: string;
    todo_priority: "high" | "medium" | "low";
    room_id: string;
    status: "incomplete" | "pending" | "completed";
    created_at: string;
    created_by: string;
    assigned_to: string;
    due_date: string;
    completed_at: string | null;
    description: string;
};