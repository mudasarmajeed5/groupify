import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const RoomSkeleton = () => {
    return (
        <Card className="animate-pulse">
            <CardHeader>
                <CardTitle className="h-6 bg-gray-300 rounded w-2/3 mb-2" />
                <CardDescription className="h-4 bg-gray-500 rounded w-full" />
            </CardHeader>
            <CardContent>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
                <div className="flex gap-2">
                    <div className="h-8 bg-gray-300 rounded w-full" />
                    <div className="h-8 bg-gray-200 rounded w-full" />
                </div>
            </CardContent>
        </Card>
    )
}

export default RoomSkeleton