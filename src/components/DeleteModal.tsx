import { useDataContext } from "../context/DataContext"
import { deleteComment } from "../utils/commentUtils"

type Props = {
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    commentId: number,
    replyingTo?: number
}

function DeleteModal({ setIsDeleting, commentId, replyingTo }: Props) {
    const { setComments } = useDataContext()

    return (
        <aside className='fixed h-full w-full z-10 top-0 left-0 bg-black/40 flex items-center justify-center px-4 md:text-lg md:px-8'>
            <section className='bg-white p-4 w-full rounded-lg flex flex-col gap-4 md:p-8 max-w-lg'>
                <h2 className='font-bold text-darkBlue text-xl md:text-2xl'>Delete Comment</h2>

                <p className='text-grayBlue md:text-lg'>Are you sure you want to delete this comment? This will remove the comment and cannot be undone.</p>

                <div className='flex gap-4 w-full'>
                    <button onClick={() => setIsDeleting(false)} className='bg-grayBlue text-white w-1/2 py-2 rounded-lg font-bold'>NO, CANCEL</button>
                    <button
                        className='bg-softRed text-white w-1/2 py-2 rounded-lg font-bold'
                        onClick={() => {
                            deleteComment(commentId, setComments, replyingTo)
                            setIsDeleting(false)
                        }}
                    >
                        YES, DELETE
                    </button>
                </div>
            </section>
        </aside>
    )
}

export default DeleteModal

