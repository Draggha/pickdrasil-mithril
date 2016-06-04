'use strict'
/**
 * @module TreeNode
 */
// interfaces
import {
  INodeData,
  INodeMetaData,
  IEventHandler,
  IDOMEventHandler
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

    m.startComputation()
    if (nodeClicked) {
      // Bind the nodeClicked event's context to the current NodeData object
      // and fire it with the current click event data.
      (<IEventHandler>nodeClicked).call(nodeData, event)
    }
    m.endComputation()
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
      let expanderClicked = nodeData.events.onExpanderClick

      m.startComputation()
      if (nodeData.hasChildren()) {
        nodeData.expanded(!nodeData.expanded())
      }

      if (expanderClicked) {
        // Bind the expanderClicked event's context to the current NodeData object
        // and fire it with the current click event data.
        (<IEventHandler>expanderClicked).call(nodeData, event)
        radio(PubSubTopics.TREE_STRUCTURE_CHANGED).broadcast()
      }
      m.endComputation()
    }
  }
}

/**
 * Triggers after the component was either inserted into the DOM or updated in the DOM.
 * The context will be modified to contain a TreeNode controller (this => instanceof(TreeNode.controller)).
 *
 * @protected
 * @this {INodeData}
 * @param {HTMLBaseElement} element The component's DOM element.
 * @param {boolean} isInitialized Indicates if the DOM element was created (true) or updated (false).
 */
export function onNodeCreatedOrUpdated(nodeData: INodeData) {
  return (element: HTMLBaseElement, isInitialized: boolean /*, context*/): void => {
    if (isInitialized) {
      let nodeCreated = nodeData.events.onNodeCreate
      // Bind the event's context to the current NodeData object
      // and pass the DOM element into it.
      if (nodeCreated) {
        (<IDOMEventHandler>nodeCreated).call(nodeData, element)
      }
    } else {
      let nodeUpdated = nodeData.events.onNodeUpdate
      // Bind the event's context to the current NodeData object
      // and pass the DOM element into it.
      if (nodeUpdated) {
        (<IDOMEventHandler>nodeUpdated).call(nodeData, element)
      }
    }
  }
}

/**
 * @type {IMithrilComponent}
 */
let TreeNode: any = {}

interface ITreeNodeOptions { nodeData: INodeData }
interface ITreeNodeController { nodeData: INodeData }
/**
 * A TreeNode's controller.
 *
 * @protected
 * @memberOf module:TreeNode
 * @constructor
 * @param {{nodeData:INodeData}} args An object containing TreeNode data.
 */
TreeNode.controller = function (args: ITreeNodeOptions): ITreeNodeController {
  return {
    nodeData: args.nodeData
  }
}

/**
 * The TreeNode's view.
 *
 * @protected
 * @param {ITreeNodeController} ctrl An instance of the TreeNode's controller.
 * @param {ITreeNodeOptions} args An object containing tree data.
 * @param {string|Object|Array} components An Array of TreeNode components.
 * @returns {Object} A VDOM object for mithril.
 */
TreeNode.view = (ctrl: ITreeNodeController, args: ITreeNodeOptions, components: any): Object => {
  let nodeData: INodeData = ctrl.nodeData

  return m('ul', (!nodeData.parent()) ? {
    'class': CLASS_TREE_CONTAINER
  } : {}, m('li', {
    id: nodeData.id(),
    'class': getTreeNodeWrapperClass(nodeData),
    config: onNodeCreatedOrUpdated(nodeData)
  }, [
      m('span', {
        'class': getTreeNodeClass(nodeData),
        onclick: onNodeClick(nodeData)
      }, [
          m('span', {
            'class': getTreeNodeExpanderIconClass(nodeData),
            onclick: onExpanderClick(nodeData)
          }),
          m('span', {
            'class': getTreeNodeIconClass(nodeData)
          }),
          m('span', {
            'class': CLASS_TREENODE_TITLE
          }, nodeData.title()),
          (!nodeData.metaData || nodeData.metaData.length < 1) ? '' : nodeData.metaData.map((meta) => {
            if (meta) {
              return TreeNode.view.createMetaDataView(meta)
            }
          })
        ]),
      components
    ]))
}

/**
 * Creates a MetaData view.
 *
 * @param {INodeMetaData} meta A MetaData object.
 * @returns {Object} A VDOM snippet for mithril.
 */
TreeNode.view.createMetaDataView = (meta: INodeMetaData): Object => {
  let view

  if (meta.type() === MetaDataTypes.STATUS) {
    let viewOpts: { class: string, title?: string } = {
      'class': CLASS_METADATA
    }
    if (meta.tooltip() && meta.tooltip() !== '') {
      viewOpts.title = meta.tooltip()
    }
    view = m('span', viewOpts, [
      m('em', {
        'class': CLASS_METADATA_ICON + ' ' + ((!meta.value()) ? CLASS_METADATA_ICON_STATUS_OFF : CLASS_METADATA_ICON_STATUS_ON)
      })
    ])
  } else {
    view = m("span", {
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

  return view
}

export default TreeNode
