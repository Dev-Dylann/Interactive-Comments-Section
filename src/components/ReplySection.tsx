import Comment from "./Comment"

type Props = {
    replies: FullComment[]
}

function ReplySection({ replies }: Props) {
    return (
        <div className="border-l-2 border-lightGray pl-4 flex flex-col gap-2 md:pl-8 lg:ml-12 lg:pl-12">
            {replies?.map(reply => (
                <Comment key={reply.id} comment={reply} />
            ))}
        </div>
    )
}

export default ReplySection