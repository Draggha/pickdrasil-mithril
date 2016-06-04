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
  t.equal(nodeData.createChildNode, undefined, '-> should not be defined on leaf nodes')
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

  // Act
  nodeData = createNodeData(treeData)
  nodeData.createChildNode(childNodeData).then(function (childNode) {
    // Assert
    t.equal(nodeData.children()[0], childNode, '-> should create a child node when the correct parameters are given')
  }).catch(function () {
    // should never be called
  })
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
  let childNodeData = void 0
  let nodeData

  // Act
  nodeData = createNodeData(treeData)
  nodeData.createChildNode(childNodeData).then(function () {
    // should never be called
  }).catch(function (error) {
    // Assert
    t.notEqual(error, undefined, '-> should throw an error when no data is given')
  })
}

function test4 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let childNodeData = {
    title: 'Node 1.1',
    isLeaf: true,
    errorCode: 0,
    children: []
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)
  nodeData.createChildNode(childNodeData).then(function () {
    // should never be called
  }).catch(function (error) {
    // Assert
    t.notEqual(error, undefined, '-> should throw an error when no "id" property is given')
  })
}

function test5 (t) {
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
    isLeaf: true,
    errorCode: 0,
    children: []
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)
  nodeData.createChildNode(childNodeData).then(function () {
    // should never be called
  }).catch(function (error) {
    // should never be called
    t.notEqual(error, undefined, '-> should throw an error when no "title" property is given')
  })
}

export default function (test) {
  test('NodeData.createChildNode()', function (t) {
    t.plan(5)

    test1(t)
    test2(t)
    test3(t)
    test4(t)
    test5(t)
  })
}
