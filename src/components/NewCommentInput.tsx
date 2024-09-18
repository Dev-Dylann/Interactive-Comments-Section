import { useState } from "react"
import { useDataContext } from "../context/DataContext"
import { createNewComment } from "../utils/commentUtils"

function NewCommentInput() {

    const { user, comments, setComments, lastId } = useDataContext()

    const [commentContent, setCommentContent] = useState('')

    return (
        <div className='p-4 md:px-8 lg:px-12 lg:mx-auto lg:max-w-5xl'>
            <form
                className='p-4 grid grid-cols-2 gap-y-4 bg-white rounded-lg md:p-8 lg:flex lg:gap-4'
                onSubmit={(e) => {
                    e.preventDefault()
                    setCommentContent('')
                }}
            >
                <textarea cols={3} className='border border-lightGray rounded-lg px-6 py-2 resize-none text-grayBlue col-span-full focus:outline-modBlue focus:outline-1 md:text-lg lg:grow' placeholder="Add a comment..." onChange={(e) => setCommentContent(e.target.value)} value={commentContent} />

                <img src={user.image.png} alt={user.username} className='h-10 w-10 md:w-12 md:h-12 lg:-order-1' width={64} height={64} />

                <button
                    disabled={commentContent.trim() === ''}
                    type="submit"
                    className='w-fit place-self-end bg-modBlue text-white font-bold px-4 py-2 rounded-lg disabled:brightness-75 md:text-lg md:px-6 lg:place-self-start lg:hover:brightness-150'
                    onClick={() => createNewComment(user, commentContent, lastId + 1, setComments)}>
                    SEND
                </button>
            </form>
        </div>
    )
}

export default NewCommentInput