/**
 * @module Dictionary
 */

/**
 * A hash containing all error codes that the tree view can understand.
 *
 * @memberOf module:Dictionary
 */
export const ErrorCodes = {
  NONE: 0,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  RETRY_WITH: 449,
  SERVER_ERROR: 500
}

/**
 * A hash containing all event names.
 *
 * @memberOf module:Dictionary
 * @type {{node: {on: {create: string, update: string, click: string}, expander: {on: {click: string}}}}}
 */
export const Events = {
  node: {
    on: {
      create: 'onNodeCreate',
      update: 'onNodeUpdate',
      click: 'onNodeClick'
    },
    expander: {
      on: {
        click: 'onExpanderClick'
      }
    }
  }
}

/**
 * A hash containg all MetaData Types.
 *
 * @memberOf module:Dictionary
 * @type {{STATUS: string}}
 */
export const MetaDataTypes = {
  STATUS: 'status'
}

export const PubSubTopics = {
  TREE_STRUCTURE_CHANGED: 'treeStructureChanged'
}
