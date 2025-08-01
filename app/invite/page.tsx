// app/invite/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { RefreshCw } from 'lucide-react'

interface InvitePageProps {
  searchParams: Promise<{ 'invite-id': string }>
}

export default function InvitePage({ searchParams }: InvitePageProps) {
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleInvite = async () => {
      try {
        const { 'invite-id': inviteId } = await searchParams
        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          router.push(`/auth/login?invite-id=${inviteId}`)
          return;
        }

        // User is authenticated, process the invite
        if (inviteId && user?.id) {
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
    if (isProcessing) return
    setIsProcessing(true)
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
        .upsert({  // Use upsert instead of insert
          room_id: roomId,
          user_id: userId,
          status: 'active',
          role: 'member'
        })

      if (insertError) {
        console.log(insertError.message)
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
    finally{
       setIsProcessing(false)
    }
  }

  if (loading) {
    return <div className='min-h-[75vh] flex gap-2 justify-center items-center'>
      <span>Processing invite</span><span className='animate-spin'><RefreshCw /></span>
    </div>
  }

  if (error) {
    return <div className='min-h-[75vh] flex gap-2 justify-center items-center'>Error: {error}</div>
  }

  return <div className='min-h-[75vh] flex gap-2 justify-center items-center'>
    <span>Joining room</span><span className='animate-spin'><RefreshCw /></span>
  </div>
}