import React from 'react';

import { useLocation } from 'react-router-dom';

import '../../assets/css/bottom_ui_toolbar/bottom_ui_toolbar.css';

class BottomUIToolbarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.createButtonRef = React.createRef();
    }

    get location() {
        return this.props.location;
    }

    getBackButton() {
        let visibility;
        let onClickHandler = null;
        if (this.location.pathname === '/topic') {
            visibility = false;
        } else {
            visibility = true;
            onClickHandler = this.onBackButtonClick.bind(this);
        }

        return (
            <span
                className="backward-button"
                title="go backward"
                onClick={onClickHandler}
                style={{ visibility: `${(visibility) ? 'visible' : 'hidden'}` }}>
                <span className="material-icons">
                    chevron_left
                </span>
            </span>
        );
    }

    getForwardButton() {
        let visibility;
        let onClickHandler = null;
        if (this.location.pathname.endsWith('/subTopicDisplay')) {
            visibility = false;
        } else {
            visibility = true;
            onClickHandler = this.onForwardButtonClick.bind(this);
        }

        return (
            <span
                className="forward-button"
                title="go forward"
                onClick={onClickHandler}
                style={{ visibility: `${(visibility) ? 'visible' : 'hidden'}` }}>
                <span className="material-icons">
                    chevron_right
                </span>
            </span>
        );
    }

    getSubTopicCreateButton() {
        let visibility = false;
        let button = () => {
            return (
                <span
                    className="create-button"
                    title="create"
                    ref={this.createButtonRef}
                    onClick={(visibility) ? this.onCreateButtonClick.bind(this) : null}
                    style={{ visibility: (visibility) ? 'visible' : 'hidden' }}>
                    <span className="material-icons">
                        add_circle_outline
                    </span>
                </span>
            );
        };
        if (this.location.pathname.endsWith('/subTopic')) {
            visibility = true;
        }

        return button(visibility);
    }


    onCreateButtonClick() {
        let createButton = this.createButtonRef.current;
        let event = new CustomEvent('createButtonClick', {
            bubbles: true,
            cancelable: false,
        });
        createButton.dispatchEvent(event);
    }

    onBackButtonClick() {
        window.history.back();
    }

    onForwardButtonClick() {
        window.history.forward();
    }

    render() {
        let toolbar = (
            <div className="component-bottom-ui-toolbar position-absolute bottom-0 start-50 translate-middle">
                <div className="hstack gap-3 pt-1 rounded-pill justify-content-center">
                    {this.getBackButton()}
                    {this.getSubTopicCreateButton()}
                    {this.getForwardButton()}
                </div>
            </div>
        );

        return toolbar;
    }
}

function BottomUIToolbar(props) {
    let location = useLocation();

    return (<BottomUIToolbarComponent {...props} location={location} />)
}

export default BottomUIToolbar;