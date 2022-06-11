import React from 'react';

import 'assets/css/list_component/list_component.css';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.itemId,
            title: props.title,
        };
        this.ref = React.createRef();
    }

    listItemClickEvent() {
        let listItem = this.ref.current;
        let event = new CustomEvent('listItemClick', {
            bubbles: true,
            cancelable: false,
            detail: { ...this.state },
        });
        listItem.dispatchEvent(event);
    }

    getListItem() {
        let listItem = (
            <div
                className="item mb-1"
                id={this.state.id}
                ref={this.ref}
                onClick={this.listItemClickEvent.bind(this)}>
                <div className="card">
                    <div className="card-body p-2">
                        <p className="card-title">
                            {this.state.title}
                        </p>
                    </div>
                </div>
            </div>
        );

        return listItem;
    }

    render() {
        return this.getListItem();
    }

}

export default class ListComponent extends React.Component {

    constructor(props) {
        super(props);

        /*{
            paramRep: {
                id: 'itemId',
                title: 'itemTitle',
            },
            items: [
                {
                    itemId: 'itemId',
                    itemTitle: 'itemTitle',
                }
            ]
        }*/

        this.state = {
            payLoad: props.payLoad,
        };
    }

    get payLoad() {
        return this.state.payLoad;
    }

    get paramRep() {
        return this.payLoad.paramRep;
    }

    get payLoadItems() {
        return this.payLoad.items;
    }

    getPayloadItemIdForItem(item) {
        return item[this.paramRep.id];
    }

    getPayloadItemTitleForItem(item) {
        return item[this.paramRep.title];
    }

    createListItemsComponents() {
        let listItemsComponents = [];
        let payLoadItems = this.payLoadItems;
        payLoadItems.forEach((item) => {
            let itemId = this.getPayloadItemIdForItem(item);
            let title = this.getPayloadItemTitleForItem(item);
            listItemsComponents.push(
                <ListItem itemId={itemId} title={title} key={itemId} />
            );
        });
        return listItemsComponents;
    }

    listComponet() {
        let listComponent = (
            <div className="list-component" ref={this.props.refSetter}>
                <div className="list p-1">
                    {this.createListItemsComponents()}
                    <div className="2-blank-lines"><br /><br /></div>
                </div>
            </div>
        );

        return listComponent;
    }

    render() {
        let listComponent = this.listComponet();
        return listComponent;
    }

}