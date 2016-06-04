import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1(t) {
  // Arrange
  let expectedState = true
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    state: {
      blurred: expectedState
    }
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.blurred(), expectedState, '-> should return "true" when initialized with "true"')
}

function test2(t) {
  // Arrange
  let expectedState = false
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
  t.equal(nodeData.blurred(), expectedState, '-> should be initialized with "false" when no parameter given')
}

function test3(t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)
  let expectedState = true

  // Act
  nodeData.blurred(expectedState)

  // Assert
  t.equal(nodeData.blurred(), expectedState, '-> should change the blurred state to a new value when an argument is given')
}

export default function (test) {
  /*
   Since a TreeNode.controller constructs a NodeData instance, tests for its functions and property accessors don't have to be repeated here
   */
  test('NodeData.blurred()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}