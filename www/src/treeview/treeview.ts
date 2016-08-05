'use strict'
/**
 * @module TreeView
 */
// interfaces
import { IMithrilVNode, ITreeDataOptions, ITreeData, INodeData } from './interfaces/common-interfaces'
// external libs
import m from 'mithril'
// components
import TreeNode from './treenode'
// local
import TreeData from './models/treedata'
import { CLASS_TREE_HEADER } from './constants/cssclasses'

/**
 * TreeView virtual node
 */
interface ITreeViewVNode extends IMithrilVNode {
  attrs: {
    /**
     * @type {ITreeDataOptions} An options object
     */
    options: ITreeDataOptions,
    /**
     * @type {{ header?: Array<Object> }} An array containing various components for different places in the TreeView.
     */
    components: { header?: Array<Object> }
  },
  state: ITreeData
}

/**
 * Recursively walks through all tree nodes and instantiates a new tree node component for every NodeData object found within.
 *
 * @private
 * @param {Array<INodeData>} treeRootNodes An Array of NodeData objects.
 * @returns {Object} An Object that represents a virtual DOM HTMLElement and its children for mithril.js.
 */
const createTreeNodeView = (treeRootNodes: Array<INodeData>): Object => {
  const componentizeRecursively = (nodeDataList: Array<INodeData>) => {
    return nodeDataList.map((nodeData: INodeData) => {
      let result
      if (!nodeData.isLeaf() && nodeData.hasChildren()) {
        result = m(TreeNode, { nodeData }, componentizeRecursively(nodeData.children()))
      } else {
        result = m(TreeNode, { nodeData })
      }
      return result
    })
  }

  return componentizeRecursively(treeRootNodes)
}

/**
 * Generates and returns a ready to use tree view component for mithril.js.
 */
let TreeView = {
  /**
   * A TreeView component controller.
   *
   * @protected
   * @constructor
   * @param {ITreeViewVNode} vnode TreeView virtual node
   */
  oninit: function oninit (vnode: ITreeViewVNode): void {
    vnode.state = new TreeData(vnode.attrs.options)
  },
  /**
   * A mithril.js component view, which returns an array of Mithril.js components.
   *
   * @protected
   * @param {ITreeViewVNode} vnode TreeView virtual node
   * @return {Object} An Object that represents a virtual DOM HTMLElement and its children for mithril.js.
   */
  view: function (vnode: ITreeViewVNode): Object {
    const { state, attrs: { components }} = vnode
    const treeRootNodes = state.getRootNodes()
    return m('div', [
      m('div', { 'class': CLASS_TREE_HEADER }, (!components || !components.header) ? [] : components.header.map((TreeHeaderComponent) => {
        return m(TreeHeaderComponent, { treeData: state })
      })),
      (treeRootNodes.length > 0) ? createTreeNodeView(treeRootNodes) : ''
    ])
  }
}

export default TreeView
