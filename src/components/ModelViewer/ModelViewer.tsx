import React, { useEffect } from 'react';
import { config } from '../../config';
import { ModelViewerInterface } from './ModelViewer.interface';
import styles from './ModelViewer.module.css';

let presenterArray: any = {};

export const ModelViewer: React.FC<ModelViewerInterface> = ({
    idx,
    url,
    showEmbeddedButtons
  }) => {
    useEffect(() => {
        if(idx >= 0 && url.length > 0){
            loadModel(idx,url);
        }
    }, [idx,url]);

    let render_height:number = window.screen.height;
    let render_width:number = window.screen.width;

    return (
    <div>
       {/* {showEmbeddedButtons ? <>
        <button onClick={(e)=>resetButton(e,idx)}>reset</button>
        <button onClick={(e)=>fullScreenButton(e, idx)}>fullscreen</button>
        </> : <></>} */}
        <div className={styles.canvasContainer} >
            {drawEmbeddedButtons(showEmbeddedButtons, idx)}
            <canvas id={canvasId(idx)} className={styles.drawCanvas} height={render_height} width={render_width} style={{backgroundImage: `url("${config.hopSource}/skins/backgrounds/light.jpg")`}}/>
        </div>
    </div>
    );
};

export default ModelViewer;

function drawEmbeddedButtons(showEmbeddedButtons: boolean, idx: number) {
    if(showEmbeddedButtons){
        return <>
            <img id="full" title="Full Screen" src="3DHOP/skins/dark/full.png" className={styles.embeddedFullScreenButton} onClick={(e)=>fullScreenImage(e,idx)} alt=""/>
            <img id="home" title="Home" src="3DHOP/skins/dark/home.png" className={styles.embeddedHomeButton} onClick={(e)=>resetImage(e,idx)} alt=""/>
        </>;
    }

    return <></>
} 

const canvasId = (idx:number):string => `draw-canvas-${idx}`;

// function resetButton(event: React.MouseEvent<HTMLButtonElement>, idx: number):void {
//     goHome(idx);
// }
// function fullScreenButton(event: React.MouseEvent<HTMLButtonElement>, idx: number):void {
//     goFullScreen(idx);
// }
function resetImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goHome(idx);
}
function fullScreenImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goFullScreen(idx);
}

function goFullScreen(idx: number){
    // @ts-ignore
    document.getElementById(canvasId(idx)).height = window.screen.height;// @ts-ignore
    document.getElementById(canvasId(idx)).width = window.screen.width;// @ts-ignore
    document.getElementById(canvasId(idx))?.parentElement.requestFullscreen();

    presenterArray[idx].ui.postDrawEvent();
}
function goHome(idx: number){
    presenterArray[idx].resetTrackball();
}

function loadModel(idx: number, url: string) {
    
    // @ts-ignore
    presenterArray[idx] = new window.Presenter(canvasId(idx));

    // @ts-ignore
    presenterArray[idx].setScene({
        meshes: {
            "mesh_1" : { url: url }
        },
        modelInstances : {
            "model_1" : { mesh : "mesh_1" }
        },
        trackball: {
            // @ts-ignore
            type : TurnTableTrackball,
            trackOptions : {
                startPhi: 35.0,
                startTheta: 15.0,
                startDistance: 2.5,
                minMaxPhi: [-180, 180],
                minMaxTheta: [-30.0, 70.0],
                minMaxDist: [0.5, 3.0]
            }
        }
    });
};
