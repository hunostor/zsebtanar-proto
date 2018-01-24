import algoli from 'algoliasearch'

const client = algoli(__ALGOLIA__.appId, __ALGOLIA__.key)
const index = client.initIndex('exercises')

export function search(q) {
  return index.search(q)
}
