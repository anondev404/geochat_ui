import React from 'react';

import '../../assets/css/comment/comment_card.css';

import defProfilePic from '../../assets/images/default_profile_image.png';

export default class CommentCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commenter: props.commenter,
            comment: props.comment,
            commentId: props.commentId,
            likeCount: props.likeCount,
            dislikeCount: props.dislikeCount,
            like: Boolean(props.like),
            dislike: Boolean(props.dislike),
            likeIcon: {
                on: 'thumb_up_alt',
                off: 'thumb_up_off_alt',
            },
            dislikeIcon: {
                on: 'thumb_down_alt',
                off: 'thumb_down_off_alt',
            },
        };
    }

    getCommentCardCol2() {
        //{this.getReactionRow()}
        return (
            <div className="col">
                {this.getCommentWithUsernameRow()}
                
            </div>
        );
    }

    getCommentWithUsernameRow() {
        let commentRow = (
            <div className="row g-0">
                <div className="col">
                    <div className="card-body p-1">
                        <div className="user-name">
                            <h6 className="card-title">{this.state.commenter}</h6>
                        </div>
                        <div className="comment">
                            <p className="card-text">
                                {this.state.comment}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

        return commentRow;
    }

    getReactionRow() {
        let likeIcon, dislikeIcon;
        if (this.state.like) {
            likeIcon = this.state.likeIcon.on;
        } else {
            likeIcon = this.state.likeIcon.off;
        }
        if (this.state.dislike) {
            dislikeIcon = this.state.dislikeIcon.on;
        } else {
            dislikeIcon = this.state.dislikeIcon.off;
        }
        let reactionRow = (
            <div className="row g-0 mt-2">
                <div className="col-auto">
                    <div className="hstack gap-2">
                        <span className="like-button" onClick={this.handleLike.bind(this)}>
                            <span className="material-icons">
                                {likeIcon}
                            </span>
                        </span>
                        <span className="total-likes">
                            <span className="text-muted">{this.state.likeCount}</span>
                        </span>
                    </div>
                </div>
                <div className="col-auto mx-3">
                    <div className="hstack gap-2">
                        <span className="dislike-button" onClick={this.handleDislike.bind(this)}>
                            <span className="material-icons">
                                {dislikeIcon}
                            </span>
                        </span>
                        <span className="total-dislikes">
                            <span className="text-muted">{this.state.dislikeCount}</span>
                        </span>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="comment-button" onClick={this.handleReply.bind(this)}>
                        <span className="material-icons">
                            chat_bubble_outline
                        </span>
                    </div>
                </div>
            </div>
        );

        return reactionRow;
    }

    getCommentCardCol1() {
        return (
            <div className="col-auto p-1">
                <span className="profile-picture">
                    <img src={defProfilePic} alt="default profile pic" title="default profile picture" />
                </span>
            </div>
        );
    }

    handleLike(event) {
        event.stopPropagation();
        console.log('like');
        if (this.state.like) {
            this.setState({ like: false });
        } else {
            this.setState({ like: true, dislike: false });
        }
    }

    handleDislike(event) {
        event.stopPropagation();
        console.log('dislike');
        if (this.state.dislike) {
            this.setState({ dislike: false });
        } else {
            this.setState({ dislike: true, like: false });
        }
    }

    handleReply(event) {
        event.stopPropagation();
        console.log('reply');
    }

    render() {
        let card = (
            <div className="component-comment-card mb-3" id={this.state.commentId}>
                <div className="card">
                    <div className="row g-0">
                        {this.getCommentCardCol1()}
                        {this.getCommentCardCol2()}
                    </div>
                </div>
            </div>
        );


        return card;
    }
}