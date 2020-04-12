<template>
    <div class="dialog">
        <div class="caption">
            <div class="title">
                <slot name="title"/>
            </div>
            <div class="close-button">
                <button class="material-icons"
                        @click="$emit('close')">close
                </button>
            </div>
        </div>
        <p class="body">
            <slot name="form"/>
            <slot name="confirm"/>
        </p>
    </div>
</template>

<script>
    export default {
        name: "Dialog"
    }
</script>

<style scoped>
    .dialog {
        position: fixed;
        background: aliceblue;
        box-shadow: 0 0 100px rgba(0, 0, 0, 0.5); /* Параметры тени */
        opacity: 1;
        left: 10%;
        top: 10%;
        z-index: 1000;
        height: 80vh;
        width: 80%;
    }

    .caption {
        width: 100%;
        height: 10%;
    }

    .title {
        float: left;
        padding-left: 1%;
    }

    .body{
        margin: 1%;
    }

    .close-button {
        float: right;
        padding-right: 1%;
        padding-top: 1%;
    }
</style>
