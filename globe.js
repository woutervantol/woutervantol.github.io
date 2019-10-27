var RADIUS = 10;
var mouse = {x:0, y:0}

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
var container = document.getElementById("earthcontainer")//het ding waar de aarde op gerendered wordt. 
//Hierdoor roteerd de aarde niet wanneer je met de muis op een andere division iets doet zoals aan de schuifknop schuiven

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
//document.body.appendChild(renderer.domElement);
container.appendChild(renderer.domElement);

var geometry = new THREE.SphereBufferGeometry(RADIUS, 64, 64);//de sphere met 64 folds in beide richtingen
var world = new THREE.TextureLoader().load('images/world.jpg');//de 8k texture (was mij beloofd iig)
var texture = new THREE.TextureLoader().load('images/worldtexture.jpg');//intensiteit representeerd hier hoogteverschil, dat wordt dmv lichtval gesimuleerd
var material = new THREE.MeshPhongMaterial({map:world});
material.bumpMap = texture;
var sphere = new THREE.Mesh(geometry, material);

var group = new THREE.Group();//alle meteorieten worden aan deze groep toegevoegd zodat ze samen geroteerd kunnen worden



container.addEventListener("mousedown", onMouseDown, false);
container.addEventListener("wheel", onMouseWheel, false);

function onMouseDown(event){
    container.addEventListener("mouseup", onMouseUp, false);
    container.addEventListener("mousemove", onMouseMove, false);

    mouse.x = event.clientX;
    mouse.y = event.clientY;
}
function onMouseUp(event){
    container.removeEventListener("mousemove", onMouseMove, false);
    container.removeEventListener("mouseup", onMouseUp, false);
}
function onMouseMove(event){
    //rotatie van muisbeweging hangt af van hoe ver je bent ingezoomd
    //De -10 komt van het feit dat de maximale z positie van de camera 11 is. (empirisch geconstateerd)
    group.rotation.x += (event.clientY-mouse.y)/3000*(camera.position.z-10)
    group.rotation.y += (event.clientX-mouse.x)/3000*(camera.position.z-10)

    mouse.x = event.clientX
    mouse.y = event.clientY
}
function onMouseWheel(event){
    if (camera.position.z >= 11){
        camera.position.z += event.deltaY/20.;
    } else{
        camera.position.z = 11;
    }
    if (camera.position.z <= 50){
        camera.position.z += event.deltaY/20.;
    } else{
        camera.position.z = 50;
    }
    
}


//dataverwerking
var oReq = new XMLHttpRequest();
oReq.onreadystatechange = function(){
    var data = JSON.parse(this.responseText);
    for (var i of data){
        addPoint(i.reclat, i.reclong, i.mass);
    }
}
oReq.open("GET", "data/testData2.json", true);
oReq.send();



group.add(sphere);
//group.add(addPoint(52, 5, 10));


scene.add(group);
scene.add(new THREE.AmbientLight(0x111111));
var light = new THREE.PointLight(0xffffff);
light.position.x = 20;
light.position.y = 20;
light.position.z = 30;
//de camera is in de z richting dus dit komt van 

scene.add(light);


camera.position.z = 20;


function animate(){
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

function addPoint(lat, lon, mass){
    var pointGeometry = new THREE.CylinderBufferGeometry(0.04, 0.04, Math.log(mass)/2, 4);//(radius top, radius bottom, length, number of edges)
    var point = new THREE.Mesh(pointGeometry, new THREE.MeshPhongMaterial());
    var theta = (90-lat)/180.* Math.PI;
    var phi = -lon/360.* Math.PI*2.;

    point.position.x = RADIUS*Math.sin(theta)*Math.cos(phi);
    point.position.z = RADIUS*Math.sin(theta)*Math.sin(phi);
    point.position.y = RADIUS*Math.cos(theta);

    var vec3 = new THREE.Vector3(point.position.z, 0, -point.position.x).normalize();
    point.rotateOnAxis(vec3, theta);

    group.add(point);
    
}


animate();