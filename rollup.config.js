const fs = require('fs');
const path = require('path');
const babelPlugin = require('rollup-plugin-babel');
const json = require('@rollup/plugin-json');
//const { eslint } = require('rollup-plugin-eslint');
const cwd = process.cwd();
const PKGDIR = './packages';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkgDirsNames = fs.readdirSync(PKGDIR).filter((cName) => {
    const abPath = path.join(cwd, `packages/${cName}`);
    return fs.statSync(abPath).isDirectory();
});

function generateConfig(pkgDirName) {
    let plugins = [
        json(),
        babelPlugin({
            exclude: 'node_modules/**',
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
        }),
        // eslint({
        //     extends: 'airbnb'
        // })
    ];

    const isWeb = pkgDirName === 'web';

    if (isWeb) {
        plugins = [
            resolve({
                browser: true,
            }),
            commonjs(),
        ].concat(plugins);
    }

    return {
        input: `${PKGDIR}/${pkgDirName}/src/index.js`,
        output: [
            // {
            //     file: `${PKGDIR}/${pkgDirName}/esm/index.esm.js`,
            //     format: 'esm'
            // },
            {
                file: `${PKGDIR}/${pkgDirName}/dist/index.js`,
                format: isWeb ? 'umd' : 'cjs',
                name: 'Sniperjs',
            },
        ],
        plugins: plugins,
    };
}

const CONFIG = pkgDirsNames.map((cName) => {
    return generateConfig(cName);
});

module.exports = CONFIG;
