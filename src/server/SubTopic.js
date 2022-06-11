class NewSubTopic {

    constructor() {
        this.config = {
            request: {
                method: 'PUT',
                url: '/subTopic',
                body: function (topicId, subTopicTitle, subTopicDescription) {
                    let style = {
                        topicId: topicId,
                        subTopicTitle: subTopicTitle,
                        subTopicDescription: subTopicDescription,
                    }
                    return style;
                },
            },
        }
    }

    create(topicId, subTopicTitle, subTopicDescription) { }
}

class SubTopicDetails {

    constructor() {
        this.config = {
            request: {
                method: 'GET',
                url: '/subTopic/description',
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
                    details:
                    {
                        topicId: 'To be replaced with topic-id',
                        subTopicId: 'to be replaced with sub-topic-id',
                        subTopicDescription: 'to be replaced with sub-topic-description',
                    },
                },
            },
        };
    }

    getDetails(topicId, subTopicId) { }
}

class AllSubTopics {

    constructor() {
        let config = {
            request: {
                method: 'GET',
                url: '/subTopic',
                body: function (topicId) {
                    let style = {
                        topicId: topicId,
                    };
                }
            },
            response: {
                style: {
                    topicId: 'To be replaced with topic-id',
                    allSubTopics: [
                        {
                            date: 'date of creation',
                            createdBy: 'username of creater',
                            topicId: 'To be replaced with topic-id',
                            subTopicid: 'to be replaced with sub-topic-id',
                            subTopicTitle: 'to be replaced with sub-topic-title',
                        },
                    ],
                },
            },
        };
    }

    getAll(topicId) { }
}

export default class SubTopic {

    constructor(topicId) {
        this.topicId = topicId;
        this.newSubTopic = new NewSubTopic();
        this.subTopicDetails = new SubTopicDetails();
        this.allSubTopics = new AllSubTopics();
    }

    getDetails(subTopicId) { }

    getAllSubTopics() { }

    addNew({ topicId, subTopicTitle, subTopicDescription }) { }
}