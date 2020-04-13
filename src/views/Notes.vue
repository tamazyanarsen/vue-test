<template>
    <div>
        <div class="main-actions">
            <button class="material-icons"
                    @click="editNote(null)">note_add
            </button>
            <button class="material-icons"
                    :disabled="!selectedNoteId"
                    @click="editNote(selectedNoteId)">edit
            </button>
            <button class="material-icons"
                    :disabled="!selectedNoteId"
                    @click="confirmVisible=true">delete
            </button>
        </div>
        <h1>Заметки</h1>
        <list :items="notes">
            <template v-slot:item-template="note">
                <div class="note"
                     :class="{'note-selected': note.item.id === selectedNoteId}"
                     @click="selectNote(note.item)">
                    {{note.item.caption}}
                    <h3>Задачи:</h3>
                    <list :items="note.item.todoList.slice(0, note.item.todoList.length > 3 ? 3 : note.item.todoList.length)">
                        <template v-slot:item-template="todo">
                            <div>
                                <label>
                                    <input type="checkbox"
                                           disabled="disabled"
                                           :checked="todo.item.done">
                                    {{todo.item.text}}
                                </label>
                            </div>
                        </template>
                    </list>
                </div>
            </template>
        </list>

        <confirm-dialog v-if="confirmVisible"
                        title="Подтвердите удаление"
                        :cancel-action="cancelAction"
                        :apply-action="deleteNote"/>
    </div>
</template>

<script>
    import List from "@/components/List";
    import { notes } from '../storage/NotesData';
    import ConfirmDialog from "@/components/ConfirmDialog";

    export default {
        name: 'Notes',
        components: { ConfirmDialog, List },
        data: function () {
            return {
                selectedNoteId: null,
                notes: notes || [],
                confirmVisible: false,
                cancelAction: () => {
                    this.confirmVisible = false;
                }
            };
        },
        methods: {
            selectNote(note) {
                this.selectedNoteId = note.id;
            },
            editNote(noteId = this.selectedNoteId) {
                this.selectedNoteId = noteId;
                this.$router.push(`/${this.selectedNoteId}`);
            },
            deleteNote() {
                this.confirmVisible = false;
                this.notes.splice(this.notes.findIndex(e => e.id === this.selectedNoteId), 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                this.selectedNoteId = null;
            }
        }
    }
</script>

<style scoped>
    .material-icons {
        padding: .5%;
    }

    .note {
        border: cornflowerblue solid 2px;
        margin: 1%;
        padding: 1%;
    }

    .note-selected {
        border: brown solid 4px;
    }

    .confirm-button {
        padding: 1%;
    }
</style>
