"use client"
import { useEffect, useState } from "react";
import { useRoomStore } from "@/stores/useRoomStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";
import { Edit } from "lucide-react";
import { Todo } from "@/types/room-types";
type AssignTodoProps = {
    roomId: string | null,
    isUpdate?: boolean,
    todo?: Todo
}
export function AssignTodo({ roomId, isUpdate, todo }: AssignTodoProps) {
    const { userId } = useUserStore();
    const { roomMembers } = useRoomStore();
    const [dueDate, setDueDate] = useState<string>(new Date().toISOString());
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"high" | "medium" | "low" | "">("");
    const [assignedTo, setAssignedTo] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const supabase = createClient();

        if (isUpdate && todo) {
            const { error } = await supabase
                .from("todos")
                .update({
                    todo_title: title,
                    description,
                    todo_priority: priority,
                    assigned_to: assignedTo,
                    due_date: dueDate,
                })
                .eq("id", todo.id);

            if (error) {
                toast.error("Failed to update task");
            } else {
                toast("Task updated successfully!");
            }
        } else {
            const { error } = await supabase.from("todos").insert([
                {
                    todo_title: title,
                    description,
                    todo_priority: priority,
                    room_id: roomId,
                    created_by: userId,
                    assigned_to: assignedTo,
                    status: "incomplete",
                    due_date: dueDate,
                },
            ]);
            if (error) {
                toast.error("Failed to assign task");
            } else {
                toast("Task assigned successfully!");
            }
        }
        setIsSubmitting(false);
    };
    useEffect(() => {
        if (isUpdate && todo) {
            setTitle(todo.todo_title);
            setDescription(todo.description);
            setPriority(todo.todo_priority);
            setAssignedTo(todo.assigned_to);
        }
    }, [isUpdate, todo])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={isUpdate ? "outline" : "default"} size={isUpdate ? "sm" : "default"}>
                    {isUpdate ? <Edit className="h-3 w-3" /> : "+ Assign Todo"}
                </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Assign Todo to Team Member</DialogTitle>
                    <DialogDescription>Fill out the details below to assign a new task to a team member.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Task Title */}
                    <div className="grid gap-2">
                        <Label htmlFor="todoName">Task Title</Label>
                        <Input
                            id="todoName"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Setup CI/CD Pipeline"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                        <Label htmlFor="todoDescription">Task Description</Label>
                        <Textarea
                            id="todoDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a short description about the task..."
                            rows={4}
                            required
                        />
                    </div>

                    {/* Priority */}
                    <div className="flex gap-2 items-center">

                        <div className="flex gap-1 items-start flex-col flex-1">
                            <Label>Priority</Label>
                            <Select value={priority} onValueChange={(val) => setPriority(val as any)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Task Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-1 flex-col flex-1">
                            <Label>Due Date</Label>
                            <Input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="border rounded px-2 py-1 text-sm"
                            />
                        </div>
                    </div>

                    {/* Assign To */}
                    <div className="grid gap-2">
                        <Label>Assign To</Label>
                        <Select value={assignedTo} onValueChange={(val) => setAssignedTo(val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select team member" />
                            </SelectTrigger>
                            <SelectContent>
                                {roomMembers.map((member) => {
                                    const user = Array.isArray(member.user) ? member.user[0] : member.user;
                                    if (!user) return null;

                                    return (
                                        <SelectItem key={member.user_id} value={member.user_id}>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={user.profile_url} alt={user.name} />
                                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span>{user.name}</span>
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Assigning..." : "Assign Task"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
