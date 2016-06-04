import { createNodeData } from '../../../src/treeview/models/nodedata'
import { ErrorCodes } from '../../../src/treeview/constants/dictionary'

function test1 (t) {
  // Arrange
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    children: []
  }
  let nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.errorCode(), 0, '-> should return 0 if no error code was given')
}

function test2 (t) {
  // Arrange
  let treeData = {
    title: 'Node 1',
    isLeaf: false,
    errorCode: ErrorCodes.NOT_FOUND,
    children: []
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.errorCode(), ErrorCodes.NOT_FOUND, '-> should return the given errorCode when one is given into the constructor')
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
  let expectedErrorCode = ErrorCodes.UNAUTHORIZED

  // Act
  nodeData.errorCode(expectedErrorCode)

  // Assert
  t.equal(nodeData.errorCode(), expectedErrorCode, '-> should change the errorCode to a new value when an argument is given')
}

export default function (test) {
  test('NodeData.errorCode()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
