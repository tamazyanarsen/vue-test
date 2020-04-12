<template>
    <modal-window @close="$emit('close')">
        <template v-slot:title>
            <h3>{{title}}</h3>
        </template>
        <template v-slot:form>
            <div>
                <form action=""
                      @submit.prevent="onSubmit">
                    <label>
                        Название заметки
                        <input name="note_caption"
                               v-model="note.caption"/>
                    </label>
                    <div>
                        <div v-for="todo in note.todoList"
                             :key="todo.id"
                             class="todo">
                            <p>
                                <label>
                                    <input type="checkbox"
                                           v-model="todo.done">
                                </label>
                                <label>
                                    <input v-model="todo.text">
                                </label>
                                <button class="material-icons delete-todo"
                                        @click="deleteTodo(todo.id)">close
                                </button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </template>
    </modal-window>
</template>

<script>
    import ModalWindow from "@/components/Dialog";
    import { notes } from "@/storage/NotesData";
    import { Note } from "@/models/Note";

    export default {
        name: "NoteEdit",
        components: { ModalWindow },
        props: {
            noteId: String
        },
        computed: {
            title: function () {
                return this.noteId ? 'Редактирование заметки' : 'Новая заметка';
            },
            note: function () {
                return notes.find(e => e.id === this.noteId) || new Note();
            }
        },
        methods: {
            onSubmit: function () {

            },
            deleteTodo(todoId) {
                this.note.todoList.splice(this.note.todoList.findIndex(e => e.id === todoId), 1);
            }
        }
    }
</script>

<style scoped>
    .todo {
        width: 20%;
    }

    .delete-todo {
        float: right;
        font-size: 10px;
    }
</style>
