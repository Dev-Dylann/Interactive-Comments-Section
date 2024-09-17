import Comment from "./Comment"

type Props = {
    replies: FullComment[]
}

function ReplySection({ replies }: Props) {
    return (
        <div className="border-l-2 border-lightGray pl-4 flex flex-col gap-2">
            {replies?.map(reply => (
                <Comment key={reply.id} comment={reply} />
            ))}
        </div>
    )
}

export default ReplySection