"use client"
import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Todo } from "@/types/room-types"
import TaskCard from "./TaskCard";
import { getStyles } from "../helpers/getStyles";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";

type ColumnProps = {
    column: ColumnType,
    todos: Todo[];
}

const TodoColumn = ({ column, todos }: ColumnProps) => {
    const { userId } = useUserStore();
    const { setNodeRef } = useDroppable({
        id: column.id
    })
    const [filterBy, setFilterBy] = useState<"me" | "all">("me");

    // ✅ Filter logic
    const filteredTodos = todos.filter((todo) => {
        if (column.id === "incomplete") {
            if (filterBy === "me") return todo.assigned_to === userId;
            return true;
        }
        return todo.status === column.id;
    });

    const columnContainer = getStyles(column)
    return (
        <div className={`${columnContainer} flex flex-1 max-w-lg flex-col rounded-lg p-4`}>
            <h2 className="mb-4 text-xl font-semibold capitalize flex justify-between">{column.title}
                {column.id === "incomplete" && (
                    <Select value={filterBy} onValueChange={(val) => setFilterBy(val as "me" | "all")}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Filter By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="me">Assigned to Me</SelectItem>
                            <SelectItem value="all">All Incomplete</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </h2>
            <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
                {filteredTodos.map((todo) => (
                    <TaskCard key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    )
}

export default TodoColumn