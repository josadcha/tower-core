import { DataInterface } from '../modules';

export const jsonToArray = list => {
    if (!Object.keys(list).length) {
        return [];
    }
    let result: DataInterface[] = [];

    for (const key in list) {
        if (list[key] && list[key].length !== 0) {
            result.push({ type: 'key', value: key });

            if (list[key] instanceof Object) {
                result = result.concat(jsonToArray(list[key]));
            } else {
                result.push({ type: 'value', value: list[key] });
            }
        }
    }

    return result;
};
