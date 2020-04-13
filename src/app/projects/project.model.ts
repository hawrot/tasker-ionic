export class Project {
    constructor(
        public title: string,
        public tasks = [Project],
        public dueDate: Date,
        public taskCount: number
    ) {
    }

}
