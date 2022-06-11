import React from 'react';

import { useNavigate } from 'react-router-dom';

import LeftWindowComponent from './LeftWindowComponent.js'


export default function LeftWindow(props) {
    let nav = useNavigate();

    return (
        <LeftWindowComponent nav={nav} />
    );
}