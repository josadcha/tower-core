import { AppState } from '..';
import { CurrentFilterState } from './reducer';

export const selectFilterData = (state: AppState): CurrentFilterState['isFilterOpen'] =>
    state.filterStatus.isFilterOpen;

export const selectFilterItemsData = (state: AppState): CurrentFilterState['filterData'] =>
    state.filterStatus.filterData;
