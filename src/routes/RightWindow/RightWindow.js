import React from 'react';
import ReactDOM from 'react-dom';

import { useSearchParams } from 'react-router-dom';

import 'assets/css/right_window/right_window.css';
import 'assets/css/right_window_default_display/right_window_default_display.css';

class RightWindowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.rightWindow = React.createRef();
        [this.searchParams, this.setSearchParams] = props.searchParams;
        this.state = {
            topicId: this.searchParams.get('topicId'),
            subTopicId: this.searchParams.get('subTopicId'),
        };
    }

    render() {
        let window = (
            <div className="right-window" ref={this.rightWindow} id='rightWindow'></div>
        );

        return window;
    }
}

function RightWindow(props) {
    let searchParams = useSearchParams();

    return (
        <RightWindowComponent {...props} searchParams={searchParams} />
    )
}

export default RightWindow;
