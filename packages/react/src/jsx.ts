import { REACT_SYMBOL_TYPE } from 'shared/ReactSymbols';
import { Type, Key, Ref, Props, ReactElementType, ElementType } from 'shared/ReactType';

// ReactElement

const ReactElement = (type: Type, key: Key, ref: Ref, props: Props): ReactElementType => {
	const element = {
		$$typeof: REACT_SYMBOL_TYPE,
		type,
		key,
		ref,
		props,
		// 真实 react 是没有这个属性的，只是为了与真实的 React 实现进行区分
		__mark: 'demo'
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined && val !== null) {
				// TODO: 这里为什么一定要是字符串
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined && val !== null) {
				// TODO: 这里为什么一定要是字符串
				ref = '' + val;
			}
			continue;
		}
		// 判断是否为自己的属性，而不是原型上的
		if ({}.hasOwnProperty.call({}, prop)) {
			props[prop] = val;
		}

		const maybeChildrenLength = maybeChildren.length;
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else if (maybeChildrenLength > 1) {
			props.children = maybeChildren;
		}

		return ReactElement(type, key, ref, props);
	}
};

export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				// TODO: 这里为什么一定要是字符串
				key = '' + val;
				continue;
			}
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
				continue;
			}
		}
		// 判断是否为自己的属性，而不是原型上的
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
		return ReactElement(type, key, ref, props);
	}
};
