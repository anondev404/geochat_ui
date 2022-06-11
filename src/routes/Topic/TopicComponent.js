import React from 'react';

import { createSearchParams } from 'react-router-dom';

import ListComponent from '../../components/ListComponent/ListComponent.js';

import axios from 'axios';
import produce from 'immer';


class TopicComponentEventManager {
    static onListItemClick(event) {
        event.stopPropagation();
        let topicId = event.target.getAttribute('id');
        console.log(`topic id: ${event.detail.title}`);
        this.props.nav({
            pathname: '/topic/subTopic',
            search: `?${createSearchParams({ topicId: topicId }).toString()}`,
        }, { state: { topicTitle: event.detail.title, } });
    }
}

export default class TopicComponent extends React.Component {



    constructor(props) {
        super(props);

        this.listComponent = null;

        this.state = {
            data: [],
        }
    }

    componentDidMount() {

        this.fetchAllTopics();
    }

    componentDidUpdate() {

        this.listComponent.addEventListener('listItemClick', TopicComponentEventManager.onListItemClick.bind(this));
    }

    componentWillUnmount() {
        this.listComponent.removeEventListener('listItemClick', TopicComponentEventManager.onListItemClick.bind(this));
    }

    fetchAllTopics() {
        /*let topics = {
            allTopics: [
                {
                    topicId: 'topicItem1',
                    topicTitle: 'Sports'
                },
            ],
        };*/

        axios.get(`/fetch/topic`, {
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
                    console.log(this.state);
                }
            }
        });

        return this.state.data;
    }

    prepareListCompnentPayload(allTopics) {
        let payLoad = {
            paramRep: {
                id: 'topic_id',
                title: 'topic_title',
            },
            items: allTopics,
        };

        return payLoad;
    }

    listCompRefSetter(compRef) {
        this.listComponent = compRef;
    }

    render() {
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

