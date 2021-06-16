<template>
  <v-card
      class="ma-auto"
      max-width="400"
      max-height="700"
      height="500"
      min-width="200"
      hover
  >
    <v-img
        class="white--text align-end"
        height="200px"
        :src="isNaN(playlist.id) ? playlist.images[0].url : playlist['picture_big']"
    >
      <v-card-title>{{ playlist.name || playlist.title }}</v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <div>{{ !playlist.description ? 'No description' : playlist.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
          @click="redirect"
          color="#CA2A35"
          text
      >
        Link
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PlaylistCard",
  props: ['playlist'],
  methods: {
    redirect: function(){
      console.log(this.playlist.link);
      open(this.playlist.link);
    }
  }
}
</script>

<style scoped>

</style>