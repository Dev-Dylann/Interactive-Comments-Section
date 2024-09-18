type SetterType = React.Dispatch<React.SetStateAction<FullComment[]>>

const createNewComment = (user: User, commentContent: string, commentId: number, setComments: SetterType) => {
    const newComment = {
        id: commentId,
        content: commentContent.trim(),
        createdAt: new Date().toUTCString(),
        score: 0,
        user: user,
        replies: []
    }

    setComments(prev => [...prev, newComment])
}

const deleteComment = (commentId: number, setComments: SetterType, replyingTo?: number) => {
    console.log(`Deleting comment with id ${commentId}`)

    if (!replyingTo) {
        setComments(prev => (
            prev.filter(comment => {
                return comment.id !== commentId
            }))
        )
    } else {
        setComments(prev => {
            /* find comment to which it is a reply of */
            const current = prev.find(comment => {
                return comment.id === replyingTo
            })!

            /* update the replies array of the comment (delete selected) */
            const updatedReplies = current.replies.filter(reply => {
                return reply.id !== commentId
            })
            current.replies = updatedReplies

            /* create updated comments array */
            const updatedComments = prev.map(comment => {
                if (comment.id !== current?.id) {
                    return comment
                } else {
                    return current
                }
            })
            console.log(updatedComments)

            return updatedComments
        })
    }
}

const editComment = (commentId: number, newContent: string, setComments: SetterType, replyingTo?: number) => {
    console.log(newContent)

    if (!replyingTo) {
        setComments(prev => (
            prev.map(comment => {
                if (comment.id !== commentId) {
                    return comment
                } else {
                    return { ...comment, content: newContent }
                }
            })
        ))
    } else {
        setComments(prev => {
            /* find comment to which it is a reply of */
            const current = prev.find(comment => {
                return comment.id === replyingTo
            })!

            /* update content of the reply */
            const updatedReplies = current.replies.map(reply => {
                if (reply.id === commentId) {
                    return { ...reply, content: newContent }
                } else {
                    return reply
                }
            })
            current.replies = updatedReplies

            /* create updated comments array */
            const updatedComments = prev.map(comment => {
                if (comment.id !== current?.id) {
                    return comment
                } else {
                    return current
                }
            })
            console.log(updatedComments)

            return updatedComments
        })
    }
}

const replyToComment = (user: User, replyContent: string, commentId: number, setComments: SetterType, replyingComment: FullComment) => {
    const newReply = {
        id: commentId,
        content: replyContent.trim(),
        createdAt: new Date().toUTCString(),
        score: 0,
        user: user,
        replies: [],
        replyingTo: replyingComment.id
    }

    /* update replies */
    replyingComment.replies?.push(newReply)

    if (!replyingComment.replyingTo) {
        /* if what is being replied to is not a reply of another comment */
        /* create updated comments state */
        setComments(prev => {
            const updatedComments = prev.map(comment => {
                if (comment.id !== replyingComment?.id) {
                    return comment
                } else {
                    return replyingComment
                }
            })

            return updatedComments
        })
    } else {
        /* if what is being replied to is a reply of another comment */

        setComments(prev => {
            /* find the commemt to which it is a reply of */
            const originalComment = prev.find(comment => {
                return comment.id === replyingComment.replyingTo
            })

            // /* update its replies array */
            // /* for some reason, its replies array is updated already */

            // const updatedReplies = originalComment?.replies.map(reply => {
            //     if (reply.id !== replyingComment.id) {
            //         return reply
            //     } else {
            //         return replyingComment
            //     }
            // })
            // originalComment?.replies = updatedReplies

            /* update all comments array */
            const updatedComments = prev.map(comment => {
                if (comment.id !== originalComment?.id) {
                    return comment
                } else {
                    return originalComment
                }
            })

            return updatedComments
        })

    }
}

export { createNewComment, deleteComment, editComment, replyToComment }