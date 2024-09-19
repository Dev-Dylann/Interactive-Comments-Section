import { useDataContext } from "../context/DataContext"
import { useRef, useEffect, useState } from "react"

import plusIcon from "../assets/icons/plus.svg"
import minusIcon from "../assets/icons/minus.svg"
import replyIcon from "../assets/icons/reply.svg"
import deleteIcon from "../assets/icons/delete.svg"
import editIcon from "../assets/icons/edit.svg"

import ReplySection from "./ReplySection"
import ReplyInput from "./ReplyInput"
import DeleteModal from "./DeleteModal"

import dateFormatter from "../utils/dateFormatter"
import { deleteComment, editComment } from "../utils/commentUtils"

type Props = {
    comment: FullComment
}

function Comment({ comment }: Props) {

    const [score, setScore] = useState(comment.score)

    const [isEditing, setIsEditing] = useState(false)
    const [userComment, setUserComment] = useState(comment.content)
    const [isReplying, setIsReplying] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
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

    const handleEdit = () => {
        editComment(comment.id, userComment, setComments, comment.replyingTo)
        setIsEditing(false)
    }

    return (
        <>
            <article className="flex flex-col gap-4 bg-white p-4 rounded-lg md:p-8 lg:grid lg:grid-cols-[auto,_1fr] lg:grid-rows-[auto,_1fr]">
                <div className='flex gap-2 items-center'>
                    <img src={comment.user.image.png} alt={comment.user.username} className='h-10 w-10 mr-3 md:h-12 md:w-12' width={64} height={64} />

                    <span className="font-bold text-darkBlue md:text-lg">{comment.user.username}</span>

                    {isUser && <span className="bg-modBlue text-white px-2 rounded">you</span>}

                    <span className='text-grayBlue ml-3'>{dateFormatter(comment.createdAt)}</span>

                    <div className='hidden lg:flex grow justify-end gap-8'>
                        {isUser ? (
                            <>
                                <button disabled={isEditing} className="text-softRed font-bold flex items-center gap-2 text-lg disabled:brightness-150 lg:hover:brightness-150" onClick={() => setIsDeleting(true)}>
                                    <img src={deleteIcon} alt="Delete Icon" className="w-4 h-4" />
                                    Delete
                                </button>

                                <button disabled={isEditing} onClick={() => setIsEditing(true)} className="text-modBlue font-bold flex items-center gap-2 text-lg disabled:brightness-150 lg:hover:brightness-150">
                                    <img src={editIcon} alt="Edit Icon" className="w-4 h-4" />
                                    Edit
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsReplying(comment.id)} className="text-modBlue font-bold flex items-center gap-2 text-lg lg:hover:brightness-150">
                                <img src={replyIcon} alt="Reply Icon" className="w-4 h-4" />
                                Reply
                            </button>
                        )}
                    </div>
                </div>

                {isUser ? (
                    <textarea
                        ref={userCommentRef}
                        disabled={!isEditing}
                        spellCheck={false}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        onBlur={(e) => {
                            if (!e.relatedTarget || !e.relatedTarget.classList.contains('update-button')) handleCancelEdit()
                        }}
                        className='transition-all resize-none focus:outline-modBlue focus:outline-1 font-rubik text-grayBlue focus:px-4 focus:py-2 bg-white disabled-border-0 disabled:outline-0 md:text-lg' />
                ) : (
                    <pre className="text-grayBlue font-rubik text-wrap md:text-lg">{comment.content}</pre>
                )}

                <div className="flex justify-between lg:row-span-full lg:justify-start lg:items-start">
                    <div className='p-2 flex gap-2 bg-lighterGray rounded-lg md:p-4 md:gap-4 lg:flex-col lg:justify-center lg:items-center lg:gap-6 lg:px-2'>
                        <button onClick={() => setScore(prev => prev + 1)} className="px-2">
                            <img src={plusIcon} alt="Increase Likes" className="md:w-4 md:h-4" />
                        </button>
                        <span className="text-modBlue font-bold md:text-lg lg:py-1">{score}</span>
                        <button disabled={score <= 0} onClick={() => setScore(prev => prev - 1)} className="px-2">
                            <img src={minusIcon} alt="Decrease Likes" className="md:w-4" />
                        </button>
                    </div>

                    <div className='flex gap-4 lg:hidden'>
                        {isUser ? (
                            <>
                                {isEditing ? (
                                    <button
                                        disabled={userComment.trim() === '' || userComment.trim() === comment.content}
                                        onClick={handleEdit}
                                        className='px-4 font-bold text-white bg-modBlue rounded-lg disabled:brightness-75 update-button md:px-6 md:text-lg'
                                    >
                                        UPDATE
                                    </button>
                                ) : (
                                    <>
                                        <button className="text-softRed font-bold flex items-center gap-2 md:text-lg" onClick={() => setIsDeleting(true)}>
                                            <img src={deleteIcon} alt="Delete Icon" className="md:w-4 md:h-4" />
                                            Delete
                                        </button>

                                        <button onClick={() => setIsEditing(true)} className="text-modBlue font-bold flex items-center gap-2 md:text-lg">
                                            <img src={editIcon} alt="Edit Icon" className="md:w-4 md:h-4" />
                                            Edit
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <button onClick={() => setIsReplying(comment.id)} className="text-modBlue font-bold flex items-center gap-2 md:text-lg">
                                <img src={replyIcon} alt="Reply Icon" className="md:w-4 md:h-4" />
                                Reply
                            </button>
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div className='hidden lg:flex justify-end col-span-full'>
                        <button
                            disabled={userComment.trim() === '' || userComment.trim() === comment.content}
                            onClick={handleEdit}
                            className='font-bold text-white bg-modBlue rounded-lg disabled:brightness-75 update-button px-6 py-4 text-lg lg:hover:brightness-150'
                        >
                            UPDATE
                        </button>
                    </div>
                )}
            </article>

            {/* Reply Section */}
            {comment.replies?.length !== 0 && <ReplySection replies={comment.replies!} />}

            {/* Input field to make replies */}
            {isReplying > 0 && <ReplyInput setIsReplying={setIsReplying} replyingComment={comment} />}

            {isDeleting && <DeleteModal setIsDeleting={setIsDeleting} commentId={comment.id} replyingTo={comment.replyingTo} />}
        </>

    )
}

export default Comment