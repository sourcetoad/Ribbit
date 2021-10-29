import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve as resolve} from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint';
import typescript from '@rollup/plugin-typescript';

// region build variables
const packageName = 'ribbit';
const env = process.env?.NODE_ENV === 'development' ? 'development' : 'production';
// endregion

// region helper functions
const buildFilename = format => `dist/index.${format}.js`;
// endregion

export default {
    input: 'src/index.ts',
    output: [
        {
            format: 'cjs',
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
        eslint({
            throwOnError: true
        }),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
    ],
}
