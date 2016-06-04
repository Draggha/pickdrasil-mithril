import { createNodeData } from '../../../src/treeview/models/nodedata'

function test1(t) {
  // Arrange
  let treeNodeWithEmptyObject
  // Act
  treeNodeWithEmptyObject = createNodeData({}) // eslint-disable-line new-cap
  // Assert
  t.notEqual(treeNodeWithEmptyObject, undefined, "-> should be invokeable if an empty object given")
}

function test2(t) {
  // Arrange
  let error
  function catchError(errorProducer) {
    try {
      errorProducer() // eslint-disable-line
    } catch (error) {
      return error
    }
  }
  // Act
  error = catchError(createNodeData)
  // Assert
  t.notEqual(error, undefined, '-> should should throw an exception without any arguments given')
}

function test3(t) {
  // Arrange
  let treeNodeWithValidData
  let validTreeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }

  // Act
  treeNodeWithValidData = createNodeData(validTreeData) // eslint-disable-line new-cap
  // Assert
  t.notEqual(treeNodeWithValidData, undefined, '-> should be invokeable with correct test data')
}

export default function (test) {
  /*
   Since a TreeNode.controller constructs a NodeData instance, tests for its functions and property accessors don't have to be repeated here
   */
  test('NodeData[constructor]', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}