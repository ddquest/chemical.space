# chemical.space
A WEB portal for chemical space exploration.

[![DOI](https://zenodo.org/badge/345307288.svg)](https://zenodo.org/badge/latestdoi/345307288)


## Cheminformatics tools
[chemical.space](https://chemical.space) provides these WEB-based cheminformatics tools.

### [chemical.space/editor](https://chemical.space/editor)
A simple 2D molecule editor using [Kekule.js](http://partridgejiang.github.io/Kekule.js/).  

#### Load SMILES/CML from URL query.
This editor can load SMILES and CML from URL queries.  

| query | type | format       | example                                    |
| ----- | ---- | ------------ | ------------------------------------------ |
| smi=  | str  | valid SMILES | https://chemical.space/editor?smi=c1ccccc1 |
| ccml= | str  | gzip compressed CML encoded in Base64URL | [https://chemical.space/editor?ccml=eMOawp3C...](https://chemical.space/editor?ccml=eMOawp3Ck8ORbsOCIBTChl_DpcKEw7tBRwHDi2JNwpZ5wrddwrnCvQBWwqYmw5Aaw4rCosK-w71OazZLIhd6d8O4w7nDuVrDvsODwpk3w57DgcOJwrvCtsKvw4kuw4bDgwtjw4fDo8KRwqLDssKEO8K0C1vDljc7w6sNWcOMw53CvsKPwrDDn8OUwqR7w4bClcOvwpxtfsKcHRU_KCZ2w741BHPCvsKUw6PChnkmYMKdw7XCtsKNX8OnwoPCrcOJG8KBE8KvCcKvwqjDkFoUUsOrUihZw4nCksOAGcO1SlLCpXVRST3Cq8K0wpAowrMpwo1naDM6E8K3aMKCworCosOIw5LDigxNUcO-AE1kaMOywqHCm8OKO8O_TVHCrcKrK03CpDR1Z27Ct2hsw5LDn3XDl24mw6XDuMKRNcK2wroLGxtqwrIkMMKYV8O2wrvDp8ODGwBsHMKbWsO5wr_DtTPCtXIwZWotc8OUEsKMSMKtIkcVwoB5JlbCmcKjSsOAwrASwqvDilEVw6DDqx7CgsKZwqTDoW00SxPDjQfDjsOKdQXCrcOxwpjDusOWwrY2ICEQaMK6NmI3asKyWsK-w6_Do0hJwo_CssK_w7nDgsOSXRQcw4jDhS_DusKFDsKV) |

#### SNS sharing feature.
By clicking the buttons for sharing, you can easily share the 2D molecular structure you have created.
Buttons link to these services.

| button          | linked service | feature                                |
| --------------- | -------------- | -------------------------------------- |
| SMILES          | Twitter        | Share structures in cannonical SMILES format. |
| CML             | Twitter        | Share structures in chemical markup language (CML) format; keeping position and rotation of them. |
| RETROSYNTHESIZE | Twitter        | Share structures in cannonical SMILES with request for retrosynthetic analysis by [n-yoshikawa/retrosynthesis_bot](https://github.com/n-yoshikawa/retrosynthesis_bot).

### [chemical.space/viewer](https://chemical.space/viewer)
A simple 3D molecule viewer using [LiteMol](https://www.litemol.org/).  

#### Load 3D data.
This viewer can receive Protein Data Bank ID (PDB ID).

| query        | type | format       | example                                        |
| ------------ | ---- | ------------ | ---------------------------------------------- |
| loadFromPDB= | str  | PDB ID       | https://chemical.space/viewer?loadFromPDB=1ema |


Also, other query types implemented in LiteMol are available (not all of them tested on chemical.space).

### Twitter [@souyakuchan](https://twitter.com/souyakuchan) integration.
`chemical.space` is connected to souyakuchan's laboratory.  
One of the souyakuchan's magic is drawing 2D structures from SMILES.  

You can get 2D structures drawn by souyakuchan. Just tweet `@souyakuchan SMILES #smiles`.  
This feature is derived from [ddquest/chem_bot](https://github.com/ddquest/chem_bot).


---

# development
## Build Setup
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## :whale: build docker images

```bash
$ docker-compose build
$ docker-compose run dev npm install

# then, start with develop mode
$ docker-compose up dev
```

## Production
Use production mode with `docker-compose prod`.
```
$ docker-compose up -d prod
```
