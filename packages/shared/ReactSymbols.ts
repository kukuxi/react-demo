const supportedSymbols = typeof Symbol === 'function' && Symbol.for;

export const REACT_SYMBOL_TYPE = supportedSymbols ? Symbol.for('react.element') : 0xec7;
