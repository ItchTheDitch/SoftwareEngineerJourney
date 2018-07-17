<template>
   <ul class="list-group">
       <VideoListItem
               v-for="video in videos"
               :listVideo="video"
               :key="video.etag"
               @videoSelect="onVideoSelect"

       >
       </VideoListItem>
   </ul>
</template>

<script>
    import VideoListItem from './videoListItem';
    export default {
        name: "videoList",
        components: {
            VideoListItem
        },
        props: ['videos'],
        methods: {
            onVideoSelect(video) {
                this.$emit('videoSelect', video)
            }
        }
    }
</script>

<style scoped>

</style>