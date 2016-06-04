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
  function resolveDefinition (nodeData) {
    function keyIsRegistered (keys, searchKey) {
      return keys.filter((key) => key === searchKey).length > 0
    }
    function isUndef (val) { return val === undefined }
    let keys = Object.keys(nodeData.events)
    function keyExistsEmpty (searchkey) {
      return keyIsRegistered(keys, searchkey) && isUndef(nodeData.events[searchkey])
    }

    return (
    !isUndef(nodeData.events) &&
    keyExistsEmpty('onExpanderClick') &&
    keyExistsEmpty('onNodeClick') &&
    keyExistsEmpty('onNodeCreate') &&
    keyExistsEmpty('onNodeUpdate')
    )
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.ok(resolveDefinition(nodeData), '-> should return an object with "undefined" event handlers for the keys ["onExpanderClick", "onNodeClick", "onNodeCreate", "onNodeUpdate"] when no "event" object with event handler properties is given into the constructor')
}

function test2 (t) {
  // Arrange
  let expectedFunction = function () {
    return true
  }
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    events: {
      onExpanderClick: expectedFunction
    }
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.events.onExpanderClick, expectedFunction, '-> should return the given function when an "event" object with the property "onExpanderClick" is given into the constructor')
}

function test3 (t) {
  // Arrange
  let expectedFunction = function () {
    return true
  }
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    events: {
      onNodeClick: expectedFunction
    }
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.events.onNodeClick, expectedFunction, '-> should return the given value when an "event" object with the property "onNodeClick" is given into the constructor')
}

function test4 (t) {
  // Arrange
  let expectedFunction = function () {
    return true
  }
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    events: {
      onNodeCreate: expectedFunction
    }
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.events.onNodeCreate, expectedFunction, '-> should return the given value when an "event" object with the property "onNodeCreate" is given into the constructor')
}

function test5 (t) {
  // Arrange
  let expectedFunction = function () {
    return true
  }
  let treeData = {
    id: '1',
    title: 'Root Node 1',
    isLeaf: false,
    errorCode: 0,
    children: [],
    events: {
      onNodeUpdate: expectedFunction
    }
  }
  let nodeData

  // Act
  nodeData = createNodeData(treeData)

  // Assert
  t.equal(nodeData.events.onNodeUpdate, expectedFunction, '-> should return the given value when an "event" object with the property "onNodeUpdate" is given into the constructor')
}

export default function (test) {
  test('NodeData.events', function (t) {
    t.plan(5)

    test1(t)
    test2(t)
    test3(t)
    test4(t)
    test5(t)
  })
}
