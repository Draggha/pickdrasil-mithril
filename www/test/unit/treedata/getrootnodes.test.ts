import TreeData from '../../../src/treeview/models/treedata'

function test1 (t) {
  // Arrange
  let data = {
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
        children: []
      },
      {
        id: '3',
        title: 'Root Node 3',
        isLeaf: false,
        errorCode: 0,
        children: []
      }
    ]
  }
  let treeData = new TreeData(data)

  // Assert
  t.equal(treeData.getRootNodes().length, data.data.length, 'should return all root child nodes')
}

function test2 (t) {
  // Arrange
  let data = {
    data: [
      {
        id: '1',
        title: 'Root Node 1',
        isLeaf: false,
        errorCode: 0,
        children: []
      }
    ]
  }
  let treeData = new TreeData(data)
  treeData.getRootNodes(void 0)

  // Assert
  t.equal(treeData.getRootNodes().length, data.data.length, 'should be a getter but no setter function')
}

export default function (test) {
  test('TreeData.getRootNodes()', function (t) {
    t.plan(2)

    test1(t)
    test2(t)
  })
}
