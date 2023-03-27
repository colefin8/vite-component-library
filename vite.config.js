import fs from 'fs'
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'

const projectRoot = path.resolve(__dirname, '');

export default defineConfig({
  input: '/src/entry.js',
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: `${path.resolve(projectRoot, 'src')}`,
        },
      ],
    }),
    vue(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    }),
    commonjs(),
    scss(),
    babel({      
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        // Config for @babel/preset-env
        {
          // Example: Always transpile optional chaining/nullish coalescing
          include: [
            /(optional-chaining|nullish-coalescing)/
          ],
        },
      ],
    }),
  ],
  build: {
    target: 'es2016',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/entry.js'),
      name: 'AcoDesignSystem',
      // the proper extensions will be added
      fileName: 'aco-design-system',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})