import { assignAttrsAtTag } from '../../transforms'
import { TransformFactory } from '../..'
import { includes } from 'ramda'

// version < antd@3.9
const OLD_ICON_NAMES = [
  'step-backward',
  'step-forward',
  'fast-backward',
  'fast-forward',
  'forward',
  'backward',
  'caret-up',
  'caret-down',
  'caret-left',
  'caret-right',
  'retweet',
  'swap-left',
  'swap-right',
  'loading',
  'loading-3-quarters',
  'coffee',
  'bars',
  'file-jpg',
  'inbox',
  'shopping-cart',
  'safety',
  'medium-workmark'
]

export const adjustViewBox: TransformFactory = assignAttrsAtTag('svg', ({ previousAttrs }) => ({
  viewBox: previousAttrs.viewBox
}))
