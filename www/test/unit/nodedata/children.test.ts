import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1(t) {
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
  t.equal(nodeData.children().length, 0, '-> should return an empty array when no child nodes are given')
}

function test2(t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [
      {
        id: '1.1',
        title: 'Node 1.1',
        isLeaf: true,
        errorCode: 0,
        children: []
      },
      {
        id: '1.2',
        title: 'Node 1.2',
        isLeaf: true,
        errorCode: 0,
        children: []
      }
    ]
  }
  let nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.children().length, 2, '-> should return a non-empty array when child nodes are given')
}

function test3(t) {
  // Arrange
  let rootNodeData = {
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
  nodeData = createNodeData(rootNodeData)
  childNode = createNodeData(childNodeData)
  nodeData.children([childNode])

  // Assert
  t.equal(nodeData.children()[0], childNode, '-> should swap out the reference to a new array when a one is given')
}

export default function (test) {
  test('NodeData.children()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}