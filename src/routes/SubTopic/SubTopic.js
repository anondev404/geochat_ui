import React, { useEffect } from 'react';

import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import SubTopicComponent from './SubTopicComponent.js';


function SubTopic(props) {
    let nav = useNavigate();
    let searchParams = useSearchParams();


    let loc = useLocation();
    useEffect(() => {
        console.log(loc);
        //let a, b;
        //[a, b] = searchParams;
        //console.log(searchParams);
    }, [searchParams, loc]);

    return (
        <SubTopicComponent {...props} nav={nav} searchParams={searchParams} />
    );
}

export default SubTopic;