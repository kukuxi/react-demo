import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJSON('react');
// 解析包路径
const pkgPath = resolvePkgPath(name);
// 解析产物路径
const disPath = resolvePkgPath(name, true);

export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${disPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		external: ['react', 'react-dom'],
		plugins: [getBaseRollupPlugins()]
	},
	// jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			{
				// jsx-runtime
				file: `${disPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			{
				// jsx-dev-runtime
				file: `${disPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: disPath,
				baseContents: ({ version, name, description }) => ({
					version,
					name,
					description,
					main: 'index.js'
				})
			})
		]
	}
];
