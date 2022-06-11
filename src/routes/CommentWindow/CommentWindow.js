import React from 'react';
import ReactDOM from 'react-dom';


import CommentCard from 'components/CommentCard/CommentCard.js';
import CommentInput from 'components/CommentInput/CommentInput.js';

import 'assets/css/comment/comment_window.css';


class FakeData {

    static getComments(topicId, subTopicId) {
        let allComments = {
            allComments: [
                {
                    topicId: topicId,
                    subTopicId: subTopicId,
                    commentId: 'commentId1',
                    likes: '1k',
                    dislikes: '2',
                    comment: 'hello i am solo traveller',
                    commenter: 'solo_traveller',
                    aReplyTo: null,
                }
            ],
        };
        return allComments.allComments;
    }
}

class CommentWindowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.commentWindowComponentRef = React.createRef();
    }

    getCommentCard(commentJSON) {
        let commentCard = (
            <CommentCard
                commenter={commentJSON.commenter}
                comment={commentJSON.comment}
                commentId={commentJSON.commentId}
                likeCount={commentJSON.likes}
                dislikeCount={commentJSON.dislikes}
                key={commentJSON.commentId}
            />);
        return commentCard;
    }

    getComments() {
        let commentCards = [];
        FakeData.getComments().forEach(
            (commentJSON) => {
                commentCards.push(this.getCommentCard(commentJSON));
            }
        );
        return commentCards;
    }

    render() {
        let window = (
            <>
                <div className="comment-window" ref={this.commentWindowComponentRef}>
                    {this.getComments()}
                </div>
                <CommentInput />
            </>
        );

        return window;
    }
}

function CommentWindow(props) {

    return (
        ReactDOM.createPortal(
            <CommentWindowComponent {...props} />,
            document.getElementById('rightWindow')
        )
    );
}

export default CommentWindow;