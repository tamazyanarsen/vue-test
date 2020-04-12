import { getRandomNumber } from "@/utils/utils";

export class Todo {
    constructor(text = '', done = false) {
        this.text = String(text);
        this.done = Boolean(done);
        this.id = new Date().getTime().toString() + getRandomNumber();
    }
}
