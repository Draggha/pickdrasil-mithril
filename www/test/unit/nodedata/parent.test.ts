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
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.parent(), undefined, '-> should return "undefined" on a root node')
}

function test2 (t) {
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
  childNodeData.parent = nodeData
  childNode = createNodeData(childNodeData)

  // Assert
  t.equal(childNode.parent(), nodeData, '-> should return a reference to the parent node one was given in the constructor')
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
  let expectedParent = {id: 'testobject'}

  // Act
  nodeData = createNodeData(treeData)
  nodeData.parent(expectedParent)

  // Assert
  t.equal(nodeData.parent(), expectedParent, '-> should change the parent to a new value when an argument is given')
}

export default function (test) {
  test('NodeData.parent()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
