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
                        <textarea name="note_caption"
                                  :v-model="note.caption"/>
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

            }
        }
    }
</script>

<style scoped>
</style>
