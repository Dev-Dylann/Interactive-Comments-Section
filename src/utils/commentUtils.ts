type SetterType = React.Dispatch<React.SetStateAction<{
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: {
        image: {
            png: string;
            webp: string;
        };
        username: string;
    };
    replies: {
        id: number;
        content: string;
        createdAt: string;
        score: number;
        replyingTo: number;
        user: User;
    }[];
}[]>>

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

            const updatedReplies = current.replies.filter(reply => {
                return reply.id !== commentId
            })
            current.replies = updatedReplies

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

export { createNewComment, deleteComment }