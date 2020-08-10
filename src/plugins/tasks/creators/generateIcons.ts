import SVGO from 'svgo'
import { SVG2DefinitionOptions } from '../../svg2Definition'
import { UseTemplatePluginOptions } from '../../useTemplate'
import { useTemplate, svg2Definition, svgo } from '../..'
import rename from 'gulp-rename'
import { src, dest } from 'gulp'
export interface GenerateIconsOptions
  extends SVG2DefinitionOptions,
    UseTemplatePluginOptions {
  from: string[]
  toDir: string
  svgoConfig: SVGO.Options
  filename: (option: { name: string }) => string
}
export const generateIcons = ({
  from,
  toDir,
  svgoConfig,
  theme,
  extraNodeTransformFactories,
  stringify,
  template,
  mapToInterpolate,
  filename,
}: GenerateIconsOptions) =>
  function GenerateIcons() {
    return src(from)
      .pipe(svgo(svgoConfig))
      .pipe(
        svg2Definition({
          theme,
          extraNodeTransformFactories,
          stringify,
        })
      )
      .pipe(useTemplate({ template, mapToInterpolate }))
      .pipe(
        rename((file) => {
          file.dirname = ''
          if (file.basename) {
            file.basename = filename({ name: file.basename })
            file.extname = '.js'
          }
        })
      )
      .pipe(dest(toDir))
  }
