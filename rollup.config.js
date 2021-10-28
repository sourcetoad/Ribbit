import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

// region build variables
const packageName = 'Ribbit';
const env = process.env?.NODE_ENV === 'development' ? 'development' : 'production';
const extensions = ['.js', '.jsx'];
// endregion

// region helper functions
const buildFilename = format => `dist/index.${format}.js`;
// endregion

export default {
    input: 'src/index.js',
    output: [
        {
            format: 'umd',
            file: buildFilename('umd'),
            name: packageName,
            exports: 'named',
            sourcemap: env === 'development',
        },
        {
            format: "cjs",
            file: buildFilename('cjs'),
            name: packageName,
            exports: 'named',
            sourcemap: env === 'development',
        },
        {
            format: 'es', // This is what tells rollup to use ES6 modules
            file: buildFilename('es'),
            name: packageName,
            exports: 'named',
            sourcemap: env === 'development',
        },
    ],
    plugins: [
        resolve(),
        commonjs(), // Allow us to build common js modules
        babel({
            exclude:'node_modules/**',
            extensions,
            babelHelpers: 'bundled',
            envName: env === 'production' ? 'browser' : 'browserDev'
        }),
        (env === 'production' && terser())
    ],
}
