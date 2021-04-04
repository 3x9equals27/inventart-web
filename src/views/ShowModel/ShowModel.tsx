import React, { useEffect, useState } from 'react';
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import { config } from '../../config';
const queryString = require('query-string');

//https://inventart-api.azurewebsites.net/nxz/gargo.nxz
//https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz
//https://res.cloudinary.com/inventart/raw/upload/v1617566207/3DHOP/luso_ffy1la.nxz
//https://res.cloudinary.com/inventart/image/upload/v1617566316/3DHOP/laurana_sh9bnm.ply
//https://res.cloudinary.com/inventart/image/upload/v1617566352/3DHOP/gargo_wqujve.ply

const ShowModel = () => {
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        const qs = queryString.parse(window.location.search);
        //qs.model
        setReady(true);
    }, []);

    return (!ready ? null :
        <div>
            <div style={{height:'300px', width:'100%'}}>
                <ModelViewer idx = {1} url={'https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz'}/>
            </div>
            {/* <div style={{height:'300px', width:'100%'}}>
                <ModelViewer idx = {2} url={'https://res.cloudinary.com/inventart/raw/upload/v1617566207/3DHOP/luso_ffy1la.nxz'}/>
            </div> */}
        </div>
    );
};

export default ShowModel;
