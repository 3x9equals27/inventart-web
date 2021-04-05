import React, { useEffect, useState } from 'react';
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import { config } from '../../config';
import styles from './ShowModel.module.css';
const queryString = require('query-string');

//https://inventart-api.azurewebsites.net/nxz/gargo.nxz
//https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz
//https://res.cloudinary.com/inventart/raw/upload/v1617566207/3DHOP/luso_ffy1la.nxz
//https://res.cloudinary.com/inventart/image/upload/v1617566316/3DHOP/laurana_sh9bnm.ply
//https://res.cloudinary.com/inventart/image/upload/v1617566352/3DHOP/gargo_wqujve.ply

const ShowModel = () => {
    const qs = queryString.parse(window.location.search);
    //qs.model
    const url = 'https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz'; 


    return <div className={styles.iframeContainer}>
        <iframe src={`${config.hopSource}/3DHOP_single.html?url=${url}`}>
        </iframe>
    </div>;
};

export default ShowModel;
