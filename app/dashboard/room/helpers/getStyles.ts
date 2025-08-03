import { Column } from "../../../../types/room-types";

export function getStyles(column: Column) {
    switch (column.id) {
        case 'incomplete':
            return 'border-red-200 rounded-lg border-2 border-dashed p-4';
        case 'pending':
            return 'border-yellow-200 rounded-lg border-2 border-dashed p-4';
        case 'completed':
            return 'border-green-200 rounded-lg border-2 border-dashed p-4';
        default:
            return 'border-gray-200 rounded-lg border-2 border-dashed p-4';
    }
}
export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high': return 'bg-red-100 text-red-800 border-red-200';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'low': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};