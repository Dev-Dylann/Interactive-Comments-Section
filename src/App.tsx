import CommentsArea from "./components/CommentsArea"
import NewCommentInput from "./components/NewCommentInput"

function App() {

  return (
    <section className="py-6 bg-lighterGray min-h-screen font-rubik">
      <CommentsArea />

      <NewCommentInput />
    </section>
  )
}

export default App
