import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1 (t) {
  // Arrange
  let expectedState = true
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    state: {
      expanded: expectedState
    }
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.expanded(), expectedState, '-> should return true when given into the constructor')
}

function test2 (t) {
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
  t.equal(nodeData.expanded(), expectedState, '-> should return false when no "state" object containing a "expanded" property is given into the constructor')
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
  let expectedState = true

  // Act
  nodeData.expanded(expectedState)

  // Assert
  t.equal(nodeData.expanded(), expectedState, '-> should change the expanded state to a new value when an argument is given')
}

export default function (test) {
  test('NodeData.expanded()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
