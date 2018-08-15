import pkg from './package.json'
import standard from 'rollup-plugin-standard'
import templateStringOptimize from 'rollup-plugin-template-string-optimize'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

const banner = `/*!
* one-page-scroll ${pkg.version}
* https://github.com/huihuimoe/one-page-scroll
* Released under the MIT license
*/`

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'onePageScroll',
      file: 'one-page-scroll.js',
      format: 'umd',
      banner
    },
    plugins: [
      standard(),
      templateStringOptimize(),
      babel({
        presets: [['@babel/env', { modules: false }]]
      })
    ]
  },
  {
    input: 'src/index.js',
    output: {
      name: 'onePageScroll',
      file: 'one-page-scroll.min.js',
      sourcemap: true,
      sourcemapFile: 'one-page-scroll.min.js.map',
      format: 'umd',
      banner
    },
    plugins: [
      standard(),
      templateStringOptimize(),
      babel({
        sourceMap: true,
        presets: [['@babel/env', { modules: false }]]
      }),
      uglify({
        output: {
          comments: /^!/
        }
      })
    ]
  }
]
