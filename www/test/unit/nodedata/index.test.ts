import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1 (t) {
  // Arrange
  let expectedIndex = 11
  let treeData = {
    index: expectedIndex,
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.index(), expectedIndex, '-> should return a number when given into the constructor')
}

function test2 (t) {
  // Arrange
  let expectedIndex = 0
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.index(), expectedIndex, '-> should return 0 when no index is given into the constructor')
}

function test3 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)
  let expectedIndex = 11

  // Act
  nodeData.index(expectedIndex)

  // Assert
  t.equal(nodeData.index(), expectedIndex, '-> should change the index to a new value when an argument is given')
}

export default function (test) {
  test('NodeData.index()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
