import TreeData from '../../../src/treeview/models/treedata'

function test1 (t) {
  // Arrange
  const identifier = {
    id: '1.3.1'
  }
  const expectedChildNode = {
    id: identifier.id,
    title: 'Node 1.3.1',
    isLeaf: true,
    errorCode: 0,
    children: []
  }
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
            children: [
              expectedChildNode
            ]
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
  treeData.findNodes(identifier, function (matchingNode) {
    // Assert
    t.equal(matchingNode.id(), expectedChildNode.id, '-> should find one node by id when given an object with an "id" property containing a string. This callback should only be triggered once.')
  })
}

function test2 (t) {
  // Arrange
  const identifier = [
    '2.1',
    '2.2',
    '2.3'
  ]
  const expectedChildNodes = [
    {
      id: identifier[0],
      title: 'Node 2.1',
      isLeaf: true,
      errorCode: 0,
      children: []
    },
    {
      id: identifier[1],
      title: 'Node 2.2',
      isLeaf: true,
      errorCode: 0,
      children: []
    },
    {
      id: identifier[2],
      title: 'Node 2.3',
      isLeaf: false,
      errorCode: 0,
      children: []
    }
  ]
  const data = {
    data: [
      {
        id: '1',
        title: 'Root Node 1',
        isLeaf: false,
        errorCode: 0,
        children: []
      },
      {
        id: '2',
        title: 'Root Node 2',
        isLeaf: false,
        errorCode: 0,
        children: expectedChildNodes
      }
    ]
  }
  let treeData

  // Act
  treeData = new TreeData(data)
  treeData.findNodes(identifier, function (matchingNode) {
    // Assert
    t.ok(expectedChildNodes.filter((node) => (matchingNode.id() === node.id)).length > 0, '-> should find 3 nodes by id when given an array of 3 existing ids. This callback will be called thrice.')
  })
}

function test3 (t) {
  // Arrange
  const identifier = 'root'
  const expectedNodes = [
    {
      id: '1',
      title: 'Root Node 1',
      isLeaf: false,
      errorCode: 0
    },
    {
      id: '2',
      title: 'Root Node 2',
      isLeaf: false,
      errorCode: 0
    }
  ]
  const data = {
    data: [
      {
        id: expectedNodes[0].id,
        title: expectedNodes[0].title,
        isLeaf: expectedNodes[0].isLeaf,
        errorCode: expectedNodes[0].errorCode,
        children: []
      },
      {
        id: expectedNodes[1].id,
        title: expectedNodes[1].title,
        isLeaf: expectedNodes[1].isLeaf,
        errorCode: expectedNodes[1].errorCode,
        children: [
          {
            id: '2.1',
            title: 'Node 2.1',
            isLeaf: true,
            errorCode: 0,
            children: []
          },
          {
            id: '2.2',
            title: 'Node 2.2',
            isLeaf: true,
            errorCode: 0,
            children: []
          },
          {
            id: '2.3',
            title: 'Node 2.3',
            isLeaf: false,
            errorCode: 0,
            children: []
          }
        ]
      }
    ]
  }
  let treeData

  // Act
  treeData = new TreeData(data)
  treeData.findNodes(identifier, function (matchingNode) {
    // Assert
    t.ok(expectedNodes.filter((node) => (matchingNode.id() === node.id)).length > 0, `-> should find 2 nodes by title when given the search string "${identifier}". This callback should be called thrice.`)
  })
}

export default function (test) {
  test('TreeData.findNodes()', function (t) {
    t.plan(6)

    test1(t)
    test2(t)
    test3(t)
  })
}
