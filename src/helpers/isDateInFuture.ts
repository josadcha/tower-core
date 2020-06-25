export const isDateInFuture = date => {
    const inputDate = new Date(date);
    const curDate = new Date();

    return inputDate > curDate;
};
