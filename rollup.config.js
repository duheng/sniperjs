const fs = require('fs');
const path = require('path');
const babelPlugin = require('rollup-plugin-babel');
const { eslint } = require('rollup-plugin-eslint');
const cwd = process.cwd();
const PKGDIR = './packages';


const pkgDirsNames = fs.readdirSync(PKGDIR)
.filter((cName) => {
    const abPath = path.join(cwd, `packages/${cName}`);
    return fs.statSync(abPath).isDirectory();
});

function generateConfig(pkgDirName) {
    return {
        input: `${PKGDIR}/${pkgDirName}/src/index.js`,
        output: [
            {
                file: `${PKGDIR}/${pkgDirName}/lib/index.esm.js`,
                format: 'esm'
            }
        ],
        plugins: [
            babelPlugin({
                exclude: 'node_modules/**',
                // plugins: [
                //     '@babel/plugin-proposal-object-rest-spread'
                // ]
            }),
            // eslint({
            //     extends: 'airbnb'
            // })
        ]  
    }
}

const CONFIG = pkgDirsNames.map((cName) => {
    return generateConfig(cName);
});


module.exports = CONFIG;