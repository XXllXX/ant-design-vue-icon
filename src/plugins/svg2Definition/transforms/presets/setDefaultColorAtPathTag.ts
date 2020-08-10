import { TransformFactory } from '../..'
import { assignAttrsAtTag } from '../../transforms'

export const setDefaultColorAtPathTag: (defaultColor: string) => TransformFactory = defaultColor =>
  assignAttrsAtTag('path', ({ previousAttrs }) => ({
    fill: previousAttrs.fill || defaultColor
  }))
