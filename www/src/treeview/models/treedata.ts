'use strict'
/**
 * @module TreeData
 */
// interfaces
import {
  ITreeNodeEventsObject,
  INodeDataOptionsStateObject,
  INodeDataOptionsObject,
  INodeData,
  ITreeDataGlobalOptions,
  ITreeDataOptions,
  ITreeData
} from '../interfaces/common-interfaces'
// external libs
import m from 'mithril'
// local
import { Events } from '../constants/dictionary'
import { findNodeById, findNodeByListOfIds, findNodeByTitle } from '../helper/search'
import { convertToTreeData } from '../helper/nodes'

/**
 * The root data object for the tree.
 *
 * @public
 * @constructor
 * @param {ITreeDataOptions} options
 */
export default function TreeData(options: ITreeDataOptions): void {
  let self = this
  let globalEvents = m.prop(options.events || {})

  options.root = this
  this.treeData = convertToTreeData(options)

  /**
   * Returns an Array of all root nodes.
   *
   * @instance
   * @returns {Array<INodeData>} An Array of all root nodes.
   */
  this.getRootNodes = (): Array<INodeData> => {
    return this.treeData()
  }

  /**
   * Searches for all TreeNode objects that match the given arguments.
   * @example
   * // 1. Fuzzy search for the given title
   * var foundNodes = tree.findNodes("new"); // would find e.g.: "My New TreeNode", "newtreenode" and the like
   *
   * // 2. Exact search for the given id
   * var foundNodes = tree.findNodes({ id: "id"})
   *
   * // 3. Exact search for the given multiple ids
   * var foundNodes = tree.findNodes(["id1", "id2", "id3"])
   *
   * @instance
   * @param {string | { id: string } | Array<string>} identifier Either a string representing a title, an object
   * containing a title property OR an object containing an id property.
   * @param {(nodeData: INodeData) => void} callback A callback which will be called every time a child, that matches the search parameters, was found.
   */
  this.findNodes = (identifier: string | { id: string } | Array<string>, callback: (nodeData: INodeData) => void): void => {
    if (identifier) {
      if (typeof (<string>identifier) === 'string') {
        findNodeByTitle(self.treeData(), (<string>identifier), callback)
      } else if (typeof identifier === 'object') {
        // search by id
        if ((<{ id: string }>identifier).id && typeof (<{ id: string }>identifier).id === 'string') {
          findNodeById(self.treeData(), (<{ id: string }>identifier).id, callback)
        } else if ((<Array<string>>identifier).filter !== void 0) {
          // id should be an array of strings
          let idList = (<Array<string>>identifier).filter((_id) => {
            return (typeof _id === 'string')
          })
          findNodeByListOfIds(self.treeData(), idList, callback)
        }
      }
    }
  }

  /**
   * Gets an Array of all selected TreeNodes.
   * - OR -
   * Sets a new/changed Array of selected TreeNodes.
   *
   * @instance
   * @function
   * @param {Array<INodeData>} [nodesList] A new/changed Array of selected TreeNodes.
   * @returns {Array<INodeData>} An Array of selected TreeNodes.
   */
  this.selectedNodes = m.prop([]) as (nodesList?: Array<INodeData>) => Array<INodeData>

  /**
   * @see module:Dictionary#Events
   */
  this.Events = Events

  /**
   * Imports the given data into the TreeView instance discarding all previous data.
   *
   * @instance
   * @function
   * @param {ITreeDataOptions} data
   */
  this.importData = (data: ITreeDataOptions): void => {
    self.treeData = convertToTreeData(data)
  }

  /**
   * Exports the TreeView data to native data types (Arrays and objects) so it can be imported again through the importData method.
   *
   * @instance
   * @function
   * @returns {{ data: ITreeDataOptions, events: ITreeNodeEventsObject }} A data export which can be fed into
   */
  this.exportData = (): { data: ITreeDataOptions, events: ITreeNodeEventsObject } => {
    let objectifyRecursively
    objectifyRecursively = (treeData) => {
      return treeData.map(
        (data) => {
          return data.toJson(true)
        }
      ) || []
    }

    return {
      data: objectifyRecursively(self.treeData()) || [],
      events: globalEvents()
    }
  }
}
