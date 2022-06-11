import React from 'react';

import { Outlet } from 'react-router-dom';

import UIToolbar from 'components/UIToolbar/UIToolbar.js';
import BottomUIToolbar from 'components/BottomUIToolbar/BottomUIToolbar';

import 'assets/css/left_window/left_window.css';


class LeftWindowEventManager {
    static onUserProfileClick(event) {
        event.stopPropagation();
    }

    static onCreateButtonClick(event) {
        event.stopPropagation();
        console.log('LeftWindow: create button clicked in bottom-ui-toolbar');
    }
}

export default class LeftWindowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.leftWindowRef = React.createRef();
    }

    get nav() {
        return this.props.nav;
    }

    componentDidMount() {
        let leftWindow = this.leftWindowRef.current;
        leftWindow.addEventListener('userProfileClick', LeftWindowEventManager.onUserProfileClick.bind(this));
        leftWindow.addEventListener('createButtonClick', LeftWindowEventManager.onCreateButtonClick.bind(this));
        /*ReactDOM.render(
            <div className="rightWindowDefaultDisplay">
                <img src={appLogo} alt='GeoChat Logo' />
            </div>,
            document.getElementById('rightWindow')
        );*/
    }

    componentWillUnmount() {
        let leftWindow = this.leftWindowRef.current;
        leftWindow.removeEventListener('userProfileClick', LeftWindowEventManager.onUserProfileClick.bind(this));
        leftWindow.removeEventListener('createButtonClick', LeftWindowEventManager.onCreateButtonClick.bind(this));
        console.log('leftWindow unmounted');
    }


    render() {
        let leftWindow = (
            <div className="left-window" ref={this.leftWindowRef} id='leftWindow'>
                <UIToolbar />
                <Outlet />
                <BottomUIToolbar />
            </div>
        );
        return leftWindow;
    }
}
