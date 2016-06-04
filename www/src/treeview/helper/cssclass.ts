'use strict'
/**
 * @module CSSHelper
 */
// interfaces
import { INodeData } from '../interfaces/common-interfaces'
// local imports
import {
  CLASS_TREENODE,
  CLASS_TREENODE_HIDDEN,
  CLASS_TREENODE_FILTERED,
  CLASS_TREENODE_IS_FILE,
  CLASS_TREENODE_NOT_EXPANDABLE,
  CLASS_TREENODE_IS_FOLDER,
  CLASS_TREENODE_EXPANDED,
  CLASS_TREENODE_COLLAPSED,
  CLASS_TREENODE_SELECTED,
  CLASS_TREENODE_HIGHLIGHTED,
  CLASS_TREENODE_BLURRED,
  CLASS_TREENODE_ICON,
  CLASS_TREENODE_ICON_FILE,
  CLASS_TREENODE_ICON_FOLDER_OPEN,
  CLASS_TREENODE_ICON_FOLDER,
  CLASS_TREENODE_ICON_NODE_EXPANDED,
  CLASS_TREENODE_ICON_NODE_COLLAPSED
} from '../constants/cssclasses'
import { ErrorCodes } from '../constants/dictionary'

/**
 * Express the state of a node wrapper via CSS classes.
 *
 * @public
 * @param {INodeData} nodeData A NodeData object containing state and data.
 * @returns {string} The needed CSS class(es) to express the tree node wrapper's state.
 */
export function getTreeNodeWrapperClass(nodeData: INodeData): string {
  // initialize with base class
  let nodeState = []

  // don't show a node when it's parent node is collapsed
  // check if the property exists before calling it's getter
  if (nodeData.parent() && nodeData.parent().expanded && !nodeData.parent().expanded()) {
    nodeState.push(CLASS_TREENODE_HIDDEN)
  }

  // set ignored state (used by the search/filter) whenever one of the filter states (highlighted & ignored) is set.
  /*if (nodeData.highlighted() || nodeData.blurred()) {
    nodeState.push(CLASS_TREENODE_FILTERED)
  }*/

  return nodeState.join(' ')
}

/**
 * Express the state of a node via CSS classes.
 *
 * @public
 * @param {INodeData} nodeData A NodeData object containing state and data.
 * @returns {string} The needed CSS class(es) to express the tree node's state.
 */
export function getTreeNodeClass(nodeData: INodeData): string {
  // initialize with base class
  let nodeState = [CLASS_TREENODE]

  // check if the node is a file or a folder (isLeaf === is a file)
  if (nodeData.isLeaf()) {
    // the node is a file
    nodeState.push(CLASS_TREENODE_IS_FILE)

    // files can't be further expanded
    nodeState.push(CLASS_TREENODE_NOT_EXPANDABLE)
  } else {
    // FUTURE: implement special treatment for restricted nodes (lock icon and removed expander icon maybe?)

    // this node is a folder node
    nodeState.push(CLASS_TREENODE_IS_FOLDER)

    // if no children are present remove the expander icon
    if (nodeData.errorCode() === ErrorCodes.NOT_FOUND) {
      nodeState.push(CLASS_TREENODE_NOT_EXPANDABLE)
    } else {
      // is the node expanded or collapsed?
      nodeState.push((nodeData.expanded()) ? CLASS_TREENODE_EXPANDED : CLASS_TREENODE_COLLAPSED)
    }
  }

  // set selected state
  if (nodeData.selected()) {
    nodeState.push(CLASS_TREENODE_SELECTED)
  }

  // set highlighted state (used by the search/filter)
  if (nodeData.highlighted()) {
    nodeState.push(CLASS_TREENODE_HIGHLIGHTED)
  } else if (nodeData.blurred()) {
    nodeState.push(CLASS_TREENODE_BLURRED)
  }

  return nodeState.join(' ')
}

/**
 * Checks if the given DOM element contains the given CSS class.
 *
 * @public
 * @param {HTMLBaseElement} element A DOM element.
 * @param {string} cls A CSS class.
 * @returns {boolean} Indicates whether the given element has the given CSS class or not.
 */
export function hasClass(element: HTMLBaseElement, cls: string): boolean {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1
}

/**
 * Creates the tree node icon CSS class depicting the current kind of node (folder, opened folder or file).
 *
 * @private
 * @param {INodeData} nodeData
 * @returns {string}
 */
export function getTreeNodeIconClass(nodeData: INodeData): string {
  // initialize with base class
  let nodeState = [CLASS_TREENODE_ICON]

  // check if the node is a file or a folder (isLeaf === is a file)
  if (nodeData.isLeaf()) {
    // the node is a file
    nodeState.push(CLASS_TREENODE_ICON_FILE)
  } else {
    // this node is a folder node
    nodeState.push((nodeData.expanded()) ? CLASS_TREENODE_ICON_FOLDER_OPEN : CLASS_TREENODE_ICON_FOLDER)
  }

  return nodeState.join(' ')
}

/**
 * Creates the tree node expander's CSS class depicting the current state (expanded or collapsed).
 *
 * @private
 * @param {INodeData} nodeData
 * @returns {string}
 */
export function getTreeNodeExpanderIconClass(nodeData: INodeData): string {
  // initialize with base class
  let nodeState = []

  if (!nodeData.isLeaf()) {
    // this node is a folder node
    nodeState.push(CLASS_TREENODE_ICON)
    nodeState.push((nodeData.expanded()) ? CLASS_TREENODE_ICON_NODE_EXPANDED : CLASS_TREENODE_ICON_NODE_COLLAPSED)
  }

  return nodeState.join(' ')
}
