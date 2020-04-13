// @flow

import type { Dispatch } from 'redux';

import {
    createToolbarEvent,
    sendAnalytics
} from '../../analytics';
import { translate } from '../../base/i18n';
import { IconShareView } from '../../base/icons';
import { connect } from '../../base/redux';
import {
    AbstractButton,
    type AbstractButtonProps
} from '../../base/toolbox';

import { setShareView } from '../actions';
import logger from '../logger';

/**
 * The type of the React {@code Component} props of {@link ShareViewButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether or not share view layout has been enabled as the user preference.
     */
    _shareViewEnabled: boolean,

    /**
     * Used to dispatch actions from the buttons.
     */
    dispatch: Dispatch<any>
};

/**
 * Component that renders a toolbar button for toggling the share layout view.
 *
 * @extends AbstractButton
 */
class ShareViewButton<P: Props> extends AbstractButton<P, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.shareView';
    icon = IconShareView;
    label = 'toolbar.enterShareView';
    toggledLabel = 'toolbar.exitShareView';
    tooltip = 'toolbar.shareViewToggle';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        const { _shareViewEnabled, dispatch } = this.props;

        sendAnalytics(createToolbarEvent(
            'shareview.button',
            {
                'is_enabled': _shareViewEnabled
            }));
        const value = !_shareViewEnabled;

        logger.debug(`Share view ${value ? 'enable' : 'disable'}`);
        dispatch(setShareView(value));
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._shareViewEnabled;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code ShareViewButton} component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _shareViewEnabled: boolean
 * }}
 */
function _mapStateToProps(state) {
    return {
        _shareViewEnabled: state['features/video-layout'].shareViewEnabled
    };
}

export default translate(connect(_mapStateToProps)(ShareViewButton));
