export class Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;

    constructor(data: any) {
        for (let key in data) {
            this[key] = data[key]
        }
    }
}