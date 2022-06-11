import React from 'react';

import { Outlet } from 'react-router-dom';

import LeftWindow from 'routes/LeftWindow/LeftWindow';
import RightWindow from 'routes/RightWindow/RightWindow';

import 'assets/css/main_ui/main_ui.css';

export default class MainUI extends React.Component {

    render() {
        let mainUI = (
            <div className="main-ui p-2">
                <LeftWindow >
                    <Outlet />
                </LeftWindow>
                <RightWindow />
            </div>
        );
        return mainUI;
    }
}