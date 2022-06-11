import axios from 'axios';
import React from 'react';

import { createSearchParams } from 'react-router-dom';

import ListComponent from '../../components/ListComponent/ListComponent.js';

/*
class FakeData {

    static topicId1() {
        let subTopics = {
            topicId: `topicId1`,
            allSubTopics: [
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem1',
                    subTopicTitle: `Let's talk Cricket! Tests, ODI, Domestic, Squad Selections and everything you can think to say about cricket.`,
                },
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem2',
                    subTopicTitle: `join discussions from the world of football`,
                },
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem3',
                    subTopicTitle: 'olympics fans',
                },
            ],
        };

        return subTopics;
    }

    static topicId2() {
        let subTopics = {
            topicId: `topicId2`,
            allSubTopics: [
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem1',
                    subTopicTitle: `General Fiction`,
                },
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem2',
                    subTopicTitle: `Horror`,
                },
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem3',
                    subTopicTitle: 'Crime/ Mystery/Thriller',
                },
            ],
        };

        return subTopics;
    }

    static topicId3() {
        let subTopics = {
            topicId: `topicId3`,
            allSubTopics: [
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem1',
                    subTopicTitle: 'How is the experience of travelling solo?'
                },
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem2',
                    subTopicTitle: 'Road Trips: There are many excellent and informative road trip reports posted on this forum. ',
                },
                {
                    date: 'date of creation',
                    createdBy: 'username of creater',
                    topicId: 'To be replaced with topic-id',
                    subTopicid: 'subtopicItem3',
                    subTopicTitle: 'Outdoors / Adventure Travel',
                },
            ],
        };

        return subTopics;
    }


    static topicId4() {
        let subTopics = {
            topicId: `topicId4`,
            allSubTopics: [
                {
                    subTopicid: 'subtopicItem1',
                    subTopicTitle: `Humor: Post jokes, funny stories, humorous experiences, whatever stokes your funny bone`,
                },
            ],
        };

        return subTopics;
    }

    static getSubTopic(topicId) {
        switch (topicId) {
            case `topicItem1`:
                return FakeData.topicId1();
            case `topicItem2`:
                return FakeData.topicId2();
            case `topicItem3`:
                return FakeData.topicId3();
            case `topicItem4`:
                return FakeData.topicId4();
            default:
        }
    }
}*/

class SubTopicComponentEventManager {
    static onListItemClick(event) {
        event.stopPropagation();
        let topicId = this.topicId;

        let subTopicId = event.target.getAttribute('id');

        this.props.nav({
            pathname: '/topic/subTopic/subTopicDisplay',
            search: `?${createSearchParams({ topicId: topicId, subTopicId: subTopicId }).toString()}`,
        }, { state: { subTopicTitle: event.detail.title, description: event.detail.description } });
    }
}

export default class SubTopicComponent extends React.Component {

    constructor(props) {
        super(props);
        [this.searchParams, this.setSearchParams] = props.searchParams;

        this.state = {
            topicId: this.searchParams.get('topicId'),
            data: [],
        };

        this.listComponent = null;
    }

    componentDidMount() {
        console.log('mounting');

        this.fetchAllSubTopics();
    }

    componentDidUpdate() {
        console.log('updating');
        //console.log(this.state)

        this.listComponent.addEventListener('listItemClick', SubTopicComponentEventManager.onListItemClick.bind(this));
    }

    componentWillUnmount() {
        this.listComponent.removeEventListener('listItemClick', SubTopicComponentEventManager.onListItemClick.bind(this));
    }

    fetchAllSubTopics() {
        console.log('fetching...');
        //TODO: change to original fetch source
        //let subTopics = FakeData.getSubTopic(this.topicId);


        axios.post(`/fetch/subTopic`, {
            "topic_id": this.topicId
        }, {
            withCredentials: true
        }).then((res) => {

            const serverRes = res.data;

            const data = serverRes.data;

            console.log(this.state);

            if (serverRes.isFetched) {
                if (this.state.data.length === 0) {
                    this.setState({
                        data: data
                    });

                    //console.log(this.state);
                }
            }
        });

        return this.state.data;
        //return subTopics.allSubTopics;
    }

    get topicId() {
        return this.state.topicId;
    }

    prepareListCompnentPayload(allSubTopics) {
        let payLoad = {
            //paramRep says how should list compnent identify id and title of a list item 
            //in a list item list from given json data in items
            paramRep: {
                id: 'sub_topic_id',
                title: 'sub_topic_title',
                description: 'sub_topic_description'
            },
            items: allSubTopics,
        };


        return payLoad;

    }

    listCompRefSetter(compRef) {
        this.listComponent = compRef;
    }

    render() {
        // console.log('render');
        // console.log(this.state.data);
        let payLoad = this.prepareListCompnentPayload(this.state.data);
        return (
            <ListComponent
                payLoad={payLoad}
                refSetter={this.listCompRefSetter.bind(this)}
                key={new Date().getTime()}
            />
        );
    }

}
