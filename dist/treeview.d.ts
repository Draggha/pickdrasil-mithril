declare module "interfaces/common-interfaces" {
    /**
     * A treeview event handler which contains meta data in its context.
     */
    export interface IEventHandler {
        /**
         * @param {Event} event The Event object containing the context in which it was triggered.
         */
        (event: Event): void;
    }
    /**
     * A treeview DOM event handler which contains meta data in its context.
     */
    export interface IDOMEventHandler {
        /**
         * @param {HTMLElement} element The component's DOM element.
         */
        (element: HTMLElement): void;
    }
    /**
     * A property accessor which can store a given string and returns it on every call. If a new string is stored, that same given string will also be returned.
     */
    export interface IArrayOfNodeDataPropertyAccessor {
        (param?: Array<INodeData>): Array<INodeData>;
    }
    /**
     * A property accessor which can store a given string and returns it on every call. If a new string is stored, that same given string will also be returned.
     */
    export interface IStringPropertyAccessor {
        (param?: string): string;
    }
    /**
     * A property accessor which can store a given number and returns it on every call. If a new number is stored, that same given number will also be returned.
     */
    export interface INumberPropertyAccessor {
        (param?: number): number;
    }
    /**
     * A property accessor which can store a given boolean and returns it on every call. If a new boolean is stored, that same given boolean will also be returned.
     */
    export interface IBooleanPropertyAccessor {
        (param?: boolean): boolean;
    }
    /**
     * A property accessor which can store any given value and returns it on every call. If a new value is stored, that same given value will also be returned.
     */
    export interface IAnyPropertyAccessor {
        (param?: any): any;
    }
    /**
     * Contains all events that can be configured by outside input.
     */
    export interface ITreeNodeEventsObject {
        onExpanderClick?: IEventHandler;
        onNodeClick?: IEventHandler;
        onNodeCreate?: IDOMEventHandler;
        onNodeUpdate?: IDOMEventHandler;
    }
    /**
     * Contains all custom event listeners for the current tree node.
     */
    export interface INodeEvents {
        onExpanderClick: IEventHandler | void;
        onNodeClick: IEventHandler | void;
        onNodeCreate: IDOMEventHandler | void;
        onNodeUpdate: IDOMEventHandler | void;
    }
    /**
     * Meta data which can be stored on a tree node.
     */
    export interface INodeMetaDataOptions {
        id?: string;
        type?: string;
        value?: any;
        tooltip?: string;
    }
    /**
     * Stores TreeNode MetaData which can be visualized in various ways, like for example a check mark or "X" representing boolean values.
     */
    export interface INodeMetaData {
        id: IStringPropertyAccessor;
        type: IStringPropertyAccessor;
        value: IAnyPropertyAccessor;
        tooltip: IStringPropertyAccessor;
    }
    /**
     * A hash containg all needed data to construct a NodeState object.
     */
    export interface INodeDataOptionsStateObject {
        expanded?: boolean;
        highlighted?: boolean;
        blurred?: boolean;
        selected?: boolean;
    }
    /**
     * Contains all needed data to create a new node data object.
     */
    export interface INodeDataOptionsObject {
        root: ITreeData;
        index: number;
        parent: INodeData;
        id?: string;
        title: string;
        isLeaf?: boolean;
        errorCode: number;
        children?: Array<INodeDataOptionsObject>;
        state?: INodeDataOptionsStateObject;
        events?: ITreeNodeEventsObject;
        metaData?: Array<INodeMetaDataOptions>;
    }
    /**
     * A Node data object which represents a tree node with all its possible functions.
     */
    export interface INodeData {
        parent: (newValue?: INodeData) => INodeData;
        id: IStringPropertyAccessor;
        title: IStringPropertyAccessor;
        selected: IBooleanPropertyAccessor;
        blurred: IBooleanPropertyAccessor;
        highlighted: IBooleanPropertyAccessor;
        expanded: IBooleanPropertyAccessor;
        isLeaf: IBooleanPropertyAccessor;
        errorCode: INumberPropertyAccessor;
        children: (children?: Array<INodeData>) => Array<INodeData>;
        index: INumberPropertyAccessor;
        events: INodeEvents;
        metaData: Array<INodeMetaData>;
        createChildNode?: Function;
        hasChildren?: () => boolean;
        traverseChildNodes?: (callback: (INodeData) => void) => void;
        toJson?: Function;
    }
    export interface ITreeDataGlobalOptions {
        root: ITreeData;
        state: INodeDataOptionsStateObject;
        events: ITreeNodeEventsObject;
    }
    export interface ITreeDataOptions extends ITreeDataGlobalOptions {
        data: Array<INodeDataOptionsObject>;
    }
    /**
     * The global API object returned by a instantiated tree view.
     */
    export interface ITreeData {
        treeData: () => Array<INodeData>;
        selectedNodes: IArrayOfNodeDataPropertyAccessor;
        getRootNodes: () => Array<INodeData>;
    }
}
declare module "constants/cssclasses" {
    /**
     * @module CSSClasses
     */
    /**
     * @private
     */
    export const CLASS_TREE_CONTAINER: string;
    /** @private */
    export const CLASS_TREE_HEADER: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_TITLE: string;
    /**
     * @private
     */
    export const CLASS_METADATA: string;
    /**
     * @private
     */
    export const CLASS_METADATA_ICON: string;
    /**
     * @private
     */
    export const CLASS_METADATA_ICON_STATUS_ON: string;
    /**
     * @private
     */
    export const CLASS_METADATA_ICON_STATUS_OFF: string;
    /**
     * @private
     */
    export const CLASS_TREENODE: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_IS_FOLDER: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_IS_FILE: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_FILTERED: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_HIDDEN: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_SELECTED: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_EXPANDED: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_COLLAPSED: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_NOT_EXPANDABLE: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_HIGHLIGHTED: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_BLURRED: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_ICON: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_ICON_FILE: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_ICON_FOLDER: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_ICON_FOLDER_OPEN: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_ICON_NODE_COLLAPSED: string;
    /**
     * @private
     */
    export const CLASS_TREENODE_ICON_NODE_EXPANDED: string;
}
declare module "constants/dictionary" {
    /**
     * @module Dictionary
     */
    /**
     * A hash containing all error codes that the tree view can understand.
     *
     * @memberOf module:Dictionary
     */
    export const ErrorCodes: {
        NONE: number;
        UNAUTHORIZED: number;
        NOT_FOUND: number;
        RETRY_WITH: number;
        SERVER_ERROR: number;
    };
    /**
     * A hash containing all event names.
     *
     * @memberOf module:Dictionary
     * @type {{node: {on: {create: string, update: string, click: string}, expander: {on: {click: string}}}}}
     */
    export const Events: {
        node: {
            on: {
                create: string;
                update: string;
                click: string;
            };
            expander: {
                on: {
                    click: string;
                };
            };
        };
    };
    /**
     * A hash containg all MetaData Types.
     *
     * @memberOf module:Dictionary
     * @type {{STATUS: string}}
     */
    export const MetaDataTypes: {
        STATUS: string;
    };
    export const PubSubTopics: {
        TREE_STRUCTURE_CHANGED: string;
    };
}
declare module "helper/cssclass" {
    /**
     * @module CSSHelper
     */
    import { INodeData } from "interfaces/common-interfaces";
    /**
     * Express the state of a node wrapper via CSS classes.
     *
     * @public
     * @param {INodeData} nodeData A NodeData object containing state and data.
     * @returns {string} The needed CSS class(es) to express the tree node wrapper's state.
     */
    export function getTreeNodeWrapperClass(nodeData: INodeData): string;
    /**
     * Express the state of a node via CSS classes.
     *
     * @public
     * @param {INodeData} nodeData A NodeData object containing state and data.
     * @returns {string} The needed CSS class(es) to express the tree node's state.
     */
    export function getTreeNodeClass(nodeData: INodeData): string;
    /**
     * Checks if the given DOM element contains the given CSS class.
     *
     * @public
     * @param {HTMLBaseElement} element A DOM element.
     * @param {string} cls A CSS class.
     * @returns {boolean} Indicates whether the given element has the given CSS class or not.
     */
    export function hasClass(element: HTMLBaseElement, cls: string): boolean;
    /**
     * Creates the tree node icon CSS class depicting the current kind of node (folder, opened folder or file).
     *
     * @private
     * @param {INodeData} nodeData
     * @returns {string}
     */
    export function getTreeNodeIconClass(nodeData: INodeData): string;
    /**
     * Creates the tree node expander's CSS class depicting the current state (expanded or collapsed).
     *
     * @private
     * @param {INodeData} nodeData
     * @returns {string}
     */
    export function getTreeNodeExpanderIconClass(nodeData: INodeData): string;
}
declare module "treenode" {
    /**
     * @module TreeNode
     */
    import { INodeData } from "interfaces/common-interfaces";
    /**
     * Toggles the TreeNode's "selected" state.
     * The context will be modified to contain a TreeNode controller (this => instanceof(TreeNode.controller)).
     *
     * @protected
     * @this {INodeData}
     * @param {Event} event An event object created by clicking on the node.
     */
    export function onNodeClick(nodeData: INodeData): (event: Event) => void;
    /**
     * Toggles the TreeNode's "expanded" state.
     * The context will be modified to contain a TreeNode controller (this => instanceof(TreeNode.controller)).
     * It will trigger a user defined expanderClicked callback from the NodeData's events property if one was defined.
     *
     * @protected
     * @this {INodeData}
     * @param {Event} event An event object created by clicking directly on the expander icon.
     */
    export function onExpanderClick(nodeData: INodeData): (event: Event) => void;
    /**
     * Triggers after the component was either inserted into the DOM or updated in the DOM.
     * The context will be modified to contain a TreeNode controller (this => instanceof(TreeNode.controller)).
     *
     * @protected
     * @this {INodeData}
     * @param {HTMLBaseElement} element The component's DOM element.
     * @param {boolean} isInitialized Indicates if the DOM element was created (true) or updated (false).
     */
    export function onNodeCreatedOrUpdated(nodeData: INodeData): (element: HTMLBaseElement, isInitialized: boolean) => void;
    /**
     * @type {IMithrilComponent}
     */
    let TreeNode: any;
    export default TreeNode;
}
declare module "helper/search" {
    /**
     * @module SearchHelper
     */
    import { INodeData } from "interfaces/common-interfaces";
    /**
     * Searches through all TreeNodes recursively to find one TreeNode by id.
     *
     * @private
     * @param {string} id A TreeNode's unique identifier.
     * @param {(nodeData: INodeData) => void} callback A callback which will be called every time a child, that matches the search parameters, was found.
     */
    export function findNodeById(nodeList: Array<INodeData>, id: string, callback: (nodeData: INodeData) => void): void;
    /**
     * Searches through all TreeNodes recursively to find a list of TreeNodes by id.
     *
     * @private
     * @param {Array<string>} idList A list of unique identifiers for TreeNodes.
     * @param {(nodeData: INodeData) => void} callback A callback which will be called every time a child, that matches the search parameters, was found.
     */
    export function findNodeByListOfIds(nodeList: Array<INodeData>, idList: Array<string>, callback: (nodeData: INodeData) => void): void;
    /**
     * Searches through all TreeNodes recursively to find TreeNodes that have a title similar to the given title.
     *
     * @private
     * @param {string} title A search string.
     * @param {(nodeData: INodeData) => void} callback A callback which will be called every time a child, that matches the search parameters, was found.
     */
    export function findNodeByTitle(nodeList: Array<INodeData>, title: string, callback: (nodeData: INodeData) => void): void;
}
declare module "models/nodedata" {
    /**
     * @module NodeData
     */
    import { INodeDataOptionsObject, INodeData } from "interfaces/common-interfaces";
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
    export function createNodeData(dataset: INodeDataOptionsObject): INodeData;
}
declare module "helper/nodes" {
    /**
     * @module NodeHelper
     */
    import { INodeData, ITreeDataOptions } from "interfaces/common-interfaces";
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
    export function convertToTreeData(dataset: ITreeDataOptions): () => Array<INodeData>;
}
declare module "models/treedata" {
    /**
     * @module TreeData
     */
    import { ITreeDataOptions } from "interfaces/common-interfaces";
    /**
     * The root data object for the tree.
     *
     * @public
     * @constructor
     * @param {ITreeDataOptions} options
     */
    export default function TreeData(options: ITreeDataOptions): void;
}
declare module "treeview" {
    /**
     * Generates and returns a ready to use tree view component for mithril.js.
     */
    let TreeView: any;
    export default TreeView;
}
