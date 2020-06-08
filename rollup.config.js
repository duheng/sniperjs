const fs = require('fs');
const path = require('path');
const babelPlugin = require('rollup-plugin-babel');
const json = require('@rollup/plugin-json');
import babel2, { getBabelOutputPlugin } from '@rollup/plugin-babel';
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
        external: [
            '@sniperjs/error-reporter',
            '@sniperjs/miniwx-error-reporter',
            '@sniperjs/utils',
        ],
        plugins: [
            json(),
            resolve(),
            babelPlugin({
                exclude: 'node_modules/**',
                plugins: [
                    '@babel/plugin-proposal-object-rest-spread',
                    '@babel/plugin-transform-async-to-generator',
                ],
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
                // https://github.com/rollup/plugins/tree/master/packages/babel#running-babel-on-the-generated-code
                plugins: [
                    getBabelOutputPlugin({ presets: ['@babel/preset-env'] }),
                ],
            },
        ],
        plugins: [json(), resolve(), commonjs()],
    };
}

const CONFIG = pkgDirsNames.map((cName) => {
    const isWeb =
        cName === 'WebReporter';
    return isWeb
        ? generateWebConfig({
              isBrowser: false,
              pkgDirName: cName,
          })
        : generateConfig(cName);
});

module.exports = CONFIG;
