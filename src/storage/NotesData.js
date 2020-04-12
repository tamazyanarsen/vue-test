import { Note } from "@/models/Note";
import { Todo } from "@/models/Todo";

export const notes = JSON.parse(localStorage.getItem('notes')) ||
    [
        new Note('заметка 1', [new Todo('task 1'), new Todo('task 2', true)]),
        new Note('заметка 2', [new Todo('task 1'), new Todo('task 2', true),
            new Todo('task 2')])
    ];
