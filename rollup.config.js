const fs = require('fs');
const path = require('path');
const babelPlugin = require('rollup-plugin-babel');
const json = require('@rollup/plugin-json');
//const { eslint } = require('rollup-plugin-eslint');
const cwd = process.cwd();
const PKGDIR = './packages';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const pkgDirsNames = fs.readdirSync(PKGDIR).filter((cName) => {
    const abPath = path.join(cwd, `packages/${cName}`);
    return fs.statSync(abPath).isDirectory();
});

function generateConfig(pkgDirName) {
    return {
        input: `${PKGDIR}/${pkgDirName}/src/index.js`,
        output: [
            {
                file: `${PKGDIR}/${pkgDirName}/dist/index.js`,
                format: 'esm',
            },
        ],
        plugins: [
            json(),
            resolve(),
            babelPlugin({
                exclude: 'node_modules/**',
                plugins: ['@babel/plugin-proposal-object-rest-spread'],
            }),
        ],
    };
}

function generateWebConfig({ isBrowser, pkgDirName }) {
    return {
        input: `${PKGDIR}/${pkgDirName}/src/index.js`,
        output: [
            {
                file: `${PKGDIR}/${pkgDirName}/dist/index.js`,
                format: isBrowser ? 'umd' : 'cjs',
                name: 'SniperWebReporter',
            },
        ],
        plugins: [
            json(),
            resolve(),
            babelPlugin({
                exclude: 'node_modules/**',
                plugins: [
                    '@babel/plugin-proposal-object-rest-spread',
                    '@babel/plugin-transform-classes',
                ],
            }),
            commonjs(),
        ],
    };
}

const CONFIG = pkgDirsNames.map((cName) => {
    const isWeb = cName === 'WebReporter';
    return isWeb
        ? generateWebConfig({
              isBrowser: true,
              pkgDirName: cName,
          })
        : generateConfig(cName);
});

module.exports = CONFIG;
