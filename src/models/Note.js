import { getRandomNumber } from "@/utils/utils";

export class Note {

    constructor(name = '', todoList = []) {
        this.caption = name;
        this.todoList = todoList;
        this.id = new Date().getTime().toString() + getRandomNumber();
    }
}
