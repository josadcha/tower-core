import * as React from 'react';
import { TowerPlugin, TowerPluginInterface } from '../TowerPlugin';
import { ieoActions, ieoMenuIcons, ieoMenuItem } from './constants';
import { IEORoutes } from './containers';
import { ieoPluginReducer, rootIEOPluginsSaga } from './modules';

export * from './containers';
export * from './components';
export * from './modules';

export const IEOPlugin: TowerPluginInterface =
    new TowerPlugin(ieoPluginReducer, rootIEOPluginsSaga, <IEORoutes/>, ieoActions, ieoMenuItem, ieoMenuIcons);
