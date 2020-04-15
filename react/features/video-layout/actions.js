// @flow

import type { Dispatch } from 'redux';

import {
    SCREEN_SHARE_PARTICIPANTS_UPDATED,
    SET_TILE_VIEW,
    SET_SHARE_VIEW
} from './actionTypes';

/**
 * Creates a (redux) action which signals that the list of known participants
 * with screen shares has changed.
 *
 * @param {string} participantIds - The participants which currently have active
 * screen share streams.
 * @returns {{
 *     type: SCREEN_SHARE_PARTICIPANTS_UPDATED,
 *     participantId: string
 * }}
 */
export function setParticipantsWithScreenShare(participantIds: Array<string>) {
    return {
        type: SCREEN_SHARE_PARTICIPANTS_UPDATED,
        participantIds
    };
}

/**
 * Creates a (redux) action which signals to set the UI layout to be tiled view
 * or not.
 *
 * @param {boolean} enabled - Whether or not tile view should be shown.
 * @returns {{
 *     type: SET_TILE_VIEW,
 *     enabled: boolean
 * }}
 */
export function setTileView(enabled: boolean) {
    return {
        type: SET_TILE_VIEW,
        enabled
    };
}

/**
 * Creates a (redux) action which signals either to exit tile view if currently
 * enabled or enter tile view if currently disabled.
 *
 * @returns {Function}
 */
export function toggleTileView() {
    return (dispatch: Dispatch<any>, getState: Function) => {
        const { tileViewEnabled } = getState()['features/video-layout'];

        dispatch(setTileView(!tileViewEnabled));
    };
}

/**
 * Creates a (redux) action which signals to set the UI layout to be shared view
 * or not.
 *
 * @param {boolean} enabled - Whether or not share view should be shown.
 * @returns {{
 *     type: SET_SHARE_VIEW,
 *     enabled: boolean
 * }}
 */
export function setShareView(enabled: boolean) {
    return {
        type: SET_SHARE_VIEW,
        enabled
    };
}

/**
 * Creates a (redux) action which signals either to exit share view if currently
 * enabled or enter share view if currently disabled.
 *
 * @returns {Function}
 */
export function toggleShareView() {
    return (dispatch: Dispatch<any>, getState: Function) => {
        const { shareViewEnabled } = getState()['features/video-layout'];

        dispatch(setShareView(!shareViewEnabled));
    };
}
