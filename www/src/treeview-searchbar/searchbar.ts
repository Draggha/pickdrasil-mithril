// external dependencies
import m from 'mithril'
import radio from 'radio' // PubSub library
// local
import { PubSubTopics } from '../treeview/constants/dictionary'

/**
 * @private
 * @memberOf module:SearchBar
 */
const CLASS_TREEVIEW_SEARCH_LABEL = 'js--treeview__search-label'

let willChange // undefined

/**
 * Traverses the whole tree and updates its nodes whith styles which show if it matches the filter value (searchTerm) or not.
 *
 * @memberOf module:SearchBar
 * @this {{searchTerm:string,treeViewInstance:TreeView.controller}}
 */
let updateAllNodes = function () {
  let treeViewInstance = this.treeViewInstance
  let searchTerm = this.searchTerm
  let markSearchResult = (childNode) => {
    if (searchTerm && searchTerm !== '') {
      let searchTermFound = (childNode.title().toLowerCase().indexOf(searchTerm) > -1)
      childNode.highlighted(searchTermFound)
      childNode.blurred(!searchTermFound)
    } else {
      childNode.highlighted(false)
      childNode.blurred(false)
    }
  }
  treeViewInstance.getRootNodes().map((rootNode) => {
    if (rootNode.isLeaf()) {
      markSearchResult(rootNode)
    } else {
      rootNode.traverseChildNodes(markSearchResult)
    }
  })
  m.endComputation()
}

/**
 * Searches tree for occurences of the given search term.
 * The search will be re-triggered on subscription broadcasts. Look out for radio(___channelName___).subscribe(___callback___) calls in the source code below.
 *
 * @memberOf module:SearchBar
 * @instance
 * @param {TreeView.controller} treeViewInstance A reference to the TreeView's list of child node controllers.
 * @param {string} value The search term.
 */
let search = (treeViewInstance, value) => {
  m.startComputation()

  let searchTerm = value.toLowerCase()

  if (willChange) {
    radio(PubSubTopics.TREE_STRUCTURE_CHANGED).unsubscribe(updateAllNodes)
    clearTimeout(willChange)
    m.endComputation()
  }
  let context = { treeViewInstance: treeViewInstance, searchTerm: searchTerm }
  willChange = setTimeout(updateAllNodes.bind(context), 300)
  // retrigger the search every time the tree structure changes (this happens when nodes are created/deleted)
  radio(PubSubTopics.TREE_STRUCTURE_CHANGED).subscribe([updateAllNodes, context])
}

/**
 * The SearchBar's controller.
 *
 * @protected
 * @memberOf module:SearchBar
 * @constructor
 * @alias SearchBar.controller
 * @param {TreeView.controller} treeViewInstance A reference to the TreeView's list of child node controllers.
 */
let SearchBarCtrl = function (treeViewInstance) {
  /**
   * A getter/setter for the search term.
   *
   * @instance
   */
  this.searchTerm = (() => {
    let _searchTerm = ''
    /**
     * A getter/setter for the search term.
     *
     * @param {string} [value] The new search term.
     */
    return (value) => {
      if (value !== void 0) {
        _searchTerm = value
        search(treeViewInstance, value)
      }
      if (value === '') {
        // don't trigger searches if the search input field is empty
        radio(PubSubTopics.TREE_STRUCTURE_CHANGED).unsubscribe(updateAllNodes)
      }

      return _searchTerm
    }
  })()
}

/**
 * The SearchBar's view.
 *
 * @protected
 * @memberOf module:SearchBar
 * @alias SearchBar.view
 * @param {SearchBarCtrl|SearchBar.controller} ctrl An instance of a SearchBar controller.
 * @return {Object} A representation of a DOMElement as a POJO.
 */
let SearchBarView = function (ctrl) {
  return m('Label', {
    'class': CLASS_TREEVIEW_SEARCH_LABEL
  }, [
      'Filter: ',
      m('input', {
        type: 'text',
        name: 'treeview-search',
        oninput: m.withAttr('value', ctrl.searchTerm),
        value: ctrl.searchTerm()
      })
    ])
}

/**
 * @module SearchBar
 * @type {IMithrilComponent}
 */
let SearchBar = {
  controller: SearchBarCtrl,
  view: SearchBarView
}

export default SearchBar
