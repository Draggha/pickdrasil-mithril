import { createNodeData } from '../../../src/treeview/models/nodedata'
import { MetaDataTypes } from '../../../src/treeview/constants/dictionary'

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
  t.equal(nodeData.metaData.length, 0, '-> should return an empty array when no "metaData" array was given into the constructor')
}

function test2 (t) {
  // Arrange
  let treeData = {
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    metaData: [
      {
        id: '1',
        value: 'test',
        tooltip: 'just testing'
      }
    ]
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.metaData.length, 0, '-> should not add a MetaData object to the array when no "type" property was given')
}

function test3 (t) {
  // Arrange
  let treeData = {
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    metaData: [
      {
        id: '1',
        type: MetaDataTypes.STATUS,
        tooltip: 'just testing'
      }
    ]
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.metaData.length, 0, '-> should not add a MetaData object to the array when no "value" property was given')
}

function test4 (t) {
  // Arrange
  let metaDataValue = 'mysimpletest'
  let treeData = {
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    metaData: [
      {
        id: '1',
        type: MetaDataTypes.STATUS,
        value: metaDataValue,
        tooltip: 'just testing'
      }
    ]
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.metaData.length, 1, '-> should have exactly one MetaData object in the array')
  t.equal(nodeData.metaData[0].value(), metaDataValue, '-> should add a MetaData object to the array when a valid object was given')
}

export default function (test) {
  test('NodeData.metaData', function (t) {
    t.plan(5)

    test1(t)
    test2(t)
    test3(t)
    test4(t)
  })
}
