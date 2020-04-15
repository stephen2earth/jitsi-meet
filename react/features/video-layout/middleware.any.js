import {
    PIN_PARTICIPANT,
    getPinnedParticipant,
    pinParticipant
} from '../base/participants';
import { MiddlewareRegistry } from '../base/redux';
import { SET_DOCUMENT_EDITING_STATUS, toggleDocument } from '../etherpad';

import { SET_TILE_VIEW, SET_SHARE_VIEW } from './actionTypes';
import { setTileView, setShareView } from './actions';

/**
 * Middleware which intercepts actions and updates tile/share view related state.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const { tileViewEnabled, shareViewEnabled } = store.getState()['features/video-layout'];

    switch (action.type) {
    case PIN_PARTICIPANT: {
        const isPinning = Boolean(action.participant.id);

        if (isPinning) {
            if (tileViewEnabled) {
                store.dispatch(setTileView(false));
            }
            if (shareViewEnabled) {
                store.dispatch(setShareView(false));
            }
        }

        break;
    }

    case SET_DOCUMENT_EDITING_STATUS:
        if (action.editing) {
            store.dispatch(setTileView(false));
            store.dispatch(setShareView(false));
        }

        break;

    case SET_TILE_VIEW: {
        const state = store.getState();

        if (action.enabled) {
            if (getPinnedParticipant(state)) {
                store.dispatch(pinParticipant(null));
            }

            if (state['features/etherpad'].editing) {
                store.dispatch(toggleDocument());
            }

            if (shareViewEnabled) {
                store.dispatch(setShareView(false));
            }
        }

        break;
    }

    case SET_SHARE_VIEW: {
        const state = store.getState();

        if (action.enabled) {
            if (getPinnedParticipant(state)) {
                store.dispatch(pinParticipant(null));
            }

            if (state['features/etherpad'].editing) {
                store.dispatch(toggleDocument());
            }

            if (tileViewEnabled) {
                store.dispatch(setTileView(false));
            }
        }

        break;
    }
    }

    return next(action);
});
