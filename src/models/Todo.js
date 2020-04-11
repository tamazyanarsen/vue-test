export class Todo {
    constructor(active = true, text = '') {
        this.active = active;
        this.text = text;
        this.id = new Date().getTime();
    }
}
