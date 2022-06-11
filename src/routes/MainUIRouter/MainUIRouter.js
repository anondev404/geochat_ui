import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MainUI from 'routes/MainUI/MainUI.js';

import SignIn from 'routes/SignIn/SignIn.js';
import SignUp from 'routes/SignUp/SignUp.js';

import Topic from 'routes/Topic/Topic.js';
import SubTopic from 'routes/SubTopic/SubTopic.js';
import SubTopicDisplay from 'routes/SubTopicDisplay/SubTopicDisplay.js';


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