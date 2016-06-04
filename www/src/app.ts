/**
 * Publicly exposes the treeview component.
 *
 * @author Johann 'Draggha' Haaf
 * @module App
 */
// interfaces
import { ITreeDataGlobalOptions } from './treeview/interfaces/common-interfaces'
// libraries
import m from 'mithril'
// local dependencies
import TreeView from './treeview/treeview'
import SearchBar from './treeview-searchbar/searchbar'

/**
 * Bootstraps the TreeView with given data.
 * @example
 * var treeView = window.KRZTreeView({
 *    data: [{
 *       "id": "id001", // The TreeNode's unique identifier.
 *       "title": "Documents", // The TreeNode's label.
 *       "isLeaf": false, // Indicates if this TreeNode is unable to have child nodes (default: false)
 *       "metaData": [
 *          {
 *             "type": "status", // Indicates, that this type of data will be shown as an icon (the type of icon depends on the value)
 *             "value": true, // A "check mark"-icon will be shown (value = false would show a "forbidden sign"-icon)
 *             "tooltip": "The document has been converted successfully!" // A standard HTML tooltip (as a title attribute on the link tag)
 *          }
 *       ],
 *       "children": [] // An array of data objects (with the same signature as data property) representing this TreeNode's child nodes.
 *    }],
 *    events: {
 *       onExpanderClick: function(event) {
 *          // this === nodeData (@see API doc)
 *          // An event handler which triggers when the expander icon is clicked.
 *       },
 *       onNodeClick: function(event) {
 *          // this === nodeData (@see API doc)
 *          // An event handler which triggers when the node itself is clicked. (Anywhere <strong>but</strong> the expander icon!)
 *       },
 *       onNodeCreate: function(htmlElement) {
 *          // this === nodeData (@see API doc)
 *          // A callback which will be triggered (only once) on TreeNode creation. One event will trigger for every TreeNode. Newly via API created TreeNodes will trigger this callback aswell.
 *       },
 *       onNodeUpdate: function(htmlElement) {
 *          // this === nodeData (@see API doc)
 *          // A callback which will be triggered on every change of a TreeNode. Newly via API created TreeNodes will trigger this callback aswell.
 *       },
 *    }
 * })
 *
 * @public
 * @param {ITreeNodeOptionsObject} options
 * @returns {Object} A TreeView component for mithril.js.
 */
export default function createTreeView(options: ITreeDataGlobalOptions): Object {
  var components = {
    header: [SearchBar]
  }
  return m.component(TreeView, options, components)
}
