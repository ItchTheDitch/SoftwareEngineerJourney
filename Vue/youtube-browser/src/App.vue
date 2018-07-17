<template>
    <div class="container">
        <SearchBar @termChange="onTermChange" />
        <VideoList :videos="videos" @videoSelect="onVideoSelect"></VideoList>
    </div>
</template>

<script>
    import axios from 'axios';
    import SearchBar from './components/searchBar'
    import VideoList from './components/videoList'
    const API_KEY = "AIzaSyAOAiN1iOH4IVmbQDIPL5RLBp3ZT7iwbZg";

    export default {
        name: "App",
        components: {
            SearchBar,
            VideoList
        },
        data () {
            return {
                videos: []
            }
        },
        methods: {
            onVideoSelect (video) {
                console.log(video);
            },
            onTermChange (searchTerm) {
               axios.get('https://www.googleapis.com/youtube/v3/search', {
                   params: {
                       key: API_KEY,
                       type: 'video',
                       part: 'snippet',
                       q: searchTerm
                   }
               }).then(res => {
                   this.videos = res.data.items;
            });

            }
        }
    }
</script>

<style scoped>

</style>