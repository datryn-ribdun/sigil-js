require('dotenv').config()
const Figma = require('figma-js')

const DOC_REF = 'fkE0F4vb1Wf28MSGeFCFRar3'
const PAGE = 'V1.1'
const TOKEN = process.env.FIGMA_API_TOKEN

const figma = Figma.Client({ personalAccessToken: TOKEN })

const countInstances = arr => arr
  .reduce((a, b) => Object.assign(a, {[b]: (a[b] || 0) + 1}), {})

const duplicates = dict => Object
  .keys(dict)
  .filter((a) => dict[a] > 1)

figma.file(DOC_REF)
  .then(res => {

    const components = res.data.components

    const glyphs = Object.values(components)
      .filter(item => item.name.split('')[0] === '_')

    const justNames = glyphs
      .map(g => g.name)

    console.log('Duplicates')
    console.log(duplicates(countInstances(justNames)))
  })
