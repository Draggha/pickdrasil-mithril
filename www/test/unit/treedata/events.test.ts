import TreeData from '../../../src/treeview/models/treedata'
import { Events } from '../../../src/treeview/constants/dictionary'

export default function (test) {
  test('TreeData.Events', function (t) {
    t.plan(1)

    // Arrange
    let treeData = new TreeData({})

    // Assert
    t.equal(treeData.Events, Events, '-> should contain all static event names')
  })
}
