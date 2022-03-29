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
            <img id="lighting" title="Lighting" src="3DHOP/skins/dark/lighting.png" className={styles.embeddedLightingButton} onClick={(e)=>lightningSwitchImage(e,idx)} alt=""/>
            <img id="light" title="Light" src="3DHOP/skins/dark/light.png" className={styles.embeddedLightButton} onClick={(e)=>lightSwitchImage(e,idx)} alt=""/>
            <img id="perspective" title="Perspective" src="3DHOP/skins/dark/perspective.png" className={styles.embeddedPerspectiveButton} onClick={(e)=>perspectiveSwitchImage(e,idx)} alt=""/>
            <img id="color" title="Color" src="3DHOP/skins/dark/color.png" className={styles.embeddedColorButton} onClick={(e)=>colorSwitchImage(e,idx)} alt=""/>
            {/* <img id="measure" title="Measure" src="3DHOP/skins/dark/measure.png" className={styles.embeddedMeasureButton} onClick={(e)=>measureSwitchImage(e,idx)} alt=""/>
            <img id="pick" title="Pick" src="3DHOP/skins/dark/pick.png" className={styles.embeddedPickButton} onClick={(e)=>pickSwitchImage(e,idx)} alt=""/> */}
            <img id="screenshot" title="Screenshot" src="3DHOP/skins/dark/screenshot.png" className={styles.embeddedScreenshotButton} onClick={(e)=>screenshotSwitchImage(e,idx)} alt=""/>
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
function lightningSwitchImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goLightningSwitch(idx);
}
function lightSwitchImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goLightSwitch(idx);
}
function perspectiveSwitchImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goPerspectiveSwitch(idx);
}

function colorSwitchImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goColorSwitch(idx);
}
function measureSwitchImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goMeasureSwitch(idx);
}
function pickSwitchImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goPickSwitch(idx);
}
function screenshotSwitchImage(event: React.MouseEvent<HTMLImageElement>, idx: number):void {
    goScreenshotSwitch(idx);
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
function goLightningSwitch(idx: number){
    presenterArray[idx].enableSceneLighting(!presenterArray[idx].isSceneLightingEnabled()); 
}
function goLightSwitch(idx: number){
    presenterArray[idx].enableLightTrackball(!presenterArray[idx].isLightTrackballEnabled());
}
function goPerspectiveSwitch(idx: number){
    presenterArray[idx].toggleCameraType();
}
function goColorSwitch(idx: number){
    presenterArray[idx].toggleInstanceSolidColor(256, true);
}
function goMeasureSwitch(idx: number){
    presenterArray[idx].enableMeasurementTool(!presenterArray[idx].isMeasurementToolEnabled());
}
function goPickSwitch(idx: number){
    presenterArray[idx].enablePickpointMode(!presenterArray[idx].isPickpointModeEnabled());
}
function goScreenshotSwitch(idx: number){
    presenterArray[idx].saveScreenshot();
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
