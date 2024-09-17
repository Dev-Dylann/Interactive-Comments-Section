import { useState } from "react"
import { useDataContext } from "../context/DataContext"
import { createNewComment } from "../utils/commentUtils"

function NewCommentInput() {

    const { user, comments, setComments } = useDataContext()

    const [commentContent, setCommentContent] = useState('')

    return (
        <form
            className='p-4 grid grid-cols-2 gap-y-4 m-4 bg-white rounded-lg'
            onSubmit={(e) => {
                e.preventDefault()
                setCommentContent('')
            }}
        >
            <textarea className='border border-lightGray rounded-lg px-6 py-2 resize-none text-grayBlue col-span-full focus:outline-modBlue focus:outline-1' placeholder="Add a comment..." onChange={(e) => setCommentContent(e.target.value)} value={commentContent} />

            <img src={user.image.png} alt={user.username} className='h-10 w-10 mr-3' width={64} height={64} />

            <button
                type="submit"
                className='w-fit place-self-end bg-modBlue text-white font-bold px-4 py-2 rounded-lg'
                onClick={() => createNewComment(user, commentContent, comments.length + 1, setComments)}>
                SEND
            </button>
        </form>
    )
}

export default NewCommentInput