import 'systemjs-hot-reloader/default-listener.js'

export function __reload (mod) {
  let treenodes = mod.component.getRootNodes()
  if (!treenodes || !treenodes.length) {
    component.importData(mod.component.exportData())
  }
}

import m from 'mithril'
import createYggdrasil from 'mithril-treeview/app'
import simpleTreeData from './test/data/simple-tree'

let tree = createYggdrasil({
  data: simpleTreeData
})
export let component = m.mount(document.getElementById('app'), tree)
