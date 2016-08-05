export interface IMithrilVNode {
  /**
   * @type {Object} Arguments passed to the component instance
   */
  attrs: Object,
  /**
   * @type {Object} State properties saved on the component instance
   */
  state: Object,
  /**
   * @type {Array<Object>} An Array of child components.
   */
  children: Array<Object>
}

/**
 * A treeview event handler which contains meta data in its context.
 */
export interface IEventHandler {
  /**
   * @param {Event} event The Event object containing the context in which it was triggered.
   */
  (event: Event): void,
}

/**
 * A property accessor which can store a given string and returns it on every call. If a new string is stored, that same given string will also be returned.
 */
export interface IArrayOfNodeDataPropertyAccessor { (param?: Array<INodeData>): Array<INodeData> }
/**
 * A property accessor which can store a given string and returns it on every call. If a new string is stored, that same given string will also be returned.
 */
export interface IStringPropertyAccessor { (param?: string): string }
/**
 * A property accessor which can store a given number and returns it on every call. If a new number is stored, that same given number will also be returned.
 */
export interface INumberPropertyAccessor { (param?: number): number }
/**
 * A property accessor which can store a given boolean and returns it on every call. If a new boolean is stored, that same given boolean will also be returned.
 */
export interface IBooleanPropertyAccessor { (param?: boolean): boolean }
/**
 * A property accessor which can store any given value and returns it on every call. If a new value is stored, that same given value will also be returned.
 */
export interface IAnyPropertyAccessor { (param?: any): any }

/**
 * A treeview DOM event handler which contains meta data in its context.
 */
export interface IDOMEventHandler {
  /**
   * @param {HTMLElement} element The component's DOM element.
   */
  (element: HTMLElement): void,
}

/**
 * Contains all events that can be configured by outside input.
 */
export interface ITreeNodeEventsObject {
  onExpanderClick?: IEventHandler,
  onNodeClick?: IEventHandler,
  onNodeCreate?: IDOMEventHandler,
  onNodeUpdate?: IDOMEventHandler
}
/**
 * Contains all custom event listeners for the current tree node.
 */
export interface INodeEvents {
  onExpanderClick: IEventHandler | void,
  onNodeClick: IEventHandler | void,
  onNodeCreate: IDOMEventHandler | void,
  onNodeUpdate: IDOMEventHandler | void
}

/**
 * Meta data which can be stored on a tree node.
 */
export interface INodeMetaDataOptions {
  id?: string,
  type?: string,
  value?: any,
  tooltip?: string
}
/**
 * Stores TreeNode MetaData which can be visualized in various ways, like for example a check mark or "X" representing boolean values.
 */
export interface INodeMetaData {
  id: IStringPropertyAccessor,
  type: IStringPropertyAccessor,
  value: IAnyPropertyAccessor,
  tooltip: IStringPropertyAccessor
}

/**
 * A hash containg all needed data to construct a NodeState object.
 */
export interface INodeDataOptionsStateObject {
  expanded?: boolean,
  highlighted?: boolean,
  blurred?: boolean,
  selected?: boolean
}
/**
 * Contains all needed data to create a new node data object.
 */
export interface INodeDataOptionsObject {
  root: ITreeData,
  index: number,
  parent: INodeData,
  id?: string,
  title: string,
  isLeaf?: boolean,
  errorCode: number,
  children?: Array<INodeDataOptionsObject>
  state?: INodeDataOptionsStateObject,
  events?: ITreeNodeEventsObject,
  metaData?: Array<INodeMetaDataOptions>
}

/**
 * A Node data object which represents a tree node with all its possible functions.
 */
export interface INodeData {
  parent: (newValue?: INodeData) => INodeData,
  id: IStringPropertyAccessor,
  title: IStringPropertyAccessor,
  selected: IBooleanPropertyAccessor,
  blurred: IBooleanPropertyAccessor,
  highlighted: IBooleanPropertyAccessor,
  expanded: IBooleanPropertyAccessor,
  isLeaf: IBooleanPropertyAccessor,
  errorCode: INumberPropertyAccessor,
  children: (children?: Array<INodeData>) => Array<INodeData>,
  index: INumberPropertyAccessor,
  events: INodeEvents,
  metaData: Array<INodeMetaData>,
  createChildNode?: Function,
  hasChildren?: () => boolean,
  traverseChildNodes?: (callback: (INodeData) => void) => void,
  toJson?: Function
}

export interface ITreeDataGlobalOptions {
  root: ITreeData,
  state: INodeDataOptionsStateObject,
  events: ITreeNodeEventsObject
}
export interface ITreeDataOptions extends ITreeDataGlobalOptions {
  data: Array<INodeDataOptionsObject>
}
/**
 * The global API object returned by an instantiated tree view.
 */
export interface ITreeData {
  treeData: () => Array<INodeData>
  selectedNodes: IArrayOfNodeDataPropertyAccessor,
  getRootNodes: () => Array<INodeData>
}