var RADIUS = 10;
var mouse = {x:0, y:0}, mouseBegin = {x:0, y:0};

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereBufferGeometry(RADIUS, 64, 64);
var world = new THREE.TextureLoader().load('world.jpg');
var texture = new THREE.TextureLoader().load('worldtexture.jpg');
var material = new THREE.MeshPhongMaterial({map:world});
material.bumpMap = texture;
var sphere = new THREE.Mesh(geometry, material);

var group = new THREE.Group();


window.addEventListener("mousedown", onMouseDown, false);



function onMouseDown(event){
    window.addEventListener("mouseup", onMouseUp, false);
    window.addEventListener("mousemove", onMouseMove, false);

    mouseBegin.x = event.clientX;
    mouseBegin.y = event.clientY;

    console.log(mouseBegin.x, mouseBegin.y);
}

function onMouseUp(event){
    window.removeEventListener("mousemove", onMouseMove, false);
    window.removeEventListener("mouseup", onMouseUp, false);
    console.log("testup");
}

function onMouseMove(event){
    group.rotation.y += (event.clientX-mouseBegin.x)/1000
    group.rotation.x += (event.clientY-mouseBegin.y)/1000
    console.log("testmove");
}


//get data
var oReq = new XMLHttpRequest();
oReq.onreadystatechange = function(){
    var data = JSON.parse(this.responseText);
    for (var i of data){
        addPoint(i.reclat, i.reclong, i.mass);
    }
}
oReq.open("GET", "testData2.json", true);
oReq.send();





group.add(sphere)
group.add(addPoint(52, 5, 10))

// for (var i = -180; i < 180; i += 8){
//     for (var j = -90; j < 90; j += 8){
//         group.add(addPoint(j, i, 100000000))
//     }
// }
scene.add(group);


scene.add(new THREE.AmbientLight(0x111111));
var light = new THREE.PointLight(0xffffff);
light.position.x = 20;
light.position.y = 20;
light.position.z = 30;


scene.add(light);


// group.rotation.x = 1
camera.position.z = 20;


function animate(){
    requestAnimationFrame(animate);

    //group.rotation.y -= 0.01
    
    renderer.render(scene, camera);
}

function addPoint(lat, lon, mass){
    var pointGeometry = new THREE.CylinderBufferGeometry(0.04, 0.04, Math.log(mass)/2, 32);//(radius top, radius bottom, length, number of edges)
    var point = new THREE.Mesh(pointGeometry, new THREE.MeshPhongMaterial());
    var theta = (90-lat)/180.* Math.PI;
    var phi = -lon/360.* Math.PI*2.;

    point.position.x = RADIUS*Math.sin(theta)*Math.cos(phi);
    point.position.z = RADIUS*Math.sin(theta)*Math.sin(phi);
    point.position.y = RADIUS*Math.cos(theta);

    var vec3 = new THREE.Vector3(point.position.z, 0, -point.position.x).normalize()
    point.rotateOnAxis(vec3, theta)

    group.add(point)
    
}




animate();
