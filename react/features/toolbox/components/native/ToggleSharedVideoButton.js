// @flow

import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { AbstractButton } from '../../../base/toolbox';
import type { AbstractButtonProps } from '../../../base/toolbox';
import { IconShareVideo } from '../../../base/icons';
import { toggleSharedVideo } from '../../../shared-video';
import {
    createToolbarEvent,
    sendAnalytics
} from '../../../analytics';

/**
 * The type of the React {@code Component} props of {@link ToggleSharedVideoButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether are we sharing the video or not
     */
    _sharingVideo: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for sharing a video.
 */
class ToggleSharedVideoButton extends AbstractButton<Props, *> {

    /**
     * Initializes a new {@code OverflowMenu} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onToolbarToggleSharedVideo = this._onToolbarToggleSharedVideo.bind(this);
    }

    accessibilityLabel = 'toolbar.accessibilityLabel.sharedvideo';
    icon = IconShareVideo;
    label = 'toolbar.sharedvideo';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        // this._onToolbarToggleSharedVideo;

        sendAnalytics(createToolbarEvent('shared.video.toggled',
            {
                enable: !this.props._sharingVideo
            }));

        this.props.dispatch(toggleSharedVideo());
    }

    _onToolbarToggleSharedVideo: () => void;

    /**
     * Creates an analytics toolbar event and dispatches an action for toggling
     * the sharing of a YouTube video.
     *
     * @private
     * @returns {void}
     */
    _onToolbarToggleSharedVideo() {
        sendAnalytics(createToolbarEvent('shared.video.toggled',
            {
                enable: !this.props._sharingVideo
            }));

        this.props.dispatch(toggleSharedVideo());
    }

    /**
     * Indicates whether this button is disabled or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    isDisabled() {
        return this.props._sharingVideo;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code ToggleSharedVideoButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _sharingVideo: boolean,
 * }}
 */
function _mapStateToProps(state): Object {
    const sharedVideoStatus = state['features/shared-video'].status;

    return {
        _sharingVideo: sharedVideoStatus === 'playing'
            || sharedVideoStatus === 'start'
            || sharedVideoStatus === 'pause'
    };
}

export default translate(connect(_mapStateToProps)(ToggleSharedVideoButton));
