import nodeDataCreateChildNode from './unit/nodedata/createchildnode.test.ts'
import nodeDataErrorCode from './unit/nodedata/errorcode.test.ts'
import nodeDataEvents from './unit/nodedata/events.test.ts'
import nodeDataHasChildren from './unit/nodedata/haschildren.test.ts'
import nodeDataId from './unit/nodedata/id.test.ts'
import nodeDataIsLeaf from './unit/nodedata/isleaf.test.ts'
import nodeDataMetaData from './unit/nodedata/metadata.test.ts'
import nodeDataParent from './unit/nodedata/parent.test.ts'
import nodeDataTitle from './unit/nodedata/title.test.ts'
import nodeDataTraverseChildNodes from './unit/nodedata/traversechildnodes.test.ts'

import treeData from './unit/treedata/_constructor.test.ts'
import treeDataEvents from './unit/treedata/events.test.ts'
import treeDataFindNodes from './unit/treedata/findnodes.test.ts'
import treeDataGetRootNodes from './unit/treedata/getrootnodes.test.ts'
import treeDataSelectedNodes from './unit/treedata/selectednodes.test.ts'
import treeDataTreeData from './unit/treedata/treedata.test.ts'

export let nodeDataTestSuite = [
  nodeDataCreateChildNode,
  nodeDataErrorCode,
  nodeDataEvents,
  nodeDataHasChildren,
  nodeDataId,
  nodeDataIsLeaf,
  nodeDataMetaData,
  nodeDataParent,
  nodeDataTitle,
  nodeDataTraverseChildNodes
]

export let treeDataTestSuite = [
  treeData,
  treeDataEvents,
  treeDataFindNodes,
  treeDataGetRootNodes,
  treeDataSelectedNodes,
  treeDataTreeData
]

export default function (tape) {
  (nodeDataTestSuite.concat(treeDataTestSuite)).map((testSuite) => testSuite(tape))
}
