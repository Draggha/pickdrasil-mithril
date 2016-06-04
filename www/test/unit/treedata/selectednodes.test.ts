import TreeData from '../../../src/treeview/models/treedata'

function test1 (t) {
  // Arrange
  const data = {
    data: [
      {
        id: '1',
        title: 'Root Node 1',
        isLeaf: false,
        errorCode: 0,
        children: [
          {
            id: '1.1',
            title: 'Node 1.1',
            isLeaf: true,
            errorCode: 0,
            children: []
          },
          {
            id: '1.2',
            title: 'Node 1.2',
            isLeaf: true,
            errorCode: 0,
            children: []
          },
          {
            id: '1.3',
            title: 'Node 1.3',
            isLeaf: false,
            errorCode: 0,
            children: []
          }
        ]
      },
      {
        id: '2',
        title: 'Root Node 2',
        isLeaf: false,
        errorCode: 0,
        children: []
      }
    ]
  }
  let treeData

  // Act
  treeData = new TreeData(data)

  // Assert
  t.equal(treeData.selectedNodes().length, 0, 'should initially return an empty array')
}

function test2 (t) {
  // Arrange
  const data = {
    data: [
      {
        id: '1',
        title: 'Root Node 1',
        isLeaf: false,
        errorCode: 0,
        children: [
          {
            id: '1.1',
            title: 'Node 1.1',
            isLeaf: true,
            errorCode: 0,
            children: []
          },
          {
            id: '1.2',
            title: 'Node 1.2',
            isLeaf: true,
            errorCode: 0,
            children: []
          },
          {
            id: '1.3',
            title: 'Node 1.3',
            isLeaf: false,
            errorCode: 0,
            children: []
          }
        ]
      },
      {
        id: '2',
        title: 'Root Node 2',
        isLeaf: false,
        errorCode: 0,
        children: []
      }
    ]
  }
  let treeData
  let expectedNode

  // Act
  treeData = new TreeData(data)
  expectedNode = treeData.getRootNodes()[0].children()[0]
  treeData.getRootNodes()[0].selected(true)
  expectedNode.selected(true)

  // Assert
  t.equal(treeData.selectedNodes().length, 1, 'should contain only one selected node')
  t.equal(treeData.selectedNodes()[0].id(), expectedNode.id(), 'should contain the most recently selected tree node when more than one node is selected')
}

export default function (test) {
  test('TreeData.selectedNodes()', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
  })
}
