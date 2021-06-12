<template>
  <v-container>
    <v-row
      no-gutters
      justify="center"
      style="height: 100%"
      >
      <v-col>
        <v-overlay
          id="kekule-app"
          style="width: 100%; height: 100%; margin-top: 64px"
          >
        </v-overlay>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head () {
    const base_url = 'https://chemical.space'
    const ogp_image = `${base_url}/ChemiSpadon.png`
    return {
      title: this.$route.query.pdbid,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=1'},
        { name: 'twitter:card', content: 'player' },
        { name: 'twitter:site', content: '@souyakuchan' },
        { name: 'twitter:creator', content: '@souyakuchan' },
        { name: 'twitter:title', content: 'Protein 3D Viewer: ' + this.$route.query.pdbid },
        { name: 'twitter:description', content: 'Protein 3D Viewer' },
        { name: 'twitter:image', content: ogp_image },
        { name: 'twitter:player', content: 'https://chemical.space/viewer?loadFromPDB=' + this.$route.query.loadFromPDB },
        { name: 'twitter:player:width', content: '512' },
        { name: 'twitter:player:height', content: '512' }
      ],
      script: [
      ],
      link: [
        { rel: 'stylesheet', type: 'text/css', href: '/css/LiteMol-plugin.min.css' },
      ]
    }
  },

  mounted () {
    const app_target = document.getElementById('kekule-app')
    const plugin = LiteMol.Viewer.createInstance(
      app_target,
      {
        isExpanded: false,
        hideControls: true,
      },
      false
    )
  },
}
</script>
