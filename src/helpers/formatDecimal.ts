export const formatDecimal = (value, fixed) => {
    const safeFixed = Number(fixed) || 0;
    const baseNumber = 10;
    let result = (typeof value === 'undefined') ? '0' :
        (Math.floor(+value * Math.pow(baseNumber, safeFixed)) / Math.pow(baseNumber, safeFixed)).toString();
    if (result.indexOf('.') === -1 && +safeFixed > 0) {
        result += '.';
    }

    while (result.slice(result.indexOf('.')).length <= safeFixed) {
        result += '0';
    }

    return result;
};
