
class NewComment {
    constructor() {
        this.config = {
            request: {
                method: 'PUT',
                url: '/comment',
                body: function (topicId, subTopicId, comment) {
                    let style = {
                        topicId: topicId,
                        subTopicId: subTopicId,
                        comment: comment,
                    };

                    return style;
                },
            },
        };
    }

    newComment(topicId, subTopicId, comment) { }
}

class CommentReaction {
    constructor() {
        this.config = {
            request: {
                method: 'PUT',
                like: {
                    url: '/comment/like',
                    body: function (topicId, subTopicId, commentId) {
                        let style = {
                            topicId: topicId,
                            subTopicId: subTopicId,
                            commentId: commentId,
                            like: true,
                            dislike: false,
                        };

                        return style;
                    },
                },
                dislike: {
                    url: '/comment/dislike',
                    body: function (topicId, subTopicId, commentId) {
                        let style = {
                            topicId: topicId,
                            subTopicId: subTopicId,
                            commentId: commentId,
                            like: false,
                            dislike: true,
                        };

                        return style;
                    },
                },
                reply: {
                    url: '/comment/reply',
                    body: function (topicId, subTopicId, commentId, reply) {
                        let style = {
                            topicId: topicId,
                            subTopicId: subTopicId,
                            commentId: commentId,
                            reply: reply,
                        };

                        return style;
                    },
                }
            },
        }
    }

    like(topicId, subTopicId, commentId) { }

    dislike(topicId, subTopicId, commentId) { }

    reply(topicId, subTopicId, commentId, reply) { }
}

class AllComments {
    constructor() {
        this.config = {
            request: {
                method: 'GET',
                url: '/comment',
                body: function (topicId, subTopicId) {
                    let style = {
                        topicId: topicId,
                        subTopicId: subTopicId,
                    };

                    return style;
                },
            },
            response: {
                style: {
                    allComments: [
                        {
                            topicId: 'To be replaced with topic-id',
                            subTopicId: 'to be replaced with sub-topic-id',
                            commentId: 'To be replaced with comment-id',
                            likes: 'likes',
                            dislikes: 'dislikes',
                            comment: 'comment made by user',
                            commenter: 'username of user who made the comment',
                            aReplyTo: 'null or id of another comment to which it is replied',
                        },
                    ],
                }
            },
        };
    }

    getAll(commentId) { }

}


export default class Comment {
    constructor(topicId, subTopicId) {
        this.allComments = new AllComments();
        this.newComment = new NewComment();
        this.commentReaction = new CommentReaction();
    }

    getAllComments() { }

    replyToComment(commentId, reply) { }

    like(commentId) { }

    dislike(commentId) { }

    newComment(topicId, subTopicId, comment) { }
}