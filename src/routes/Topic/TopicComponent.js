import React from 'react';

import { createSearchParams } from 'react-router-dom';

import ListComponent from 'components/ListComponent/ListComponent.js';
import axios from 'axios';
import serverConfig from './../../server/config/config';


class TopicComponentEventManager {
    static onListItemClick(event) {
        event.stopPropagation();
        let topicId = event.target.getAttribute('id');
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
        this.state = {}
    }

    componentDidMount() {
        this.listComponent.addEventListener('listItemClick', TopicComponentEventManager.onListItemClick.bind(this));
    }

    componentWillUnmount() {
        this.listComponent.removeEventListener('listItemClick', TopicComponentEventManager.onListItemClick.bind(this));
    }

    fetchAllTopics() {
        let topics = {
            allTopics: [
                {
                    topicId: 'topicItem1',
                    topicTitle: 'Sports'
                },
            ],
        };
        /**
         * headers: {
                        mode: 'cors',
                        credential: 'include'
                    }
         */

        axios.get(`/fetch/topic`, {
            withCredentials: true
        }).then((res) => {
            //this.setState(res.data);

            console.log(res);

            const data = res.data;

            if (data.isFetched) {
                console.log(data.data);
            } else {
                console.log(data.message);
            }
        });

        return topics.allTopics;
    }

    prepareListCompnentPayload(allTopics) {
        let payLoad = {
            paramRep: {
                id: 'topicId',
                title: 'topicTitle',
            },
            items: allTopics,
        };

        return payLoad;
    }

    listCompRefSetter(compRef) {
        this.listComponent = compRef;
    }

    render() {
        let payLoad = this.prepareListCompnentPayload(this.fetchAllTopics());
        return (
            <ListComponent
                payLoad={payLoad}
                refSetter={this.listCompRefSetter.bind(this)} />
        );
    }

}

