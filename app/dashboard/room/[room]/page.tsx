import { RenderTodos } from "../components/RenderTodos";

type RoomProps = {
    params: Promise<{ room: string }>;
}
const Room = async ({ params }: RoomProps) => {
    const { room: roomId } = await params;
    return (
        <div className="p-4">
            <RenderTodos roomId={roomId} />
        </div>
    )
}

export default Room