export const convertToUTCTime = (date: string) => {
    const d = new Date(date);

    return d.toUTCString();
};
