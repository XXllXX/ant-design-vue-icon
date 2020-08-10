import {
  clean,
  copy,
  generateIcons,
  generateEntry,
  generateInline,
} from './plugins/tasks/creators'
import { generalConfig, remainFillConfig } from './plugins/svgo/presets'
import {
  assignAttrsAtTag,
  adjustViewBox,
  setDefaultColorAtPathTag,
} from './plugins/svg2Definition/transforms'
import { readFileSync } from 'fs'
import { resolve, join } from 'path'
import { getIdentifier, getContent } from './plugins/utils'
import { series, parallel } from 'gulp'
import { twotoneStringify } from './plugins/svg2Definition/stringify'
import yargs from 'yargs'

const jsIconTemplate = 'export const  <%= identifier %> = <%= content %>'

const generat = function (formPath, toPath) {
  series(
    clean([toPath]),
    // 所有的 svg 都为默认的 outline theme
    parallel(
      generateIcons({
        theme: 'outline',
        from: [join(formPath, '/**/*.svg')],
        toDir: toPath,
        svgoConfig: generalConfig,
        extraNodeTransformFactories: [
          assignAttrsAtTag('svg', { focusable: 'false' }),
          adjustViewBox,
        ],
        stringify: JSON.stringify,
        template: jsIconTemplate,
        mapToInterpolate: ({ name, content }) => ({
          identifier: getIdentifier({ name }),
          content: getContent(content),
        }),
        filename: ({ name }) => getIdentifier({ name }),
      })
      // generateIcons({
      //   theme: 'fill',
      //   from: [join(formPath, 'filled/*.svg')],
      //   toDir: toPath,
      //   svgoConfig: generalConfig,
      //   extraNodeTransformFactories: [assignAttrsAtTag('svg', { focusable: 'false' }), adjustViewBox],
      //   stringify: JSON.stringify,
      //   template: jsIconTemplate,
      //   mapToInterpolate: ({ name, content }) => ({
      //     identifier: getIdentifier({ name, themeSuffix: 'Filled' }),
      //     content: getContent(content)
      //   }),
      //   filename: ({ name }) => getIdentifier({ name, themeSuffix: 'Filled' })
      // }),
      // generateIcons({
      //   theme: 'twotone',
      //   from: [join(formPath, 'twotone/*.svg')],
      //   toDir: toPath,
      //   svgoConfig: remainFillConfig,
      //   extraNodeTransformFactories: [assignAttrsAtTag('svg', { focusable: 'false' }), adjustViewBox, setDefaultColorAtPathTag('#333')],
      //   stringify: twotoneStringify,
      //   template: jsIconTemplate,
      //   mapToInterpolate: ({ name, content }) => ({
      //     identifier: getIdentifier({ name, themeSuffix: 'TwoTone' }),
      //     content: getContent(content)
      //   }),
      //   filename: ({ name }) => getIdentifier({ name, themeSuffix: 'TwoTone' })
      // })
    ),
    parallel(
      generateEntry({
        entryName: 'index.js',
        from: [join(toPath, '*.js')],
        toDir: toPath,
        banner: '//  icons \n',
        template: `//  <%= identifier %>   \nexport * from '<%= path %>';`,
        mapToInterpolate: ({ name: identifier }) => ({
          identifier,
          path: `./${identifier}`,
        }),
      })
    )
  )()
}

const run = function () {
  let argv = yargs
    .option('s', {
      alias: 'src',
      demandOption: false, // 是否必填
      default: 'svg',
      describe: 'svg图标源文件地址',
      type: 'string',
    })
    .option('o', {
      alias: 'out',
      demandOption: false, // 是否必填
      default: 'src/svg',
      describe: 'svg图标转换结果输出地址',
      type: 'string',
    }).argv

  generat(argv.src, argv.out)
}

export default run()
