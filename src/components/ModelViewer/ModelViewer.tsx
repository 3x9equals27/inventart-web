import { useEffect } from 'react';
import { config } from '../../config';
import { ModelViewerInterface } from './ModelViewer.interface';

//https://inventart-api.azurewebsites.net/nxz/gargo.nxz
//https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz
//https://res.cloudinary.com/inventart/raw/upload/v1617566207/3DHOP/luso_ffy1la.nxz
//https://res.cloudinary.com/inventart/image/upload/v1617566316/3DHOP/laurana_sh9bnm.ply
//https://res.cloudinary.com/inventart/image/upload/v1617566352/3DHOP/gargo_wqujve.ply

export const ModelViewer: React.FC<ModelViewerInterface> = ({
    idx,
    url
  }) => {
      // @ts-ignore
    console.warn('model viewer idx', idx);
    

    useEffect(() => {
        init3DHOP();
        loadModel(idx,url);
    }, [idx,url]);

    return (<div style={{height:'100%', width:'100%'}}>
        {hopDiv(idx)}
    </div>);
};

export default ModelViewer;

function init3DHOP() {
    // @ts-ignore
    window.init3dhop();
};

function loadModel(idx: number, url: string) {
    // @ts-ignore
	window.presenter = new window.Presenter("draw-canvas");

    // @ts-ignore
	window.presenter.setScene({
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

// @ts-ignore 
// eslint-disable-next-line
window.actionsToolbar = function(action) { // @ts-ignore
	if(action==='home') window.presenter.resetTrackball(); // @ts-ignore
    else if(action==='zoomin') window.presenter.zoomIn(); // @ts-ignore
	else if(action==='zoomout') window.presenter.zoomOut(); // @ts-ignore
	else if(action==='light' || action==='light_on') { window.presenter.enableLightTrackball(!window.presenter.isLightTrackballEnabled()); lightSwitch(); } // @ts-ignore
	else if(action==='full'  || action==='full_on') fullscreenSwitch(); // @ts-ignore
}

const hopDiv = (idx: number) => {
    const source:string = config.hopSource;
    return (<div id="3dhop" className="tdhop">
        <div id="tdhlg"></div>
        <div id="toolbar">
            <img id="home"     title="Home"                  src={`${source}/skins/dark/home.png`}            alt="" /><br/>
            <img id="zoomin"   title="Zoom In"               src={`${source}/skins/dark/zoomin.png`}          alt="" /><br/>
            <img id="zoomout"  title="Zoom Out"              src={`${source}/skins/dark/zoomout.png`}         alt="" /><br/>
            <img id="light_on" title="Disable Light Control" src={`${source}/skins/dark/lightcontrol_on.png`} alt="" style={{position:'absolute', visibility:'hidden'}}/>
            <img id="light"    title="Enable Light Control"  src={`${source}/skins/dark/lightcontrol.png`}    alt="" /><br/>
            <img id="full_on"  title="Exit Full Screen"      src={`${source}/skins/dark/full_on.png`}         alt="" style={{position:'absolute', visibility:'hidden'}}/>
            <img id="full"     title="Full Screen"           src={`${source}/skins/dark/full.png`}            alt="" />
        </div>
        <canvas id="draw-canvas" style={{backgroundImage: `url("${source}/skins/backgrounds/light.jpg")`}}/>
    </div>);
};
