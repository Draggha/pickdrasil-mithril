import TreeData from '../../../src/treeview/models/treedata'

function test1 (t) {
  // Arrange
  let treeData = new TreeData({})

  // Assert
  t.equal(treeData.treeData().length, 0, 'should be empty if no data is given')
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

  // Assert
  t.equal(treeData.treeData().length, 1, 'should contain data if data is given')
}

function test3 (t) {
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
  treeData.treeData(void 0)

  // Assert
  t.equal(treeData.treeData().length, 1, 'should be a getter but not a setter function')
}

export default function (test) {
  test('TreeData.treeData', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
