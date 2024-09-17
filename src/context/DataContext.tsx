import { createContext, useContext, useState, useEffect } from "react";
import data from "../data/data.json"

type DataContextType = {
    user: User,
    comments: FullComment[],
    setComments: React.Dispatch<React.SetStateAction<{
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
            user: User
        }[];
    }[]>>
}

const DataContext = createContext<DataContextType>({
    user: data.currentUser,
    comments: data.comments,
    setComments: () => console.log(data.comments),
})

type DataProviderProps = {
    children?: React.ReactElement | React.ReactElement[] | undefined
}

const DataProvider = ({ children }: DataProviderProps) => {

    const user = data.currentUser

    const localComments = localStorage.getItem('interactiveComments')
    const [comments, setComments] = useState(localComments ? JSON.parse(localComments) : data.comments)

    useEffect(() => {
        localStorage.setItem('interactiveComments', JSON.stringify(comments))
    }, [comments])

    return (
        <DataContext.Provider value={{
            user,
            comments, setComments
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