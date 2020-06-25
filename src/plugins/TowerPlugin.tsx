import * as React from 'react';
import { CombinedState, Reducer } from 'redux';

export interface MenuItem {
    key: string;
    value: string;
    isLink: boolean;
}

export interface HeaderActions {
    pagesWithFilter?: string[];
    pagesWithRefresh?: string[];
    pagesWithExport?: string[];
    customHeaderActions?: JSX.Element;
}

export interface TowerPluginInterface {
    getReduxReducer: () => Reducer<CombinedState<{}>>;
    // tslint:disable-next-line: no-any
    getReduxSaga: () => any;
    getRoutes: () => React.Component;
    getHeaderActions: () => HeaderActions;
    getMenu: () => MenuItem[];
    getMenuIcons: (name: string) => JSX.Element;
}

export class TowerPlugin implements TowerPluginInterface {
    public getReduxReducer: () => Reducer<CombinedState<{}>>;
    // tslint:disable-next-line: no-any
    public getReduxSaga: () => any;
    public getRoutes: () => React.Component;
    public getHeaderActions: () => HeaderActions;
    public getMenu: () => MenuItem[];
    public getMenuIcons: (name: string) => JSX.Element;

    constructor(reduxReduser, reduxSaga, routes, headerActions, menu, icons) {
        this.getReduxReducer = () => reduxReduser;
        this.getReduxSaga = () => reduxSaga;
        this.getRoutes = () => routes;
        this.getHeaderActions = () => headerActions;
        this.getMenu = () => menu;
        this.getMenuIcons = icons;
    }
}
