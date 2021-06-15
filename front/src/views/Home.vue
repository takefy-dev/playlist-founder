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
        messages="ffjkj"
    ></v-text-field>
  </v-container>
</template>

<script>

  import { getPlaylistId, getRecommendedPlaylist } from '@/utils';
  export default {
    name: 'Home',
    data(){
      return {
       search: '',
      }
    },
    methods: {
      getPlaylists: async function() {
        if(!this.search) return
        const id = getPlaylistId(this.search);
        const playlists = await getRecommendedPlaylist(id)
        console.log(playlists)

      }
    },

    components: {
    },
  }
</script>

<style scoped>
#searchField{
  display: inline-block;
  padding: 50px;
}

</style>
