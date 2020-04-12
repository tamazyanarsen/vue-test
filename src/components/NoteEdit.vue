<template>
    <modal-window @close="$emit('close')">
        <template v-slot:title>
            <h3>{{title}}</h3>
        </template>
        <template v-slot:form>
            <div>
                <form @submit.prevent="submitForm">
                    <label>
                        Название заметки
                        <input name="note_caption"
                               v-model="note.caption"/>
                    </label>
                    <div>
                        <h4>Список задач заметки</h4>
                        <div v-for="todo in note.todoList"
                             :key="todo.id"
                             class="todo">
                            <br>
                            <div>
                                <label>
                                    <input type="checkbox"
                                           v-model="todo.done">
                                </label>
                                <label>
                                    <input v-model="todo.text"
                                           placeholder="Введите название задачи">
                                </label>
                                <div @click.prevent="deleteTodo(todo.id)"
                                     class="delete-todo">
                                    <span class="material-icons"
                                          contenteditable="false">close</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <button type="button" class="form-button"
                            @click.prevent="$emit('close')">Отменить редактирование
                    </button>
                    <button type="button" class="form-button"
                            @click.prevent="submitForm">Сохранить
                    </button>
                </form>
                <br>
                <form @submit.prevent="addTodo">
                    <label>
                        <input name="new_todo"
                               v-model="newTodo.text"
                               placeholder="Введите название задачи">
                    </label>
                </form>
            </div>
        </template>
    </modal-window>
</template>

<script>
    import ModalWindow from "@/components/Dialog";
    import { notes } from "@/storage/NotesData";
    import { Note } from "@/models/Note";
    import { Todo } from '@/models/Todo';

    export default {
        name: "NoteEdit",
        components: { ModalWindow },
        data: function () {
            return {
                newTodo: new Todo(),
                note: new Note()
            };
        },
        props: {
            noteId: String
        },
        beforeMount() {
            this.note = this.noteId ? this.copyObject(notes.find(e => e.id === this.noteId)) : new Note();
        },
        computed: {
            title: function () {
                return this.noteId ? 'Редактирование заметки' : 'Новая заметка';
            },
            // note: function () {
            //     // делаем копию, чтобы изменения сразу не отображались в компоненте для вывода списка заметок
            //     return this.noteId ? this.copyObject(notes.find(e => e.id === this.noteId)) : new Note();
            // }
        },
        methods: {
            copyObject(obj) {
                return JSON.parse(JSON.stringify(obj));
            },
            submitForm() {
                notes.splice(notes.findIndex(e => e.id === this.note.id), 1, this.note);
                this.$emit('close');
            },
            deleteTodo(todoId) {
                this.note.todoList.splice(this.note.todoList.findIndex(e => e.id === todoId), 1);
            },
            addTodo() {
                this.note.todoList.push(this.newTodo);
                this.newTodo = new Todo();
            }
        }
    }
</script>

<style scoped>
    .todo {
        width: 20%;
    }

    .todo:hover .delete-todo {
        display: inline-block;
    }

    .delete-todo {
        float: right;
        display: none;
    }

    .delete-todo .material-icons {
        font-size: 15px;
        cursor: default;
    }

    .form-button {
        margin: 5px;
    }
</style>
