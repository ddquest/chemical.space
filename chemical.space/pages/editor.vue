<template>
  <v-container fluid fill-height ma-0 pa-0>
    <v-row no-gutters style="height: 90%">
      <v-col>
        <kekule_editor />
        <v-card-actions>
          <v-btn
            color="#1DA1F2"
            nuxt
            v-on:click="tweet_from_editor"
            dark
            >
            <v-icon
              left
              >
              mdi-twitter
            </v-icon>
            SMILES
          </v-btn>

          <v-btn
            color="#1DA1F2"
            nuxt
            v-on:click="tweet_from_editor_cml"
            dark
            >
            <v-icon
              left
              >
              mdi-twitter
            </v-icon>
            CML
          </v-btn>

          <v-btn
            color="#1DA1F2"
            nuxt
            v-on:click="tweet_from_editor_retro"
            dark
            >
            <v-icon
              left
              >
              mdi-twitter
            </v-icon>
            RETROSYNTHESIZE
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const pako = require("pako")
const base64url = require("base64url")


const getParam = (name, regex) => {
  const r = new RegExp(name + "=(" + regex + ")[&]?", 'i')
  return decodeURIComponent(((window.location.search || '').match(r) || [])[1] || '')
}


const ungzip_base64url = (str) => {
  try {
    var cml_base64decode = base64url.decode(str)
    console.log(`cml_base64decode: ${cml_base64decode}`)
    var result = pako.inflate(cml_base64decode, {to: 'string'})
    console.log(`ungzip: ${result}`)
    var result2 = pako.inflate(base64url.decode(str))
    console.log(result2)
  } catch (err) {
    console.log(err)
  }
  return result
}


const load_rd_mol = async (smi) => {
  const ret = await RDKit.load()
  const rd_mol_org = RDKit.Molecule.smilesToMol(smi)
  rd_mol_org.setProp("_Name", smi)
  rd_mol_org.addHs()
  rd_mol_org.EmbedMolecule()
  rd_mol_org.removeHs()
  return rd_mol_org
}


const get_composer = () => {
  return Kekule.Widget.getWidgetById("chemComposer")
}


const init_editor = () => {
  get_composer().setEnableDimensionTransform(true)
  get_composer().setAutoSetMinDimension(true)
  get_composer().autoResizeToClient()
}


export default {
  head () {
    const base_url = 'https://preview.chemical.space'
    const header_title = (() => {
      let title
      if (this.$route.query.smi != null) {
        title = this.$route.query.smi
      } else {
        title = "CML"
      }
      return title
    })()
    const player_url = (() => {
      let query
      if (this.$route.query.smi != null) {
        query = `/?smi=${this.$route.query.smi}`
      }
      if (this.$route.query.ccml != null) {
        query = `/?ccml=${this.$route.query.ccml}`
      }
      return `${base_url}${query}`
    })()
    const ogp_image = `${base_url}/ChemiSpadon.png`

    return {
      title: header_title,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=1'},
        { name: 'twitter:card', content: 'player' },
        { name: 'twitter:site', content: '@souyakuchan' },
        { name: 'twitter:creator', content: '@souyakuchan' },
        { name: 'twitter:title', content: 'Chemical Editor: ' + header_title },
        { name: 'twitter:description', content: 'Chemical Editor' },
        { name: 'twitter:image', content: ogp_image },
        { name: 'twitter:player', content: player_url },
        { name: 'twitter:player:width', content: '512' },
        { name: 'twitter:player:height', content: '512' }
      ],
      link: [
        { rel: 'stylesheet', href: '/css/kekule.css' }
      ],
      script: [
        { src: '/js/rdkit.js' },
      ]
    }
  },

  mounted () {
    window: onload = function (){
      Kekule.X.domReady(init_editor)
      console.log("Init Kekule editor")
      const smi = getParam('smi', '.+').trim()
      const ccml = getParam('ccml', '.+').trim()

      if (smi != '') {
        const C = load_rd_mol(smi).then(ret => {
          const rd_mol = ret
          const mol_str = ret.molToMolfile()
          const mol = Kekule.IO.loadFormatData(mol_str, 'mol')
          return mol
        })
        C.then(mol => {
          get_composer().setChemObj(mol)})
      }

      if (ccml != '') {
        const cml_str = ungzip_base64url(ccml)
        const mol = Kekule.IO.loadFormatData(cml_str, 'cml')
        get_composer().setChemObj(mol)
      }
    }
  },

  methods: {
    tweet_from_editor() {
      Kekule.X.domReady(init_editor)
      const url = 'https://twitter.com/intent/tweet'
      const mol_export = get_composer().getChemObj()
      const smi_str = Kekule.IO.saveFormatData(mol_export, 'smi')
      const hashtag = "ChemicalSpace_Editor"
      const base_url = "https://chemical.space"
      const intent_url =  (
        url +
        "?hashtags=" + hashtag +
        "&related=souyakuchan,retrosynthchan" +
        "&url=" + base_url + "/editor?smi=" +
        smi_str
      )
      return window.open(intent_url)
    },


    tweet_from_editor_cml() {
      Kekule.X.domReady(init_editor)
      const url = 'https://twitter.com/intent/tweet'
      const mol_export = get_composer().getChemObj()
      const cml_str = Kekule.IO.saveFormatData(mol_export, 'cml')
      const cml_gziped = pako.deflate(cml_str, {'level': 9, to: 'string'})
      const cml_gziped_base64 = base64url(cml_gziped)
      const hashtag = "ChemicalSpace_Editor"
      const base_url = "https://chemical.space"
      const intent_url =  (
        url +
        "?hashtags=" + hashtag +
        "&related=souyakuchan,retrosynthchan" +
        "&url=" + base_url + "/editor?ccml=" +
        cml_gziped_base64
      )
      return window.open(intent_url)
    },


    tweet_from_editor_retro() {
      Kekule.X.domReady(init_editor)
      const url = 'https://twitter.com/intent/tweet'
      const mol_export = get_composer().getChemObj()
      const smi_str = Kekule.IO.saveFormatData(mol_export, 'smi')
      const hashtag = "ChemicalSpace_Retro"
      const intent_url =  (
        url +
        "?hashtags=" + hashtag +
        "&related=souyakuchan,retrosynthchan" +
        "&text=" + "@retrosynthchan " + smi_str
      )
      return window.open(intent_url)
    },
  }
}
</script>
