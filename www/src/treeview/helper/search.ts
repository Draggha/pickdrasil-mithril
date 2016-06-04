'use strict'
/**
 * @module SearchHelper
 */
// interfaces
import { INodeData } from '../interfaces/common-interfaces'

/**
 * Searches through all TreeNodes recursively to find one TreeNode by id.
 *
 * @private
 * @param {string} id A TreeNode's unique identifier.
 * @param {(nodeData: INodeData) => void} callback A callback which will be called every time a child, that matches the search parameters, was found.
 */
export function findNodeById(nodeList: Array<INodeData>, id: string, callback: (nodeData: INodeData) => void): void {
  nodeList.map((rootNode) => {
    rootNode.traverseChildNodes((childNode) => {
      if (id === childNode.id()) {
        callback(childNode)
      }
    })
  })
}

/**
 * Searches through all TreeNodes recursively to find a list of TreeNodes by id.
 *
 * @private
 * @param {Array<string>} idList A list of unique identifiers for TreeNodes.
 * @param {(nodeData: INodeData) => void} callback A callback which will be called every time a child, that matches the search parameters, was found.
 */
export function findNodeByListOfIds(nodeList: Array<INodeData>, idList: Array<string>, callback: (nodeData: INodeData) => void): void {
  let copyOfIdList = idList.map(id => id)

  nodeList.map((rootNode) => {
    rootNode.traverseChildNodes((childNode) => {
      if (copyOfIdList.length > 0) {
        for (let i = 0; i < copyOfIdList.length; i++) {
          if (copyOfIdList[i] === childNode.id()) {
            copyOfIdList.splice((i), 1)
            callback(childNode)
            break
          }
        }
      }
    })
  })
}

/**
 * Searches through all TreeNodes recursively to find TreeNodes that have a title similar to the given title.
 *
 * @private
 * @param {string} title A search string.
 * @param {(nodeData: INodeData) => void} callback A callback which will be called every time a child, that matches the search parameters, was found.
 */
export function findNodeByTitle(nodeList: Array<INodeData>, title: string, callback: (nodeData: INodeData) => void): void {
  nodeList.map((rootNode) => {
    rootNode.traverseChildNodes((childNode) => {
      if (childNode.title().toLowerCase().indexOf(title.toLowerCase()) > -1) {
        callback(childNode)
      }
    })
  })
}
