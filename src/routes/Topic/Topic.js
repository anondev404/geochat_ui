import React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import TopicComponent from './TopicComponent.js';

function Topic(props) {
    let nav = useNavigate();
    let searchParams = useSearchParams();

    /*let loc = useLocation();

    useEffect(() => {
        console.log('searchParams');
        let a, b;
        [a, b] = searchParams;
        console.log(searchParams);
        console.log(Object.keys(a));
    }, [searchParams]);*/

    return (
        <TopicComponent {...props} nav={nav} />
    );
}

export default Topic;