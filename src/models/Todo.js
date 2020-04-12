import { getRandomNumber } from "@/utils/utils";

export class Todo {
    constructor(text = '', active = true) {
        this.text = String(text);
        this.active = Boolean(active);
        this.id = new Date().getTime().toString() + getRandomNumber();
    }
}
