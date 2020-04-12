<template>
    <div>
        <div class="main-actions">
            <button class="material-icons">note_add</button>
            <button class="material-icons">edit</button>
            <button class="material-icons">delete</button>
        </div>
        <h1>Заметки</h1>
        <div v-for="note in notes"
             :key="note.id"
             class="note"
             :class="{'note-selected': note.id === selectedNoteId}"
             @click="selectNote(note)">
            {{note.caption}}
            <h3>Задачи:</h3>
            <div v-for="todo in note.todoList"
                 :key="todo.id">
                <div>
                    <label>
                        <input type="checkbox"
                               disabled="disabled"
                               :checked="!todo.active">
                        {{todo.text}}
                    </label>
                </div>
            </div>
        </div>
        <note-edit/>
    </div>
</template>

<script>
    import NoteEdit from "@/components/NoteEdit";

    export default {
        name: 'Notes',
        components: { NoteEdit },
        data: function () {
            return { selectedNoteId: null };
        },
        props: {
            notes: Array
        },
        methods: {
            selectNote(note) {
                this.selectedNoteId = note.id;
            }
        }
    }
</script>

<style scoped>
    .material-icons {
        padding: .5%;
    }

    .note {
        border: cornflowerblue solid 3px;
        margin: 1%;
    }

    .note-selected {
        border: brown solid 3px;
    }
</style>
