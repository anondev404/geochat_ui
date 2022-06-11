import React from 'react';

import 'assets/css/ui_toolbar/ui_toolbar.css';

import defProfilePic from 'assets/images/default_profile_image.png';
import appLogo from 'assets/images/geo_chat.png';

export default class UIToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.userProfileRef = React.createRef();
    }

    getToolbarBackButton() {
        //currently not used in component
        let backButton = (
            <div className="col-auto d-flex align-items-center">
                <span className="back-button" title="back">
                    <span className="material-icons">
                        arrow_back_ios
                    </span>
                </span>
            </div>
        );

        return backButton;
    }

    userProfileClickEvent() {
        let userProfileImage = this.userProfileRef.current;
        let event = new CustomEvent('userProfileClick', {
            bubbles: true,
            cancelable: false,
        });
        console.log(event.bubbles);
        userProfileImage.dispatchEvent(event);
    }

    render() {
        let toolbar = (
            <div className="component-ui-toolbar">
                <div className="card mx-1">
                    <div className="card-body p-2">
                        <div className="row g-0">
                            <div className="col">
                                <div className="hstack">
                                    <span id="geoChatLogo">
                                        <img src={appLogo} alt='GeoChat Logo' title="Geo Chat" />
                                    </span>
                                    <span id="appName">
                                        <h6 className="card-title text-muted"><b>Geo Chat</b></h6>
                                    </span>
                                    <span id="userProfile" onClick={this.userProfileClickEvent.bind(this)}>
                                        <img
                                            src={defProfilePic}
                                            ref={this.userProfileRef}
                                            alt='Profile Pic'
                                            title="User Profile" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return toolbar;
    }
}