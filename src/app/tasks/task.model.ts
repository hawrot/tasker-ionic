export class Task{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public createdAt: string,
        public dueDate: string,
        public dueTime: string,
        public status: string,
        public assigned: boolean
    ) {
    }
}
