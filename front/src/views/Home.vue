<template>
  <v-container class="text-center">
    <v-text-field
        @click:append="getPlaylists"
        @click:append-outer="getPlaylists"
        label="Enter the url of your playlist"
        placeholder="playlist"
        filled
        append-icon="mdi-magnify"
        clearable
        color="#CA2A35"
        id="searchField"
        background-color="grey lighten-2"
        v-model="search"
        :loading="loading"
    ></v-text-field>
    <v-container class="my-5">
      <v-row >
        <v-col v-for="playlist in playlists" :key="playlist.id"  cols="4" sm="2">
          <PlaylistCard :playlist="playlist"/>
        </v-col>
      </v-row>
    </v-container>





  </v-container>
</template>

<script>

  import { getPlaylistId, getRecommendedPlaylist } from '../utils/';
  import PlaylistCard from "../components/PlaylistCard";
  export default {
    name: 'Home',
    components: {
      PlaylistCard
    },
    data(){
      return {
       search: '',
        loading : false,
        playlists: null,
      }
    },
    methods: {
      getPlaylists: async function() {
        if(!this.search) return
        this.loading = true;
        const id = getPlaylistId(this.search);
        this.playlists = await getRecommendedPlaylist(id)
        this.loading = false;
      }
    },


  }
</script>

<style scoped>
#searchField{
  display: inline-block;
  padding: 50px;
}

</style>
