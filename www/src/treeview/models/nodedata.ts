'use strict'
/**
 * @module NodeData
 */
// interfaces
import {
  ITreeNodeEventsObject,
  INodeEvents,
  INodeMetaDataOptions,
  INodeMetaData,
  INodeDataOptionsObject,
  INodeData
} from '../interfaces/common-interfaces'
// external libs
import m from 'mithril'
import radio from 'radio' // PubSub library
// local
import { ErrorCodes, MetaDataTypes, PubSubTopics } from '../constants/dictionary'

/**
 * Stores all event handlers for events triggered by the corresonding tree node.
 *
 * @example
 * var nodeEvents = new NodeEvents({
 *    onExpanderClick: function (expanderClickEvent) {},
 *    onNodeClick: function (nodeClickEvent) {},
 *    onNodeCreate: function (domElement) {},
 *    onNodeUpdate: function (domElement) {}
 * })
 *
 *
 * @private
 * @param {ITreeNodeEventsObject} [event={}]
 * @returns {INodeEvents}
 */
function createNodeEvents(event: ITreeNodeEventsObject = {}): INodeEvents {
  return {
    /**
     * Triggers when the expander is being clicked.
     *
     * @this class:NodeData
     */
    onExpanderClick: event.onExpanderClick,
    /**
     * Triggers when the node (everything besides the expander) is being clicked.
     *
     * @this class:NodeData
     */
    onNodeClick: event.onNodeClick,
    /**
     * Triggers when the node was inserted into the DOM.
     *
     * @this class:NodeData
     */
    onNodeCreate: event.onNodeCreate,
    /**
     * Triggers when the node was updated in the DOM.
     *
     * @this class:NodeData
     */
    onNodeUpdate: event.onNodeUpdate
  }
}

/**
 * Stores TreeNode MetaData which can be visualized in various ways, like for example a check mark and an 'X' representing boolean values.
 *
 * @private
 * @param {IMetaData} [metaData={}]
 * @returns {INodeMetaData}
 */
function createNodeMetaData(metaData: INodeMetaDataOptions = {}): INodeMetaData {
  return {
    id: m.prop(metaData.id || ''),
    type: m.prop(metaData.type || MetaDataTypes.STATUS),
    value: m.prop(metaData.value),
    tooltip: m.prop(metaData.tooltip || '')
  }
}

// the counter is being used internally
let idCounter = 1
/**
 * Creates a new id based on the given data and a counter that is being incremented.
 *
 * @example
 * var newId = createId("test"); // makes "test1", "test2", etc.
 *
 *
 * @private
 * @param {string} [identifier] If provided the identifier will be used to generate an id.
 * @returns {string} The newly created id
 */
let createId = (identifier) => {
  return (!identifier) ? 'pickdrasil_treenode_' + (idCounter++).toString() : identifier.toString().toLowerCase().replace(/(\s)/g, '') + (idCounter++).toString()
}

/**
 * The tree node's data exported as JSON.
 */
interface INodeDataAsJson {
  title: string,
  id: string,
  isLeaf: boolean,
  children?: Array<INodeDataAsJson>,
  expanded: boolean,
  highlighted: boolean,
  blurred: boolean,
  selected: boolean,
  events: Object,
  metaData: Array<INodeMetaDataOptions>,
  errorCode: number
}

/**
 * Constructs a NodeData object containg all given data and state as well as helper functions to interact with nodes.
 *
 * @example
 * var nodeData = new NodeData({
 *    parent: NodeData || undefined,
 *    index: number,
 *    state: Object,
 *    events: Object,
 *    id: string,
 *    title: string,
 *    isLeaf: boolean,
 *    children: Array<NodeData>
 * })
 *
 *
 * @public
 * @constructor
 * @param {INodeDataOptionsObject} dataset A hash containg all needed data to construct a NodeData object.
 * @returns {NodeData} A NodeData object.
 */
export function createNodeData(dataset: INodeDataOptionsObject): INodeData {
  if (!dataset) {
    throw new Error('[Initialization Error] Dataset is empty! Given dataset: ' + (dataset.toString() || 'undefined'))
  }

  /**
   * @private
   * @type {TreeData}
   */
  let root = dataset.root
  dataset.state = dataset.state || {} // ensure that state is defined
  /**
   * @private
   * @type {string}
   */
  let newId = (!dataset.id) ? createId(dataset.title) : dataset.id

  let nodeData: INodeData = {
    /**
     * Getter/setter for the parent node object or undefined if it is a root node.
     *
     * @function
     * @param {NodeData} [parent] Parent node.
     * @returns {NodeData} Parent node.
     */
    parent: m.prop(dataset.parent),
    /**
     * Getter/setter for the node's unique identifier.
     *
     * @function
     * @param {string} id The node's unique identifier.
     * @returns {string} The node's unique identifier.
     */
    id: m.prop(newId),
    /**
     * Getter/setter for the node's title.
     *
     * @function
     * @param {string} [title] The node's title.
     * @returns {string} The node's title.
     */
    title: ((initialValue) => {
      let cachedTitle = initialValue
      return (title) => {
        if (title) {
          m.startComputation()
          cachedTitle = title
          radio(PubSubTopics.TREE_STRUCTURE_CHANGED).broadcast()
          m.endComputation()
        }
        return cachedTitle
      }
    })(dataset.title || 'New Node'),
    /**
     * Getter/setter to indicate if this node cannont have child nodes.
     *
     * @function
     * @param {boolean} [isLeaf=false] Indicates if this node cannont have child nodes.
     * @returns {boolean} Indicates if this node cannont have child nodes.
     */
    isLeaf: m.prop(dataset.isLeaf || false),
    /**
     * Getter/setter for an array of the node's child nodes.
     *
     * @function
     * @param {Array<NodeData>} [children=[]] The node's child nodes
     * @returns {Array<NodeData>} The node's child nodes
     */
    children: m.prop(dataset.children || []),
    /**
     * Getter/setter for the node's index inside of its parent's array of child nodes ("children").
     *
     * @function
     * @param {number} [index=0] Index inside of parent node's children array.
     * @returns {number} Index inside of parent node's children array.
     */
    index: m.prop(dataset.index || 0),
    /**
     * Getter/setter for the node's expanded state.
     * This adds a CSS class to permanantly change the way the node (the whole row) looks. Collapsing a node will restore the old looks.
     *
     * @function
     * @param {boolean} [expanded=false] Indicates wether the node is in expanded state.
     * @returns {boolean} Indicates wether the node is in expanded state.
     */
    expanded: m.prop(dataset.state.expanded || false),
    /**
     * Getter/setter for the node's highlighted state.
     * This adds a CSS class to make the node very easy to spot.
     *
     * @function
     * @param {boolean} [highlighted=false] Indicates wether the node is in highlighted state.
     * @returns {boolean} Indicates wether the node is in highlighted state.
     */
    highlighted: m.prop(dataset.state.highlighted || false),
    /**
     * Getter/setter for the node's blurred state.
     * This adds a CSS class to make the node a bit more difficult to see.
     *
     * @function
     * @param {boolean} [blurred=false] Indicates wether the node is in blurred state.
     * @returns {boolean} Indicates wether the node is in blurred state.
     */
    blurred: m.prop(dataset.state.blurred || false),
    /**
     * Getter/setter for the node's selected state.
     * This adds a CSS class to permanantly change the way the node (the whole row) looks. Unselecting a node will restore the old looks.
     *
     * @function
     * @param {boolean} [selected=false] Indicates wether the node is in selected state.
     * @returns {boolean} Indicates wether the node is in selected state.
     */
    selected: (function (initialValue) {
      let cachedSelected = initialValue
      return function selectedAccessor(selected) {
        if (selected !== void 0) {
          cachedSelected = selected
          m.startComputation()
          if (selected) {
            // deselect all previously selected nodes
            root.selectedNodes().map((node) => {
              node.selected(false)
            })
            // override all previously cached selected nodes with the currently selected one
            root.selectedNodes([this])
          } else {
            root.selectedNodes(root.selectedNodes().filter((node) => {
              return node.id() !== this.id()
            }))
          }
          m.endComputation()
        }
        return cachedSelected
      }
    })(dataset.state.selected || false),
    /**
     * Getter/setter for NodeEvents.
     * @see NodeEvents.
     *
     * @type {NodeEvents}
     */
    events: createNodeEvents(dataset.events),
    /**
     * An Array of MetaData information.
     * @see NodeMetaData
     *
     * @type {Array<NodeMetaData>}
     */
    metaData: (dataset.metaData || []).map((meta) => {
      if ((meta.type !== void 0) && (meta.value !== void 0)) {
        return createNodeMetaData(meta)
      }
    }).filter((meta) => {
      return meta !== void 0
    }),
    /**
     * Getter/setter for the node's error codes. Error codes will be imported through the constructor
     * and through the createChild function if an errorCode property is set in the data object.
     *
     * @function
     * @param {number} [number=0] The node's child nodes
     * @returns {number} The node's child nodes
     */
    errorCode: ((err) => {
      var _errorCode = err
      return (errorCode) => {
        if (errorCode) {
          m.startComputation()
          _errorCode = errorCode
          m.endComputation()
        }
        return _errorCode || ErrorCodes.NONE
      }
    })(dataset.errorCode)
  }

  // These methods shouldn't be given to leaf nodes, since they cannot have child nodes.
  if (!nodeData.isLeaf()) {
    /**
     * Creates a new child node with the given data and inserts it into the tree.
     *
     * @function
     * @param {Object} childData A POJO containing all needed properties to create a new child node, such as id [string], title [string] and isLeaf (optional)[boolean].
     * @returns {Promise<NodeData>} A promise which returns the newly created child node.
     */
    nodeData.createChildNode = (childData) => {
      return new Promise((resolve, reject) => {
        if (!childData) {
          reject('[createChild] Tree node creation failed: No data given! Please check your options.childData object.')
        } else if (!childData.id) {
          reject('[createChild] Tree node creation failed: No id given! Please ensure options.childData.id is filled with a "valid" id string.' +
            ' "Valid" id strings are based on HTML element ids.')
        } else if (!childData.title) {
          reject('[createChild] Tree node creation failed: No title given! Please ensure options.childData.title is filled with a string.')
        } else {
          childData.root = root
          childData.parent = nodeData
          childData.events = nodeData.events
          if (nodeData.errorCode() === ErrorCodes.NOT_FOUND) {
            nodeData.errorCode(ErrorCodes.NONE)
          }
          let newTreeNode = createNodeData(childData)
          let newChildList = nodeData.children()
          newChildList.push(newTreeNode)
          nodeData.children(newChildList)
          m.startComputation()
          resolve(newTreeNode)
          m.endComputation()
        }
      })
    }

    /**
     * Looks up wether the TreeNode has child nodes or not.
     *
     * @function
     * @returns {boolean} Whether the TreeNode has child nodes, or not.
     */
    nodeData.hasChildren = () => {
      return nodeData.children().length > 0
    }

    /**
     * @callback traverseChildNodes
     * @param {NodeData} treeNode A NodeData object representing the found tree node.
     */
    /**
     * Walks through all child nodes and their children (recursively) and executes the callback on each of them.
     *
     * @instance
     * @function
     * @this NodeData
     * @param {traverseChildNodes} callback A callback which will be called every time a child, that matches the search parameters, was found.
     */
    nodeData.traverseChildNodes = (callback) => {
      if (callback) {
        callback(nodeData)
        if (nodeData.hasChildren()) {
          // move the tree "downward" (through all child nodes)
          nodeData.children().map(function (childNode) {
            if (!childNode.isLeaf()) {
              childNode.traverseChildNodes(callback)
            } else {
              callback(childNode)
            }
          })
        }
      }
    }
  }

  /**
   * Convert this instance into a POJO (Plain Old JavaScript Object).
   *
   * @function
   * @param {boolean} [recursively] Whether to wade through all child nodes recursively, or not.
   * @returns {{title: string, id: string, isLeaf: boolean, children: Array<NodeData>, expanded: boolean, highlighted: boolean, blurred: boolean, selected: boolean, events: Object, metaData: Array, errorCode: number}}
   */
  nodeData.toJson = (recursively: boolean): INodeDataAsJson => {
    let json: INodeDataAsJson = {
      title: nodeData.title(),
      id: nodeData.id(),
      isLeaf: nodeData.isLeaf(),
      expanded: nodeData.expanded(),
      highlighted: nodeData.highlighted(),
      blurred: nodeData.blurred(),
      selected: nodeData.selected(),
      events: nodeData.events,
      metaData: nodeData.metaData.map((meta) => {
        return {
          id: meta.id(),
          value: meta.value(),
          type: meta.type(),
          tooltip: meta.tooltip()
        }
      }),
      errorCode: nodeData.errorCode()
    }
    if (recursively) {
      json.children = (nodeData.children().length > 0) ? nodeData.children().map((childNode) => {
        return childNode.toJson(recursively)
      }) : []
    }
    return json
  }

  return nodeData
}
