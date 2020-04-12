<template>
    <div id="app">
        <notes :notes="notes"/>
    </div>
</template>

<script>
    import Notes from './components/Notes.vue'
    import { notes } from "@/storage/NotesData";

    export default {
        name: 'App',
        components: {
            Notes
        },
        data: function () {
            return {
                notes: notes
            };
        }
    }
</script>

<style>
    #app {
        margin-top: 5%;
        margin-left: 5%;
    }
</style>
