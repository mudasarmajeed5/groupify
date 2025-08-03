import { useDraggable } from "@dnd-kit/core"
import { Todo } from "@/types/room-types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import { getPriorityColor } from "../helpers/getStyles";
import { AssignTodo } from "./AssignTodo";
import { useRoomStore } from "@/stores/useRoomStore";
import DeleteTodo from "./DeleteTodo";
import TodoActivity from "./TodoActivity";

type TaskCardProps = {
    todo: Todo
}

const TaskCard = ({ todo }: TaskCardProps) => {
    const { roomId } = useRoomStore();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: todo.id
    });

    const styles = transform ? {
        transform: `translate(${transform.x}px,${transform.y}px)`
    } : undefined

    const isCompleted = todo.status === 'completed';

    return (
        <Card
            ref={setNodeRef}
            style={styles}
            className={`hover:shadow-md transition-shadow ${isCompleted ? 'opacity-75' : ''
                }`}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className={`text-sm font-medium leading-tight ${isCompleted ? 'line-through text-gray-500' : ''
                        }`}>
                        {todo.todo_title}
                    </CardTitle>
                    <GripVertical
                        {...listeners}
                        {...attributes}
                        className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0 cursor-grab"
                    />
                </div>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
                <p className="text-xs text-gray-600 text-wrap overflow-hidden h-5 leading-relaxed">
                    {todo.description}
                </p>
                <div className="mt-3">
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(todo.todo_priority)}`}>
                        {todo.todo_priority}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between items-center">
                <span className="text-xs flex flex-col text-gray-500">
                    {todo.due_date && `Due: ${new Date(todo.due_date).toLocaleDateString()}`}
                   <span>
                     {todo.completed_at && `Completed: ${new Date(todo.completed_at).toLocaleDateString()}`}
                   </span>
                </span>
                <div className="flex items-center gap-1">
                    <TodoActivity todo={todo}/>
                    {
                        roomId && <AssignTodo todo={todo} roomId={roomId} isUpdate />
                    }
                    {roomId && <DeleteTodo todoId={todo.id} roomId={roomId} />}
                </div>
            </CardFooter>
        </Card>
    )
}

export default TaskCard