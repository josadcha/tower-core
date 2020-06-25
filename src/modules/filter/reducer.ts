import { KeyValueInterface } from '../../containers';
import {
    SAVE_FILTER_DATA_TO_STATE,
    TOGGLE_FILTER_WIDGET,
} from '../constants';
import { FilterWidgetAction } from './actions';

export interface CurrentFilterState {
    isFilterOpen: boolean;
    filterData: KeyValueInterface[];
}

export const initialFilterStatus: CurrentFilterState = {
    isFilterOpen: false,
    filterData: [],
};

export const filterWidgetReducer = (state = initialFilterStatus, action: FilterWidgetAction) => {
    switch (action.type) {
        case TOGGLE_FILTER_WIDGET:
            return {
                ...state,
                isFilterOpen: action.payload.isFilterOpen,
            };
        case SAVE_FILTER_DATA_TO_STATE:
            return {
                ...state,
                filterData: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};
