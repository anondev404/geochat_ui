export default class Topic {

    constructor() {
        let config = {
            request: {
                method: 'GET',
                url: '/topic',
                body: function () {
                    let style = {};

                    return style;
                },
            },
            response: {
                style: {
                    allTopics: [
                        {
                            topicId: 'To be replaced with topic-id',
                            topicTitle: 'to be replaced with topic-title',
                        },
                    ],
                },
            },
        };
    }

    getAllTopics() { }
}