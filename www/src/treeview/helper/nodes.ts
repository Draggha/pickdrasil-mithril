'use strict'
/**
 * @module NodeHelper
 */
// interfaces
import {
  ITreeDataGlobalOptions,
  INodeDataOptionsObject,
  INodeData,
  ITreeDataOptions
} from '../interfaces/common-interfaces'
// libraries
import m from 'mithril'
// local
import { createNodeData } from '../models/nodedata'

/**
 * Transforms an array of objects and all its children recursively into NodeData objects.
 *
 * @private
 * @param {ITreeDataGlobalOptions} globalConfig All given properties will be copied recursively into every newly created tree node.
 * @param {Array<INodeDataOptionsObject>} nodeList An array of option objects to bootstrap new tree nodes.
 * @param {INodeData} [parent] The parent NodeData object or undefined if it's a root node.
 * @param {number} [index] A tree node's index (number) inside of its parent's children array property.
 * @returns {Array<INodeData>}
 */
function createChildNodes(globalConfig: ITreeDataGlobalOptions, nodeList: Array<INodeDataOptionsObject>, parent?: INodeData, index?: number) {
  let childNodes = []

  if (nodeList && nodeList.length > 0) {
    for (let i = 0, iMax = nodeList.length; i < iMax; i++) {
      let nodeData = nodeList[i]
      nodeData.root = globalConfig.root // global TreeData object
      nodeData.state = globalConfig.state || {} // fetch the global state from the context
      nodeData.events = globalConfig.events || {} // fetch the global event handlers from the context

      let childNode: INodeData = createNodeData(nodeData)
      childNode.index(index || 0) // remember the index
      if (parent) {
        // memorize the node's parent
        childNode.parent(parent)
      }
      if (nodeData.children && nodeData.children.length > 0) {
        // Recursively wade through the dataset and convert all Children to NodeData objects.
        // But first inject the globalConfig object into the context of the createChildNodes function.
        childNode.children = m.prop(createChildNodes(globalConfig, nodeData.children, childNode, (i + 1)))
      }
      // wrap the NodeData objects into getters and setters through m.prop()
      childNodes.push(childNode)
    }
  }
  return childNodes
}

/**
 * Tree data factory function with a couple of helpers.
 *
 * @example
 * var treeData = treeData({
 *    data: Array<Object>, // An Array of Objects. See NodeData implementation for more information about the object's signature
 *    state: Object, // see NodeState implementation for more information about the object's signature
 *    events: Object // see NodeEvents implementation for more information about the object's signature
 * })
 *
 * @protected
 * @param {ITreeDataOptions} dataset
 * @returns {() => Array<INodeData>}
 */
export function convertToTreeData(dataset: ITreeDataOptions): () => Array<INodeData> {
  let rootNodes = []

  return () => {
    if (rootNodes.length < 1) {
      if (!dataset && !dataset.data) {
        throw new Error('[treeData initialization] No dataset given!')
      }
      // inject the globalConfig object into the context of the createChildNodes function
      rootNodes = createChildNodes({
        root: dataset.root,
        state: dataset.state || {},
        events: dataset.events || {}
      }, dataset.data)
    }

    return rootNodes
  }
}
