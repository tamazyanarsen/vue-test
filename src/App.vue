<template>
    <div id="app">
        <notes :items="notes"/>
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
