<template>
  <v-card
      class="ma-auto"
      max-width="400"
      max-height="700"
      height="540"
      min-width="200"
      hover
  >
    <v-img
        class="white--text align-end"
        height="200px"
        :src="isNaN(playlist.id) ? playlist.images[0].url : playlist['picture_big']"
    >

    </v-img>
    <v-card-title>{{ playlist.name || playlist.title }}</v-card-title>
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

      <v-btn
          @click="copyClipboard"
          color="#CA2A35"
          text
      >
        Copy link
      </v-btn>
      <v-fade-transition mode="append" >
      <div v-if="showAlert">
          Link coppied to clipboard
      </div>
      </v-fade-transition>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PlaylistCard",
  props: ['playlist'],
  data(){
    return {
      showAlert: false
    }
  },
  methods: {
    redirect: function(){
      open(this.playlist.link);
    },
    copyClipboard: function (){
      navigator.permissions.query({name: "clipboard-write"}).then(res => {
        if (res.state === "granted" || res.state === "prompt") {
            navigator.clipboard.writeText(this.playlist.link).then(() => {
                this.showAlert = true
              setTimeout(() => {
                this.showAlert = false;
              }, 2000)
            })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>