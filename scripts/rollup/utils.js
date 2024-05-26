import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
// react 规范中，如 react-demo 都在 node_modules 中
const disPath = path.resolve(__dirname, '../../dist/node_modules');

// 解析包路径
export const resolvePkgPath = (pkgName, isDist) => {
	if (isDist) {
		return `${disPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
};

export const getPackageJSON = (pkgName) => {
	// ...包路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const pkg = fs.readFileSync(path, { encoding: 'utf8' });
	// 序列化该 pkgName 的 package.json
	return JSON.parse(pkg);
};

/**
 * 获取所有基础 plugin：用于解析 commonJs 规范和 ts -> js(rollup-plugin-typescript2)
 */
export const getBaseRollupPlugins = ({ typescript = {} } = {}) => {
	return [cjs(), ts(typescript)];
};
