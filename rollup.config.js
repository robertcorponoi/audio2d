'use strict'

import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',
  external: [],
  plugins: [
    resolve({ extensions }),
    commonjs({ include: 'node_modules/**'}),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
  ],
  output: [{
    file: pkg.module,
    format: 'es',
  }]
};