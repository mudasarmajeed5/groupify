"use client"
import { useEffect, useState } from "react"
import { Column, Todo } from "@/types/room-types";
import {
    DndContext,
    useSensor,
    useSensors,
    TouchSensor,
    MouseSensor,
    DragEndEvent
} from "@dnd-kit/core";
import { createClient } from "@/lib/supabase/client";
import TodoColumn from "./TodoColumn";
import { fetchTodos } from "../helpers/fetch-todos";

const COLUMNS: Column[] = [
    { id: "incomplete", title: "Incomplete Todos" },
    { id: "pending", title: "In progress" },
    { id: "completed", title: "Completed Todos" }
]

export const RenderTodos = ({ roomId }: { roomId: string }) => {
    const supabase = createClient();
    const [todos, setTodos] = useState<Todo[]>([]);
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 8,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    // Update todo status in database
    const updateTodoStatus = async (todoId: string, newStatus: Todo['status']) => {
        try {
            const updateData: { status: Todo['status']; } = { status: newStatus };

            const { error } = await supabase
                .from('todos')
                .update(updateData)
                .eq('id', todoId);

            if (error) {
                console.error('Error updating todo:', error);
                getTodos();
            }
        } catch (error) {
            console.error('Error updating todo:', error);
            getTodos();
        }
    };

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as Todo['status'];
        let completedAt: string | null;
        if(newStatus === "completed"){
           completedAt = new Date().toISOString();
        }
        else{
            completedAt = null;
        }
        // Optimistic update - update UI immediately
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === taskId ? { ...todo, status: newStatus, completed_at: completedAt } : todo
            )
        );

        // Update in database
        updateTodoStatus(taskId, newStatus);
    }

    const getTodos = async () => {
        const todos = await fetchTodos(roomId)
        if (todos.success) {
            setTodos(todos.data);
        }
        else {
            console.error("Error fetching todos.", todos.message)
        }
    }

    useEffect(() => {
        getTodos();
        const channel = supabase
            .channel(`todos_room_${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'todos',
                },
                (payload) => {

                    if (payload.eventType === 'INSERT') {
                        
                        console.log("Event fired for INSERT : ",payload.old);
                        const newTodo = payload.new as Todo;
                        setTodos(prevTodos => [...prevTodos, newTodo]);
                    }
                    else if (payload.eventType === 'UPDATE') {
                        
                        console.log("Event fired for Update : ",payload.old);
                        const updatedTodo = payload.new as Todo;
                        setTodos(prevTodos =>
                            prevTodos.map(todo =>
                                todo.id === updatedTodo.id ? updatedTodo : todo
                            )
                        );
                    }
                    else if (payload.eventType === 'DELETE') {
                        console.log("Event fired for DELETE : ",payload.old);
                        const deletedTodo = payload.old as Todo;
                        setTodos(prevTodos =>
                            prevTodos.filter(todo => todo.id !== deletedTodo.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomId]);

    return (
        <div className="p-4">
            <div className="flex justify-center flex-wrap gap-8">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    {
                        COLUMNS.map((column) => {
                            return <TodoColumn key={column.id} column={column} todos={todos.filter(task => task.status === column.id)} />
                        })
                    }
                </DndContext>
            </div>
        </div>
    )
}