import { convertToUTCTime } from './convertToUTCTime';

export const convertFullDate = (date: string) => {
    if (date.length) {
        const formattedDate = `${date.split(' ')[0].split('-').reverse().join('-')}T${date.split(' ')[1]}`;

        return convertToUTCTime(formattedDate);
    }

    return '';
};
