type User = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
}

// seems "Comment" is reserved type
type FullComment = {
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
    replies: FullComment[],
    replyingTo?: number
}