import { useDataContext } from "../context/DataContext"
import { useRef, useEffect } from "react"

import plusIcon from "../assets/icons/plus.svg"
import minusIcon from "../assets/icons/minus.svg"
import replyIcon from "../assets/icons/reply.svg"
import deleteIcon from "../assets/icons/delete.svg"
import editIcon from "../assets/icons/edit.svg"
import ReplySection from "./ReplySection"
import dateFormatter from "../utils/dateFormatter"
import { deleteComment } from "../utils/commentUtils"
import { useState } from "react"

type Props = {
    comment: FullComment
}

function Comment({ comment }: Props) {

    const [isEditing, setIsEditing] = useState(false)
    const [userComment, setUserComment] = useState(comment.content)
    const userCommentRef = useRef<HTMLTextAreaElement>(null)

    const { user, setComments } = useDataContext()
    const isUser = user.username === comment.user.username

    useEffect(() => {
        if (isEditing) {
            userCommentRef.current?.focus()
        } else {
            userCommentRef.current?.blur()
        }
    }, [isEditing])

    useEffect(() => {
        const textarea = userCommentRef.current

        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight + 'px'
        }
    }, [userComment])

    const handleCancelEdit = () => {
        setUserComment(comment.content)
        setIsEditing(false)
    }

    return (
        <>
            <article className="flex flex-col gap-4 bg-white p-4 rounded-lg">
                <div className='flex gap-2 items-center'>
                    <img src={comment.user.image.png} alt={comment.user.username} className='h-10 w-10 mr-3' width={64} height={64} />

                    <span className="font-bold text-darkBlue">{comment.user.username}</span>

                    {isUser && <span className="bg-modBlue text-white px-2 rounded">you</span>}

                    <span className='text-grayBlue ml-3'>{dateFormatter(comment.createdAt)}</span>
                </div>

                {isUser ? (
                    <textarea
                        ref={userCommentRef}
                        disabled={!isEditing}
                        spellCheck={false}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        onBlur={handleCancelEdit}
                        className='transition-all focus:outline-modBlue focus:outline-1 font-rubik text-grayBlue focus:px-4 focus:py-2 bg-white disabled-border-0 disabled:outline-0' />
                ) : (
                    <pre className="text-grayBlue font-rubik text-wrap">{comment.content}</pre>
                )}

                <div className="flex justify-between">
                    <div className='p-2 flex gap-2 bg-lighterGray rounded-lg'>
                        <button className="px-2">
                            <img src={plusIcon} alt="Increase Likes" />
                        </button>
                        <span className="text-modBlue font-bold">{comment.score}</span>
                        <button className="px-2">
                            <img src={minusIcon} alt="Decrease Likes" />
                        </button>
                    </div>

                    <div className='flex gap-4'>
                        {isUser ? (
                            <>
                                {isEditing ? (
                                    <button disabled={userComment.trim() === ''} className='px-4 font-bold text-white bg-modBlue rounded-lg disabled:brightness-75'>UPDATE</button>
                                ) : (
                                    <>
                                        <button className="text-softRed font-bold flex items-center gap-2" onClick={() => deleteComment(comment.id, setComments, comment.replyingTo)}>
                                            <img src={deleteIcon} alt="Delete Icon" />
                                            Delete
                                        </button>

                                        <button onClick={() => setIsEditing(true)} className="text-modBlue font-bold flex items-center gap-2">
                                            <img src={editIcon} alt="Edit Icon" />
                                            Edit
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <button className="text-modBlue font-bold flex items-center gap-2">
                                <img src={replyIcon} alt="Reply Icon" />
                                Reply
                            </button>
                        )}
                    </div>
                </div>
            </article>

            {/* Reply Section */}
            {comment.replies?.length !== 0 && <ReplySection replies={comment.replies!} />}
        </>

    )
}

export default Comment