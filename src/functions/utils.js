import { cameraBase } from "./constants.js";
let focused = false;

function zoomPlanet(data) {
    if(focused) return;
    focused = true;
    const camera = data.camera;
    const initial = camera.position;
    let landa = 1;
    const myInterval = setInterval(() => {
        landa -= 0.00001;
        const cords = rectaCords(initial, landa, false);
        camera.position.x = cords[0];
        camera.position.y = cords[1];
        camera.position.z = cords[2];
        if(cords[3] === true || focused === false) clearInterval(myInterval);
    }, 1)
};
function rectaCords(initial, landa, up) {
    let issue = false;
    let x = initial.x*landa;
    let y = initial.y*landa;
    let z = initial.z*landa;
    let i = Math.sqrt( (x)**2 + (y)**2 + (z)**2 )
    if( (i < 2 && !up) || (i > Math.sqrt( cameraBase[0]**2 + cameraBase[1]**2 + cameraBase[2]**2 ) && up)) issue = true;
    return [x, y, z, issue];
}

function unzoom(camera) {
    focused = false;
    let landa = 1;
    const initial = camera.position;
    const myInterval = setInterval(() => {
        landa += 0.00001;
        const cords = rectaCords(initial, landa, true);
        camera.position.x = cords[0];
        camera.position.y = cords[1];
        camera.position.z = cords[2];
        if(cords[3] === true || focused === true) clearInterval(myInterval);
    }, 1)
}

export { zoomPlanet, unzoom };