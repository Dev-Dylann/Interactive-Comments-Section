import { useDataContext } from "../context/DataContext"
import Comment from "./Comment"

function CommentsArea() {
    const { comments } = useDataContext()

    return (
        <div className="flex flex-col gap-4 px-4 md:px-8 lg:max-w-5xl lg:mx-auto lg:px-12">
            {comments.map(comment => {
                return <Comment key={comment.id} comment={comment} />
            })}
        </div>
    )
}

export default CommentsArea