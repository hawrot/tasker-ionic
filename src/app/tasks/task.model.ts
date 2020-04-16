import {PlaceLocation} from "./location.model";

export class Task{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public createdAt: Date,
        public dueDate: Date,
        public dueTime: string,
        public status: string,
        public completed: boolean,
        public location: PlaceLocation,
        public imageUrl: string

    ) {
    }
}
