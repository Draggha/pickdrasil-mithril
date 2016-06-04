import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1 (t) {
  // Arrange
  let treeData = {
    id: '1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)
  let expectedTitle = 'New Node'

  // Assert
  t.equal(nodeData.title(), expectedTitle, '-> should return the title "New Node" if no title was given')
}

function test2 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeData = createNodeData(treeData)
  let expectedTitle = treeData.title

  // Assert
  t.equal(nodeData.title(), expectedTitle, "-> should return the node's title")
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
  let expectedTitle = 'test'

  // Act
  nodeData.title(expectedTitle)

  // Assert
  t.equal(nodeData.title(), expectedTitle, '-> should change the title to a new value when an argument is given')
}

export default function (test) {
  test('NodeData.title()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
