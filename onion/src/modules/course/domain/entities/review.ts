export class Review {
    title: string;
    content: string;
    createdAt: Date;
    rating: number; // rating out of 5

    /*constructor(title: string, content: string, rating: number, createdAt?: Date) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt ? createdAt : new Date();
        this.rating = rating;
    }*/
}