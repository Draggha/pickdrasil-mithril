import nodeData from './unit/nodedata/_constructor.test.ts'
import nodeDataBlurred from './unit/nodedata/blurred.test.ts'
import nodeDataChildren from './unit/nodedata/children.test.ts'
import nodeDataCreateChildNode from './unit/nodedata/createchildnode.test.ts'
import nodeDataErrorCode from './unit/nodedata/errorcode.test.ts'
import nodeDataEvents from './unit/nodedata/events.test.ts'
import nodeDataExpanded from './unit/nodedata/expanded.test.ts'
import nodeDataHasChildren from './unit/nodedata/haschildren.test.ts'
import nodeDataHighlighted from './unit/nodedata/highlighted.test.ts'
import nodeDataId from './unit/nodedata/id.test.ts'
import nodeDataIndex from './unit/nodedata/index.test.ts'
import nodeDataIsLeaf from './unit/nodedata/isleaf.test.ts'
import nodeDataMetaData from './unit/nodedata/metadata.test.ts'
import nodeDataParent from './unit/nodedata/parent.test.ts'
import nodeDataSelected from './unit/nodedata/selected.test.ts'
import nodeDataTitle from './unit/nodedata/title.test.ts'
import nodeDataTraverseChildNodes from './unit/nodedata/traversechildnodes.test.ts'

import treeData from './unit/treedata/_constructor.test.ts'
import treeDataEvents from './unit/treedata/events.test.ts'
import treeDataFindNodes from './unit/treedata/findnodes.test.ts'
import treeDataGetRootNodes from './unit/treedata/getrootnodes.test.ts'
import treeDataSelectedNodes from './unit/treedata/selectednodes.test.ts'
import treeDataTreeData from './unit/treedata/treedata.test.ts'

export let nodeDataTestSuite = [
  nodeData,
  nodeDataBlurred,
  nodeDataChildren,
  nodeDataCreateChildNode,
  nodeDataErrorCode,
  nodeDataEvents,
  nodeDataExpanded,
  nodeDataHasChildren,
  nodeDataHighlighted,
  nodeDataId,
  nodeDataIndex,
  nodeDataIsLeaf,
  nodeDataMetaData,
  nodeDataParent,
  nodeDataSelected,
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
