import { useState } from "react"
import { useDataContext } from "../context/DataContext"
import { replyToComment } from "../utils/commentUtils"

type Props = {
    setIsReplying: React.Dispatch<React.SetStateAction<number>>,
    replyingComment: FullComment
}

function ReplyInput({ setIsReplying, replyingComment }: Props) {

    const { user, comments, setComments, lastId } = useDataContext()

    const [replyContent, setReplyContent] = useState('')

    const handleReply = () => {
        replyToComment(user, replyContent, lastId + 1, setComments, replyingComment)
        setIsReplying(0)
    }

    return (
        <form
            className='p-4 grid grid-cols-2 gap-y-4 bg-white rounded-lg md:p-8 lg:flex lg:gap-4'
            onSubmit={(e) => {
                e.preventDefault()
                setReplyContent('')
            }}
        >
            <textarea
                autoFocus
                className='border border-lightGray rounded-lg px-6 py-2 resize-none text-grayBlue col-span-full focus:outline-modBlue focus:outline-1 md:text-lg lg:grow'
                placeholder="Add a comment..."
                onBlur={(e) => {
                    if (!e.relatedTarget || !e.relatedTarget.classList.contains('reply-button')) setIsReplying(0)
                }}
                onChange={(e) => setReplyContent(e.target.value)}
                value={replyContent}
            />

            <img src={user.image.png} alt={user.username} className='h-10 w-10 md:w-12 md:h-12 lg:-order-1' width={64} height={64} />

            <button
                disabled={replyContent.trim() === ''}
                type="submit"
                className='w-fit place-self-end bg-modBlue text-white font-bold px-4 py-2 rounded-lg reply-button disabled:brightness-75 md:text-lg md:px-6 lg:place-self-start lg:hover:brightness-150'
                onClick={handleReply}
            >
                REPLY
            </button>
        </form>
    )
}

export default ReplyInput