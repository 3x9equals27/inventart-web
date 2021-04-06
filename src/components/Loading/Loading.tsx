import { CircularProgress, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { LoadingInterface } from './Loading.interface';
import styles from './Loading.module.css';

export const Loading: React.FC<LoadingInterface> = ({
    condition,
    loader = <LinearProgress />
  }) => {
    const [result, setResult] = useState<JSX.Element>();

    useEffect(() => {
        condition().then((value) => {
            setResult(value);
        }).catch((reason)=>{
            console.warn(reason);
            setResult(<div>Loading Error!!!</div>);
        });
      }, [condition]);

    if(result){
        return <>{result}</>;
    }

    return <>{loader}</>;
};

export default Loading;
