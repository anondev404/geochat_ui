import React from 'react';
import ReactDOM from 'react-dom';


import CommentCard from '../../components/CommentCard/CommentCard.js';
import CommentInput from '../../components/CommentInput/CommentInput.js';

import '../../assets/css/comment/comment_window.css';
import Comment from './../../server/Comment';

import axios from 'axios';

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
        [this.searchParams, this.setSearchParams] = props.searchParams;

        this.state = {
            topicId: this.searchParams.get('topicId'),
            subTopicId: this.searchParams.get('subTopicId'),
            data: [],
        }
    }

    componentDidMount() {
        console.log('mounting');

        this.fetchMetaDiscussion();
    }

    componentDidUpdate() {
        console.log('updating');
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

    format(data) {
        let commentInfo = [];
        console.table([{ subTopicId: this.state.subTopicId }])
        data.forEach(item => {
            commentInfo.push({
                topicId: this.state.topicId,
                subTopicId: this.state.subTopicId,
                commentId: `commentId${item.meta_discuss_id}`,
                likes: '0',
                dislikes: '0',
                comment: item.message,
                commenter: 'solo_traveller',
                aReplyTo: null,
            });
        });

        return commentInfo;
    }

    fetchMetaDiscussion() {
        console.log('fetching...');


        axios.post(`/fetch/subTopicMetaDiscussion`, {
            "sub_topic_id": this.state.subTopicId
        }, {
            withCredentials: true
        }).then((res) => {

            const serverRes = res.data;

            const data = serverRes.data;

            console.log(serverRes);

            if (serverRes.isSubTopicExists) {
                if (this.state.data.length === 0) {
                    this.setState({
                        data: this.format(data)
                    });
                    console.log(this.state);
                }
            }
        });

        return this.state.data;
    }

    getComments() {
        let commentCards = [];
        /*FakeData.getComments().forEach(
           (commentJSON) => {
               commentCards.push(this.getCommentCard(commentJSON));
           }
       );*/

        const commentJSON = this.state.data.forEach(
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