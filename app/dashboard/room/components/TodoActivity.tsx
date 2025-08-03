"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Calendar, Clock, User, Flag, CheckCircle, MessageCircle, FileText, Send } from "lucide-react";
import React, { useState } from 'react'
import { Todo,TodoComment } from "@/types/room-types";

const TodoActivity = ({ todo }: { todo: Todo }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'activity'>('details');
    const [newComment, setNewComment] = useState('');

    // Mock comments data
    const comments: TodoComment[] = [
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPriorityColor = (priority: Todo["todo_priority"]) => {
        switch (priority) {
            case 'high': return 'border-red-200 text-red-700';
            case 'medium': return 'border-yellow-200 text-yellow-700';
            case 'low': return 'border-green-200 text-green-700';
            default: return 'border-border text-foreground';
        }
    };

    const handleSendComment = () => {
        if (newComment.trim()) {
            // Handle comment submission here
            console.log('Sending comment:', newComment);
            setNewComment('');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild className="hover:underline">
                <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                <DialogHeader className="pb-2">
                    <DialogTitle className="text-xl pr-8">{todo.todo_title}</DialogTitle>
                </DialogHeader>

                {/* Tab Navigation */}
                <div className="flex border-b mb-6">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`flex items-center px-4 py-2 font-medium text-sm transition-colors ${
                            activeTab === 'details'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Task Details
                    </button>
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`flex items-center px-4 py-2 font-medium text-sm transition-colors ${
                            activeTab === 'activity'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Activity ({comments.length})
                    </button>
                </div>

                {/* Tab Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                    {activeTab === 'details' && (
                        <div className="space-y-6">
                            {/* Description */}
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                    <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                                    <h3 className="text-lg font-semibold">Description</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {todo.description || "No description provided"}
                                </p>
                            </div>

                            {/* Status and Priority */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <CheckCircle className="h-4 w-4 text-muted-foreground mr-2" />
                                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    </div>
                                    <Badge variant="outline" className="capitalize font-medium">
                                        {todo.status}
                                    </Badge>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <Flag className="h-4 w-4 text-muted-foreground mr-2" />
                                        <p className="text-sm font-medium text-muted-foreground">Priority</p>
                                    </div>
                                    <Badge variant="outline" className={`capitalize font-medium ${getPriorityColor(todo.todo_priority)}`}>
                                        {todo.todo_priority}
                                    </Badge>
                                </div>
                            </div>

                            {/* Assignment - Now with two sections */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                                        <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                                    </div>
                                    <p className="font-medium">
                                        {todo.assigned_to || "Unassigned"}
                                    </p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                                        <p className="text-sm font-medium text-muted-foreground">Assigned By</p>
                                    </div>
                                    <p className="font-medium">
                                        {todo.created_by || todo.created_by || "Unknown"}
                                    </p>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                                        <p className="text-sm font-medium text-muted-foreground">Created At</p>
                                    </div>
                                    <p className="font-medium">{formatDate(todo.created_at)}</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                                        <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                                    </div>
                                    <p className="font-medium">
                                        {todo.due_date ? formatDate(todo.due_date) : "No due date set"}
                                    </p>
                                </div>
                            </div>

                            {/* Completion Date */}
                            {todo.completed_at && (
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <CheckCircle className="h-4 w-4 text-muted-foreground mr-2" />
                                        <p className="text-sm font-medium text-muted-foreground">Completed At</p>
                                    </div>
                                    <p className="font-medium">{formatDate(todo.completed_at)}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="flex flex-col h-full">
                            {/* Chat Messages Area */}
                            <div className="flex-1 border rounded-lg p-3 mb-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                                <div className="space-y-3">
                                    {comments.length > 0 ? (
                                        comments.map(comment => (
                                            <div key={comment.id} className="flex items-start space-x-2">
                                                {/* Avatar */}
                                                <div className="w-6 h-6 border rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-medium">
                                                        {comment.commented_by.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                    </span>
                                                </div>
                                                
                                                {/* Message Bubble */}
                                                <div className="flex-1">
                                                    <div className="border rounded-md px-3 py-2">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-medium text-xs">
                                                                {comment.commented_by}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {formatTime(comment.commented_at)}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs leading-relaxed">
                                                            {comment.comment}
                                                        </p>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1 ml-2">
                                                        {formatDate(comment.commented_at)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-muted-foreground text-xs">No messages yet</p>
                                            <p className="text-xs text-muted-foreground/60">Start the conversation!</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Message Input Area */}
                            <div className="border rounded-lg p-3">
                                <div className="flex items-end space-x-2">
                                    {/* Current User Avatar */}
                                    <div className="w-6 h-6 border rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-medium">ME</span>
                                    </div>
                                    
                                    {/* Input Area */}
                                    <div className="flex-1">
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            className="w-full border rounded-md px-2 py-1 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                            rows={2}
                                            placeholder="Type your message..."
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendComment();
                                                }
                                            }}
                                        />
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Press Enter to send, Shift+Enter for new line
                                        </div>
                                    </div>
                                    
                                    {/* Send Button */}
                                    <Button 
                                        size="sm" 
                                        onClick={handleSendComment}
                                        disabled={!newComment.trim()}
                                        className="px-2 py-1"
                                    >
                                        <Send className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TodoActivity