'use strict'
/**
 * @module TreeNode
 */
// interfaces
import {
  IMithrilVNode,
  INodeData,
  INodeMetaData,
  IEventHandler
 } from './interfaces/common-interfaces'
// external libs
import m from 'mithril'
import radio from 'radio' // PubSub library
// local
import {
  CLASS_TREE_CONTAINER,
  CLASS_TREENODE_TITLE,
  CLASS_METADATA,
  CLASS_METADATA_ICON,
  CLASS_METADATA_ICON_STATUS_OFF,
  CLASS_METADATA_ICON_STATUS_ON,
  CLASS_TREENODE_ICON_NODE_EXPANDED,
  CLASS_TREENODE_ICON_NODE_COLLAPSED
} from './constants/cssclasses'
import { MetaDataTypes, PubSubTopics } from './constants/dictionary'
import { hasClass, getTreeNodeWrapperClass, getTreeNodeClass, getTreeNodeExpanderIconClass, getTreeNodeIconClass } from './helper/cssclass'
import MetaDataStatusIndicator from './components/MetaDataStatusIndicator'

interface ITreeNodeVNode extends IMithrilVNode {
  attrs: {
    /**
     * @type {INodeData} A Node data object which represents a tree node with all its possible functions.
     */
    nodeData: INodeData
  },
  /**
   * @type {INodeData} A Node data object which represents a tree node with all its possible functions.
   */
  state: INodeData
}

interface ITreeNodeEvent extends ITreeNodeVNode {
  /**
   * @type {HTMLBaseElement} 
   */
  domElement: HTMLBaseElement
}

/**
 * Toggles the TreeNode's "selected" state.
 * The context will be modified to contain a TreeNode controller (this => instanceof(TreeNode.controller)).
 *
 * @protected
 * @this {INodeData}
 * @param {Event} event An event object created by clicking on the node.
 */
export function onNodeClick(nodeData: INodeData) {
  return (event: Event): void => {
    // don't do anything if the expander was clicked (the expander's behaviour will be treated differently)
    if (hasClass((<HTMLBaseElement>event.target), CLASS_TREENODE_ICON_NODE_EXPANDED)
      || hasClass((<HTMLBaseElement>event.target), CLASS_TREENODE_ICON_NODE_COLLAPSED)) {
      return
    }

    nodeData.selected(!nodeData.selected())
    let nodeClicked = nodeData.events.onNodeClick

    if (nodeClicked) {
      // Bind the nodeClicked event's context to the current NodeData object
      // and fire it with the current click event data.
      (<IEventHandler>nodeClicked).call(nodeData, event)
      m.redraw()
    }
  }
}

/**
 * Toggles the TreeNode's "expanded" state.
 * The context will be modified to contain a TreeNode controller (this => instanceof(TreeNode.controller)).
 * It will trigger a user defined expanderClicked callback from the NodeData's events property if one was defined.
 *
 * @protected
 * @this {INodeData}
 * @param {Event} event An event object created by clicking directly on the expander icon.
 */
export function onExpanderClick(nodeData: INodeData) {
  return (event: Event): void => {
    if (!nodeData.isLeaf()) {
      const expanderClicked = nodeData.events.onExpanderClick
      const nodeDataHasChildren = nodeData.hasChildren()

      if (nodeDataHasChildren) {
        nodeData.expanded(!nodeData.expanded())
      }
      if (expanderClicked) {
        // Bind the expanderClicked event's context to the current NodeData object
        // and fire it with the current click event data.
        (<IEventHandler>expanderClicked).call(nodeData, event)
        radio(PubSubTopics.TREE_STRUCTURE_CHANGED).broadcast()
      }
      if (nodeDataHasChildren || expanderClicked) {
        m.redraw()
      }
    }
  }
}

/**
 * Triggers after the component was inserted into the DOM for the first time.
 * The context of the user generated onNodeCreate function will be modified to contain a reference to the
 * TreeNode's NodeData object.
 *
 * @protected
 * @param {ITreeNodeEvent} vnode TreeNode virtual node
 */
export function onNodeCreated(vnode: ITreeNodeEvent): void {
  const { state: nodeData } = vnode
  const { events: { onNodeCreate } } = nodeData

  if (onNodeCreate) {
    const { domElement } = vnode
    onNodeCreate.call(nodeData, domElement)
  }
}

/**
 * Triggers after the component was updated in the DOM.
 * The context of the user generated onNodeUpdate function will be modified to contain a reference to the
 * TreeNode's NodeData object.
 *
 * @protected
 * @param {ITreeNodeEvent} vnode TreeNode virtual node
 */
export function onNodeUpdated(vnode: ITreeNodeEvent): void {
  const { state: nodeData } = vnode
  const { events: { onNodeUpdate } } = nodeData

  if (onNodeUpdate) {
    const { domElement } = vnode
    onNodeUpdate.call(nodeData, domElement)
  }
}

/**
 * Creates a MetaData view.
 *
 * @param {INodeMetaData} meta A MetaData object.
 * @returns {Object} A VDOM snippet for mithril.
 */
const createMetaDataView = (meta: INodeMetaData): Object => {
  if (meta.type() === MetaDataTypes.STATUS) {
    return m(MetaDataStatusIndicator, meta)
  } else {
    return m("span", {
      style: {
        border: "1px dotted lightgray",
        display: "inline",
        fontSize: "11px",
        fontWeight: "bold",
        color: "grey",
        marginLeft: "5px",
        padding: "2px 6px 2px 2px"
      },
      title: meta.tooltip()
    }, [meta.value()])
  }
}

/**
 * @type {IMithrilComponent}
 */
let TreeNode = {
  /**
   * A TreeNode's controller.
   *
   * @protected
   * @constructor
   * @param {ITreeNodeVNode} vnode TreeNode virtual node
   */
  oninit: function oninit (vnode: ITreeNodeVNode): void {
    vnode.state = vnode.attrs.nodeData
  },
  /**
   * The TreeNode's view.
   *
   * @protected
   * @param {ITreeNodeVNode} vnode TreeNode virtual node
   * @returns {Object} A VDOM object for mithril.
   */
  view: function view (vnode): Object {
    const { state: nodeData, children: components } = vnode

    const treeNodeContainerOptions = (!nodeData.parent()) ? { 'class': CLASS_TREE_CONTAINER } : {}
    const treeNodeItemWrapperOptions = {
      id: nodeData.id(),
      'class': getTreeNodeWrapperClass(nodeData),
      oncreate: onNodeCreated,
      onupdate: onNodeUpdated
    }
    const treeNodeItemOptions = {
      'class': getTreeNodeClass(nodeData),
      onclick: onNodeClick(nodeData)
    }
    const treeNodeExpanderIconOptions = {
      'class': getTreeNodeExpanderIconClass(nodeData),
      onclick: onExpanderClick(nodeData)
    }
    const treeNodeIconOptions = {
      'class': getTreeNodeIconClass(nodeData)
    }
    const treeNodeTitleOptions = {
      'class': CLASS_TREENODE_TITLE
    }

    return m('ul', treeNodeContainerOptions, [
      m('li', treeNodeItemWrapperOptions, [
        m('span', treeNodeItemOptions, [
          m('span', treeNodeExpanderIconOptions),
          m('span', treeNodeIconOptions),
          m('span', treeNodeTitleOptions, nodeData.title()),
          (!nodeData.metaData || nodeData.metaData.length < 1) ? '' : nodeData.metaData.map((meta) => {
            if (meta) {
              return createMetaDataView(meta)
            }
          })
        ]),
        components
      ])
    ])
  }
}

export default TreeNode
