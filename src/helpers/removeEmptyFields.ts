export const removeEmptyFields = action => Object.keys(action).reduce((previous, current) => {
    return {
        ...previous,
        ...(action[current] && { [current]: action[current] }),
    };
}, {});
