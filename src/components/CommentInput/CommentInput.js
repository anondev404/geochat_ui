import React from 'react';

import '@polymer/paper-input/paper-textarea.js';

import '../../assets/css/comment_input/comment_input.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

class CommentInputComponent extends React.Component {

    constructor(props) {
        super(props);

        this.commentInputRef = React.createRef();
    }

    componentDidMount() {

        this.commentInputRef.current.addEventListener('keypress', this.monitorKey.bind(this));
    }

    monitorKey(event) {
        event.stopPropagation();

        if (event.code === 'Enter') {
            this.sendMetaDiscussion(event.target.value)
        }
    }

    sendMetaDiscussion(message) {
        console.log('sending...');


        axios.post(`/create/subTopicMetaDiscussion`, {
            "sub_topic_id": this.props.subTopicId,
            "message": message
        }, {
            withCredentials: true
        }).then((res) => {
            const serverRes = res.data;

            toast(serverRes.message);
        }).catch(err => {
            toast(serverRes.message);
        });
    }


    render() {
        let commentInput = (
            <>
                <div className="component-comment-input">
                    <paper-textarea label="type comment here..." ref={this.commentInputRef}></paper-textarea>
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={true}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false} />
            </>
        );

        return commentInput;
    }
}

function CommentInput(props) {

    return (<CommentInputComponent {...props} />);
}

export default CommentInput;