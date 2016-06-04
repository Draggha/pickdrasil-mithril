'use strict'
/**
 * @module TreeView
 */
// interfaces
import { ITreeDataOptions, ITreeData, INodeData } from './interfaces/common-interfaces'
// external libs
import m from 'mithril'
// components
import TreeNode from './treenode'
// local
import TreeData from './models/treedata'
import { CLASS_TREE_HEADER } from './constants/cssclasses'

/**
 * Generates and returns a ready to use tree view component for mithril.js.
 */
let TreeView: any = {}

/**
 * A TreeView component controller.
 *
 * @protected
 * @constructor
 * @param {ITreeNodeOptionsObject} args An options object.
 */
TreeView.controller = function (args: ITreeDataOptions, components: { header?: Array<Object> }) {
  return new TreeData(args)
}

/**
 * A mithril.js component view, which returns an array of Mithril.js components.
 *
 * @protected
 * @param {TreeView.controller} ctrl An instance of a TreeView controller.
 * @param {Object} args An options object.
 * @param {Object} components An object containing various components for different places in the TreeView.
 * @return {Object} An Object that represents a virtual DOM HTMLElement and its children for mithril.js.
 */
TreeView.view = function (ctrl: ITreeData, args: ITreeDataOptions, components: { header?: Array<Object> }): Object {
  return m('div', [
    m('div', { 'class': CLASS_TREE_HEADER }, (!components || !components.header) ? [] : components.header.map((Component) => {
      return m.component(Component, ctrl)
    })),
    (ctrl.getRootNodes().length > 0) ? TreeView.view.createTreeNodeView(ctrl) : ''
  ])
}

/**
 * Recursively walks through all tree nodes and instantiates a new tree node component for every NodeData object found within.
 *
 * @private
 * @param {ITreeData} treeData An Array of NodeData objects.
 * @returns {Object} An Object that represents a virtual DOM HTMLElement and its children for mithril.js.
 */
TreeView.view.createTreeNodeView = (treeData: ITreeData): Object => {
  let componentizeRecursively
  componentizeRecursively = (treeNodes: Array<INodeData>) => {
    return treeNodes.map((treeNode: INodeData) => {
      let result
      if (!treeNode.isLeaf() && treeNode.hasChildren()) {
        result = m.component(TreeNode, { nodeData: treeNode }, componentizeRecursively(treeNode.children()))
      } else {
        result = m.component(TreeNode, { nodeData: treeNode })
      }
      return result
    })
  }

  return componentizeRecursively(treeData.getRootNodes())
}

export default TreeView
