<template>
    <v-container>
    <v-sheet>
    <p
        class="text-h5"
        >
        A chemical.space is one of an archive for chemoinformatics tools.</br>
        Integrate chemoinformatics tools we are interested as SNS-connected apps.
    </p>
    </v-sheet>
      <v-row dense>
        <v-col
          cols=12
          xs=12
          sm=12
          md=12
          lg=6
          >
          <v-card
            height="max-content"
            >
            <v-card-title class="headline">
              editor
            </v-card-title>
            <v-card-subtitle>
              Editor for chemical strcutures. Using Kekule.js.
            </v-card-subtitle>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-spacer
                    cols=12
                    xs=12
                    sm=12
                    md=12
                    lg=9
                    xl=9
                    >
                  </v-spacer>
                  <v-col
                    cols=12
                    xs=12
                    sm=12
                    md=12
                    lg=3
                    xl=3
                    >
                    <v-btn
                      color="accent"
                      nuxt
                      to="/editor"
                      >
                      launch
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          cols=12
          xs=12
          sm=12
          md=12
          lg=6
          >
          <v-card
            height="max-content"
            >
            <v-card-title class="headline">
              viewer
            </v-card-title>
            <v-card-subtitle>
              Viewer for PDB proteins by LiteMol.
            </v-card-subtitle>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col
                    cols=12
                    xs=12
                    sm=12
                    md=12
                    lg=9
                    xl=9
                    class="pb-0"
                    >
                    <v-text-field
                      v-model="pdbid"
                      class="ma-0 pa-0"
                      placeholder="pdbid"
                      >
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols=12
                    xs=12
                    sm=12
                    md=12
                    lg=3
                    xl=3
                    >
                    <v-btn
                      color="accent"
                      nuxt
                      v-on:click="launch_viewer"
                      >
                      launch
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
</template>

<script>

export default {
  data() {
    return {
      pdbid: '1ema',
    }
  },
  methods: {
    launch_viewer () {
      const url = '/viewer?loadFromPDB=' + this.pdbid
      this.$router.push({ path: url })
    }
  }
}
</script>
