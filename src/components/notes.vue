<template>
    <div>
        <div v-for="note in notes" :key="note.id">
            {{note.caption}}
            <div v-for="todo in note.todoList" :key="todo.id">
                {{todo.active}}
                {{todo.text}}
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Notes',
        data: function () {
            return {
                notes: []
            }
        },
        props: {}
    }
</script>

<style scoped>

</style>
