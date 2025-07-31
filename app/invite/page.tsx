// app/invite/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface InvitePageProps {
  searchParams: Promise<{ 'invite-id': string }>
}

export default function InvitePage({ searchParams }: InvitePageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleInvite = async () => {
      try {
        const { 'invite-id': inviteId } = await searchParams
        
        // Store invite ID before potential redirect
        if (inviteId) {
          sessionStorage.setItem('pendingInviteId', inviteId)
        }

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          // User will be redirected by middleware
          return
        }

        // User is authenticated, process the invite
        if (inviteId) {
          await joinRoom(inviteId, user.id)
        }
      } catch (err) {
        setError('Failed to process invite')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    handleInvite()
  }, [searchParams, router])

  const joinRoom = async (roomId: string, userId: string) => {
    try {
      // Check if room exists
      const { data: room, error: roomError } = await supabase
        .from('room')
        .select('room_id, room_name')
        .eq('room_id', roomId)
        .single()

      if (roomError || !room) {
        setError('Room not found or invalid invite')
        return
      }

      // Check if user is already in the room
      const { data: existingMember } = await supabase
        .from('user_rooms')
        .select('*')
        .eq('room_id', roomId)
        .eq('user_id', userId)
        .single()

      if (existingMember) {
        // User already in room, just redirect
        router.push('/dashboard')
        return
      }

      // Add user to room as member
      const { error: insertError } = await supabase
        .from('user_rooms')
        .insert({
          room_id: roomId,
          user_id: userId,
          status: 'active',
          role: 'member'
        })

      if (insertError) {
        setError('Failed to join room')
        return
      }

      // Clear pending invite and redirect
      sessionStorage.removeItem('pendingInviteId')
      router.push('/dashboard')
      
    } catch (err) {
      setError('Failed to join room')
      console.error(err)
    }
  }

  if (loading) {
    return <div className=''>Processing invite...</div>
  }

  if (error) {
    return <div className=''>Error: {error}</div>
  }

  return <div className=''>Joining room...</div>
}