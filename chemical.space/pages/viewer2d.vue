<template>
  <v-container fluid fill-height ma-0 pa-0>
    <v-row no-gutters style="height: 100%">
      <v-col>
        <div
          id="chemViewer"
          style="width: 100%; height: 90%; background-color: #fff"
          data-widget="Kekule.ChemWidget.Viewer2D"
          data-enable-toolbar="true"
          data-auto-size="false"
          data-padding="20"
          >
        </div>
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
  rd_mol_org.compute2DCoords()
  return rd_mol_org
}


let viewer
const init_viewer = () => {
  viewer = Kekule.Widget.getWidgetById("chemViewer")
}

export default {
  head() {
    const base_url = 'https://chemical.space'
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
        query = `/viewer2d?smi=${this.$route.query.smi}`
      }
      if (this.$route.query.ccml != null) {
        query = `/viewer2d?ccml=${this.$route.query.ccml}`
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
        { name: 'twitter:title', content: 'ChemViewer2D: ' + header_title },
        { name: 'twitter:description', content: '2D Chemical Viewer' },
        { name: 'twitter:image', content: ogp_image },
        { name: 'twitter:player', content: player_url },
        { name: 'twitter:player:width', content: '512' },
        { name: 'twitter:player:height', content: '512' }
      ],
      link: [
        { rel: 'stylesheet', href: '/css/kekule.css' },
      ],
      script: [
        { src: '/js/rdkit.js' },
        { src: '/js/kekule/kekule.js?modules=chemWidget,algorithm' }
      ]
    }
  },
  mounted() {
    window: onload = function() {
      Kekule.X.domReady(init_viewer)
      console.log("Init Kekule viewer2D")
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
          viewer.setChemObj(mol)})
      }

      if (ccml != '') {
        const cml_str = ungzip_base64url(ccml)
        const mol = Kekule.IO.loadFormatData(cml_str, 'cml')
        viewer.setChemObj(mol)
      }
    }
  },
}
</script>
