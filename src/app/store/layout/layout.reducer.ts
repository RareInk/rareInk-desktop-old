import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  SET_ELECTRON_MODE,
  SET_WEB_MODE,
  Actions
} from './layout.actions';

export interface State {
  isElectron: boolean;
}

const initialState: State = {
  isElectron: false
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case SET_ELECTRON_MODE: {
      return {
        ...state,
        isElectron: true
      };
    }
    case SET_WEB_MODE: {
      return {
        ...state,
        isElectron: false
      };
    }
    default: {
      return state;
    }
  }
}

export const getLayoutState = createFeatureSelector<State>('layout');

export const getIsElectron = createSelector(
  getLayoutState,
  (state: State) => state.isElectron
);