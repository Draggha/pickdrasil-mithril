import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.isLeaf(), false, '-> should return false on a node')
}

function test2 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Node 1',
    isLeaf: true,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.isLeaf(), true, '-> should return true on a leaf node')
}

function test3 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)
  let expectedValue = true

  // Act
  nodeData.isLeaf(expectedValue)

  // Assert
  t.equal(nodeData.isLeaf(), expectedValue, '-> should change the status to a new value when an argument is given')
}

export default function (test) {
  test('NodeData.isLeaf()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
