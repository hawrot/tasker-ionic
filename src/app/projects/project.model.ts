import {Task} from "../tasks/task.model";

export class Project {
    constructor(
        public title: string,
        public tasks: [],
        public dueDate: Date,
        public taskCount: number
    ) {
    }

}
