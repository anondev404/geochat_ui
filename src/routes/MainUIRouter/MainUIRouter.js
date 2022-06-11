import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MainUI from '../MainUI/MainUI.js';

import SignIn from '../SignIn/SignIn.js';
import SignUp from '../SignUp/SignUp.js';

import Topic from '../Topic/Topic.js';
import SubTopic from '../SubTopic/SubTopic.js';
import SubTopicDisplay from '../SubTopicDisplay/SubTopicDisplay.js';


export default function MainUIRouter() {

    let route = (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route element={<MainUI />}>
                    <Route path='/topic' element={<Topic />} />
                    <Route path="/topic/subTopic" element={<SubTopic />} />
                    <Route path="/topic/subTopic/subTopicDisplay" element={<SubTopicDisplay />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

    return route;
}