<template>
    <div>
        <div class="caption">
            <div class="title">
                <div style="display: inline-block">
                    <h3>{{title}}</h3>
                </div>
                <div style="display: inline-block; margin-left: 1%">
                    <button @click="showDeleteConfirm">Удалить заметку</button>
                </div>
            </div>
        </div>
        <div class="form">
            <br>
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
                    <button type="button"
                            class="form-button"
                            @click.prevent="showConfirmCancel">Отменить редактирование
                    </button>
                    <button type="button"
                            class="form-button"
                            @click.prevent="submitForm">Сохранить изменения
                    </button>
                    <button type="button"
                            class="form-button"
                            @click.prevent="cancelChanges">Отменить внесенные изменения
                    </button>
                    <button type="button"
                            class="form-button"
                            @click.prevent="doCancelChanges">Повторить отмененные изменения
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
        </div>
        <confirm-dialog v-if="confirmVisible"
                        :title="confirmTitle"
                        :cancel-action="cancelAction"
                        :apply-action="applyAction"/>
    </div>
</template>

<script>
    import { notes } from "@/storage/NotesData";
    import { Note } from "@/models/Note";
    import { Todo } from '@/models/Todo';
    import ConfirmDialog from "@/components/ConfirmDialog";

    export default {
        name: "NoteEdit",
        components: { ConfirmDialog },
        data: function () {
            return {
                newTodo: new Todo(),
                noteId: null,
                confirmVisible: false,
                confirmTitle: 'Подтвердите действие',
                cancelAction: () => {
                    this.confirmVisible = false;
                },
                applyAction: () => {
                },
                note: {}
            };
        },
        beforeMount() {
            this.noteId = this.$route.params.id === 'null' ? null : this.$route.params.id;

            // делаем копию, чтобы изменения сразу не отображались в компоненте для вывода списка заметок
            this.note = this.copyObject(notes.find(e => e.id === this.noteId) || new Note());
        },
        computed: {
            title: function () {
                return this.noteId ? 'Редактирование заметки' : 'Новая заметка';
            }
        },
        methods: {
            copyObject(obj) {
                return JSON.parse(JSON.stringify(obj));
            },
            submitForm() {
                if (this.noteId) {
                    notes.splice(notes.findIndex(e => e.id === this.note.id), 1, this.note);
                } else {
                    notes.push(this.note);
                }
                localStorage.setItem('notes', JSON.stringify(notes));
                this.$router.go(-1);
            },
            deleteTodo(todoId) {
                this.note.todoList.splice(this.note.todoList.findIndex(e => e.id === todoId), 1);
            },
            addTodo() {
                this.note.todoList.push(this.newTodo);
                this.newTodo = new Todo();
            },
            deleteNote() {
                notes.splice(notes.findIndex(e => e.id === this.noteId), 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                this.$router.go(-1);
            },
            showDeleteConfirm() {
                this.confirmTitle = 'Подтвердите удаление';
                this.applyAction = this.deleteNote;
                this.confirmVisible = true;
            },
            showConfirmCancel() {
                const vm = this;
                this.confirmTitle = 'Отменить редактирование';
                this.applyAction = function () {
                    vm.$router.go(-1);
                };
                this.confirmVisible = true;
            },
            doCancelChanges() {
                this.note = this.oldNote;
            },
            cancelChanges() {
                this.oldNote = this.note;
                this.note = this.copyObject(notes.find(e => e.id === this.noteId) || new Note());
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

    .caption {
        width: 100%;
        height: 15vh;
    }

    .title {
        float: left;
        padding-left: 1%;
    }

</style>
