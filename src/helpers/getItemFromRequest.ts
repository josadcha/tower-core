export const getItemFromRequest = (elems, key) => {
    if (elems.length) {
        const item = elems.find(i => i.key === key);

        if (item && (item.value !== null)) {
            return item.value;
        }
    }

    return '';
};
