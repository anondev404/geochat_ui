import React from 'react';

import '@polymer/paper-input/paper-textarea.js';

import 'assets/css/comment_input/comment_input.css'

class CommentInputComponent extends React.Component {

    render() {
        let commentInput = (
            <div className="component-comment-input">
                <paper-textarea label="type comment here..."></paper-textarea>
            </div>
        );

        return commentInput;
    }
}

function CommentInput(props) {

    return (<CommentInputComponent {...props} />);
}

export default CommentInput;