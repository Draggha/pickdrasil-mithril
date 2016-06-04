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
      selected: expectedState
    }
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.selected(), expectedState, '-> should return true when given into the constructor')
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
  t.equal(nodeData.selected(), expectedState, '-> should return false when no "state" object containing a "selected" property is given into the constructor')
}

function test3 (t) {
  // Arrange
  let treeData = {
    root: {
      selectedNodes: function () {
        return []
      }
    },
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)
  let expectedState = true

  // Act
  nodeData.selected(expectedState)

  // Assert
  t.equal(nodeData.selected(), expectedState, '-> should change the selected state to a new value when an argument is given')
}

export default function (test) {
  test('NodeData.selected()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
