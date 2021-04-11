import ModelViewer from '../../components/ModelViewer/ModelViewer';
import { config } from '../../config';
import styles from './ShowModel.module.css';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
const queryString = require('query-string');

//https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz
//https://res.cloudinary.com/inventart/raw/upload/v1617566207/3DHOP/luso_ffy1la.nxz
//https://res.cloudinary.com/inventart/image/upload/v1617566316/3DHOP/laurana_sh9bnm.ply
//https://res.cloudinary.com/inventart/image/upload/v1617566352/3DHOP/gargo_wqujve.ply

const ShowModel = () => {
    const qs = queryString.parse(window.location.search);
    const { getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        (async () => {
            const accessToken = await getAccessTokenSilently();
            setToken(accessToken);
        })();
    }, [getAccessTokenSilently]);
    
    return ( !token ? <></> :
    <div className={styles.mainBody}>
        <div className={styles.modelViewer}>
            <Loading condition={() => promisseModelViewer(qs.model, token)} />
        </div>
    </div>);
};

export default ShowModel;


const promisseModelViewer = async(fileGuid:string, token: string):Promise<JSX.Element> => {
    return axios.get(`${config.apiRoot}/File/link/${fileGuid}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async res => { 
        return <ModelViewer idx={1} url={res.data} showEmbeddedButtons={true} />
    });
}

  //0e1249c3-aa30-4477-855e-660200669047