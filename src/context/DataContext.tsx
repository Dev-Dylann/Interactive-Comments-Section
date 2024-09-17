import { createContext, useContext, useState, useEffect } from "react";
import data from "../data/data.json"

type DataContextType = {
    user: User,
    comments: FullComment[],
    setComments: React.Dispatch<React.SetStateAction<FullComment[]>>,
    lastId: number
}

const DataContext = createContext<DataContextType>({
    user: data.currentUser,
    comments: data.comments,
    setComments: () => console.log(data.comments),
    lastId: 4
})

type DataProviderProps = {
    children?: React.ReactElement | React.ReactElement[] | undefined
}

const DataProvider = ({ children }: DataProviderProps) => {

    const user = data.currentUser

    const localComments = localStorage.getItem('interactiveComments')
    const localLastId = localStorage.getItem('lastCommentId')

    const [comments, setComments] = useState(localComments ? JSON.parse(localComments) : data.comments)
    const [lastId, setLastId] = useState<number>(localLastId ? JSON.parse(localLastId) : 4)

    useEffect(() => {
        localStorage.setItem('interactiveComments', JSON.stringify(comments))

        setLastId(prev => prev + 1)
        localStorage.setItem('lastCommentId', JSON.stringify(lastId))
    }, [comments])

    return (
        <DataContext.Provider value={{
            user,
            comments, setComments,
            lastId
        }} >
            {children}
        </DataContext.Provider>
    )
}

const useDataContext = () => {
    const context = useContext(DataContext)
    return context
}

export { DataProvider, useDataContext }