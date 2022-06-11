import React, { useState } from 'react';

let GeoChatRouteDataContext = React.createContext();

/*
function geoChatRouteDataReducer(state) {
    return state;
}*/

export default function GeoChatRouteData(props) {
    const [state, setRouterDataState] = useState({
        topic: '',
        subTopic: '',
        subTopicDescription: '',
    });

    return (
        <GeoChatRouteDataContext.Provider value={setRouterDataState}>

        </GeoChatRouteDataContext.Provider>
    );
}