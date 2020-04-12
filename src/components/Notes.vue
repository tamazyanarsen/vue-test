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
                    @click="deleteNote">delete
            </button>
        </div>
        <h1>Заметки</h1>
        <list :items="items">
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
        <note-edit :note-id="selectedNoteId"
                   v-if="noteEditVisible"
                   @close="noteEditVisible=false"/>
    </div>
</template>

<script>
    import NoteEdit from "@/components/NoteEdit";
    import List from "@/components/List";
    import { notes } from '../storage/NotesData';

    export default {
        name: 'Notes',
        components: { List, NoteEdit },
        data: function () {
            return {
                selectedNoteId: null,
                noteEditVisible: false
            };
        },
        props: {
            items: Array
        },
        methods: {
            selectNote(note) {
                this.selectedNoteId = note.id;
            },
            editNote(noteId = this.selectedNoteId) {
                this.selectedNoteId = noteId;
                this.noteEditVisible = true;
            },
            deleteNote() {
                notes.splice(notes.findIndex(e => e.id === this.selectedNoteId), 1);
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
</style>
