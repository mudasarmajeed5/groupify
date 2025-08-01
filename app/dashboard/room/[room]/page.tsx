type RoomProps = {
    params: Promise<{ room: string }>;
}
const Room = async ({ params }: RoomProps) => {
    const { room: roomId } = await params;
    return (
        <div>{roomId}</div>
    )
}

export default Room