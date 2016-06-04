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
  t.equal(nodeData.traverseChildNodes, undefined, '-> should not be defined on leaf nodes')
}

function test2 (t) {
  // Arrange
  let nodeDataObjLevel1 = {
    id: '1',
    title: 'Node 1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeDataObjLevel2 = {
    id: '1.1',
    title: 'Node 1.1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeDataObjLevel3 = {
    id: '1.1.1',
    title: 'Node 1.1.1',
    isLeaf: false,
    errorCode: 0,
    children: []
  }
  let nodeDataObjLevel4 = {
    id: '1.1.1.1',
    title: 'Node 1.1.1.1',
    isLeaf: true,
    errorCode: 0,
    children: []
  }
  let nodeData
  let expectedPrefix = 'traversed'
  let expectedNodeLevel1Title = `${expectedPrefix}${nodeDataObjLevel1.title}`
  let expectedNodeLevel2Title = `${expectedPrefix}${nodeDataObjLevel2.title}`
  let expectedNodeLevel3Title = `${expectedPrefix}${nodeDataObjLevel3.title}`
  let expectedNodeLevel4Title = `${expectedPrefix}${nodeDataObjLevel4.title}`

  // Act
  nodeData = createNodeData(nodeDataObjLevel1)
  nodeData.createChildNode(nodeDataObjLevel2).then(function (childNodeLevel2) {
    return childNodeLevel2.createChildNode(nodeDataObjLevel3)
  }).then(function (childNodeLevel3) {
    return childNodeLevel3.createChildNode(nodeDataObjLevel4)
  }).then(function (childNodeLevel4) {
    nodeData.traverseChildNodes(function (treeNode) {
      let oldTitle = treeNode.title()
      treeNode.title(`${expectedPrefix}${oldTitle}`)
    })

    // Assert
    t.equal(nodeData.title(), `${expectedNodeLevel1Title}`, `-> should create a root node with the title "${expectedNodeLevel1Title}"`)
    t.equal(nodeData.children()[0].title(), `${expectedNodeLevel2Title}`, `-> should create a child node with the title "${expectedNodeLevel2Title}"`)
    t.equal(nodeData.children()[0].children()[0].title(), `${expectedNodeLevel3Title}`, `-> should create a child node with the title "${expectedNodeLevel3Title}"`)
    t.equal(nodeData.children()[0].children()[0].children()[0].title(), `${expectedNodeLevel4Title}`, `-> should create a child node with the title "${expectedNodeLevel4Title}"`)
  }).catch(function () {
    // should never be called
  })
}

export default function (test) {
  test('NodeData.traverseChildNodes()', function (t) {
    t.plan(5)

    test1(t)
    test2(t)
  })
}
