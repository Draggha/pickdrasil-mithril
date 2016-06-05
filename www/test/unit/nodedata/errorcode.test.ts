import { createNodeData } from '../../../src/treeview/models/nodedata'
import { ErrorCodes } from '../../../src/treeview/constants/dictionary'

function test1 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    children: []
  }
  let nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.errorCode(), 0, '-> should return 0 if no error code was given')
}

export default function (test) {
  test('NodeData.errorCode()', function (t) {
    t.plan(1)

    test1(t)
  })
}
