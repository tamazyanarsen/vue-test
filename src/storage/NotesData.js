import { Note } from "@/models/Note";
import { Todo } from "@/models/Todo";

export const notes = [
    new Note('заметка 1', [new Todo('task 1'), new Todo('task 2', false)]),
    new Note('заметка 2', [new Todo('task 1'), new Todo('task 2', false),
        new Todo('task 2')])
];
