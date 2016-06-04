import TreeData from '../../../src/treeview/models/treedata'

function test1 (t) {
  // Arrange
  let treeData = new TreeData({})

  // Assert
  t.notEqual(treeData, undefined, '-> should be invokeable if an empty object given')
}

function test2 (t) {
  // Arrange
  let error
  function catchError (errorConstructor) {
    try {
      new errorConstructor() // eslint-disable-line
    } catch (error) {
      return error
    }
  }
  // Act
  error = catchError(TreeData)
  // Assert
  t.notEqual(error, undefined, '-> should should throw an exception without any arguments given')
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

  // Assert
  t.notEqual(treeData, undefined, '-> should be invokeable with correct test data')
}

export default function (test) {
  test('TreeData[constructor]', function (t) {
    t.plan(3)

    test1(t)
    test2(t)
    test3(t)
  })
}
