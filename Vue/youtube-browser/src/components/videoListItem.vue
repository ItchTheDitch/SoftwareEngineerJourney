<template>
    <li class="list-group-item media" @click="onVideoSelect">
        <img class="mr-3" :src="thumbnailUrl" alt=""/>
        <div class="media-body">
            {{ listVideo.snippet.title }}
        </div>
    </li>
</template>

<script>
    export default {
        name: "videoListItem",
        props: ['listVideo'],
        computed: {
            thumbnailUrl() {
                return this.listVideo.snippet.thumbnails.default.url;
            }
        },
        methods: {
            onVideoSelect() {
                this.$emit('videoSelect', this.listVideo)
            }
        }
    }
</script>
<style scoped>
    li {
        display: flex;
        cursor: pointer;
    }

    li:hover {
        background-color: #eee;
    }
</style>

