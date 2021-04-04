import { useEffect } from 'react';
import { config } from '../../config';
const queryString = require('query-string');

const ShowModel = () => {

    useEffect(() => {
        const qs = queryString.parse(window.location.search);
        init3DHOP();
        loadModel(qs.model);
    }, []);

    return (<div style={{minHeight:'500px', maxHeight:'600px', width:'100%'}}>
        {hopDiv()}
    </div>);
};

export default ShowModel;

function init3DHOP() {
    // @ts-ignore
    init3dhop();
};

function loadModel(model: string) {
    // @ts-ignore
	window.presenter = new Presenter("draw-canvas");

    // @ts-ignore
	window.presenter.setScene({
        meshes: {
            //"mesh_1" : { url: `${config.hopModels}/${model}` }
            "mesh_1" : { url: 'https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz' }
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
	if(action==='home') presenter.resetTrackball(); // @ts-ignore
    else if(action==='zoomin') presenter.zoomIn(); // @ts-ignore
	else if(action==='zoomout') presenter.zoomOut(); // @ts-ignore
	else if(action==='light' || action==='light_on') { presenter.enableLightTrackball(!presenter.isLightTrackballEnabled()); lightSwitch(); } // @ts-ignore
	else if(action==='full'  || action==='full_on') fullscreenSwitch(); // @ts-ignore
}

const hopDiv = () => {
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

