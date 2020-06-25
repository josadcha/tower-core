const noCaseConversion = ['uid', 'txid', 'target_uid', 'tid'];

const valueConversion = (key, value) => (typeof value === 'string' && !(noCaseConversion.includes(key))) ? value.toLowerCase() : value;

const genArrayArg = (key, values) => values.map(i => `${key}[]=${encodeURIComponent(valueConversion(key, i))}`).join('&');

const genPlainArg = (key, value) => (`${key}=${encodeURIComponent(valueConversion(key, value))}`);

export const buildQueryString = (action: {}) => (Object.entries(action)
    .filter(w => w[1] !== '')
    .map(arg => Array.isArray(arg[1]) ? genArrayArg(arg[0], arg[1]) : genPlainArg(arg[0], arg[1]))
    .join('&'));
