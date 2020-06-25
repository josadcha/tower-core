export const getCsvFileName = (pathname: string) => {
    const routes = pathname.split('/');

    if (routes.length > 4) {
        return `${routes[routes.length - 2]}_${routes[routes.length - 1]}.csv`;
    } else {
        return `${routes[routes.length - 1]}.csv`;
    }
};
