import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Node 1',
    isLeaf: true,
    errorCode: 0,
    children: []
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.hasChildren, undefined, '-> should not be defined on leaf nodes')
}

function test2 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let childNodeData = {
    id: '1.1',
    title: 'Node 1.1',
    isLeaf: true,
    errorCode: 0,
    children: []
  }
  let nodeData
  let childNode

  // Act
  nodeData = createNodeData(treeData)
  childNode = createNodeData(childNodeData)
  nodeData.children([childNode])

  // Assert
  t.equal(nodeData.hasChildren(), true, '-> should return true when the NodeData object has children')
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
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.hasChildren(), false, '-> should return false when the NodeData object does not have any children')
}

export default function (test) {
  test('NodeData.hasChildren()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
