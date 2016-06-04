import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)

  // Assert
  t.notEqual(nodeData.id(), undefined, '-> should return a unique identifier')
}

function test2 (t) {
  // Arrange
  let treeData = {
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let treeChildData = {
    title: 'Node 1.1',
    isLeaf: true,
    errorCode: 0,
    children: []
  }
  let nodeData
  let childNodeData
  function areDifferentIds (id1, id2) {
    function definedButNotEmptyString (s) {
      return (s !== undefined && s !== '')
    }

    return (
    id1 !== id2 &&
    definedButNotEmptyString(id1) &&
    definedButNotEmptyString(id2)
    )
  }

  // Act
  nodeData = createNodeData(treeData)
  childNodeData = createNodeData(treeChildData)

  // Assert
  t.ok(areDifferentIds(nodeData.id(), childNodeData.id()), '-> should return a unique identifier when no id is given into the constructor')
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
  let expectedId = 'test'

  // Act
  nodeData.id(expectedId)

  // Assert
  t.equal(nodeData.id(), expectedId, '-> should change the id to a new value when an argument is given')
}

export default function (test) {
  test('NodeData.id()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
