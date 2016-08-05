'use strict'
/**
 * @module MetaDataStatusIndicator
 */
// interfaces
import {
  IMithrilVNode,
  INodeMetaData
 } from '../interfaces/common-interfaces'
// external libs
import m from 'mithril'
// local
import {
  CLASS_METADATA,
  CLASS_METADATA_ICON,
  CLASS_METADATA_ICON_STATUS_OFF,
  CLASS_METADATA_ICON_STATUS_ON
} from '../constants/cssclasses'

interface IMetaDataStatusIndicatorVNode extends IMithrilVNode {
  attrs: {
    meta: INodeMetaData
  }
}

/**
 * Creates status icons with title tags as tooltips.
 *
 * @param {INodeMetaData} meta A MetaData object.
 * @returns {Object} A VDOM snippet for mithril.
 */
const MetaDataStatusIndicator = {
  view: function view (vnode: IMetaDataStatusIndicatorVNode) {
    const { attrs: { meta } } = vnode
    const statusViewOptions: { class: string, title?: string } = {
      'class': CLASS_METADATA,
      title: (meta.tooltip()) ? meta.tooltip() : ''
    }
    return m('span', statusViewOptions, [
      m('em', {
        'class': CLASS_METADATA_ICON + ' ' + ((!meta.value()) ? CLASS_METADATA_ICON_STATUS_OFF : CLASS_METADATA_ICON_STATUS_ON)
      })
    ])
  }
}

export default MetaDataStatusIndicator
