import { KeyValueInterface } from '../../containers';
import {
    SAVE_FILTER_DATA_TO_STATE,
    TOGGLE_FILTER_WIDGET,
} from '../constants';

export interface ToggleFilterWidget {
    type: typeof TOGGLE_FILTER_WIDGET;
    payload: {
        isFilterOpen: boolean,
    };
}

export interface SaveFilterDataToState {
    type: typeof SAVE_FILTER_DATA_TO_STATE;
    payload: KeyValueInterface[];
}

export type FilterWidgetAction = ToggleFilterWidget | SaveFilterDataToState;

export const toggleFilterWidgetState = (
    payload: ToggleFilterWidget['payload'],
): ToggleFilterWidget => ({
    type: TOGGLE_FILTER_WIDGET,
    payload,
});

export const saveFilterDataToState = (payload: SaveFilterDataToState['payload']): SaveFilterDataToState => ({
    type: SAVE_FILTER_DATA_TO_STATE,
    payload,
});
