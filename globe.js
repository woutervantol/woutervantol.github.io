var RADIUS = 10

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
//var controls = new THREE.OrbitControls(camera, renderer.domElement);

var geometry = new THREE.SphereBufferGeometry(RADIUS, 64, 64);
var world = new THREE.TextureLoader().load('world.jpg');
var texture = new THREE.TextureLoader().load('worldtexture.jpg');
var material = new THREE.MeshPhongMaterial({map:world});
material.bumpMap = texture;
var sphere = new THREE.Mesh(geometry, material);


var group = new THREE.Group();
group.add(sphere)
group.add(addPoint(52, 5, 10))
//group.add(addPoint(0, 0, 10))
scene.add(group);


scene.add(new THREE.AmbientLight(0x111111));
var light = new THREE.PointLight(0xffffff);
light.position.x = 20;
light.position.y = 20;
light.position.z = 30;


scene.add(light);


//group.rotation.x = 1
camera.position.z = 20;


function animate(){
    requestAnimationFrame(animate);

    group.rotation.y -= 0.01
    
    renderer.render(scene, camera);
}

function addPoint(lat, lon, mag){
    var pointGeometry = new THREE.CylinderBufferGeometry(0.1, 0.1, 4, 32);
    var point = new THREE.Mesh(pointGeometry, new THREE.MeshPhongMaterial());
    var theta = (90-lat)/180.* Math.PI;
    var phi = -lon/360.* Math.PI*2.;
    
    console.log(theta)
    console.log(phi)

    point.position.x = RADIUS*Math.sin(theta)*Math.cos(phi);
    point.position.z = RADIUS*Math.sin(theta)*Math.sin(phi);
    point.position.y = RADIUS*Math.cos(theta);

    console.log(point.position.x)
    console.log(point.position.y)
    console.log(point.position.z)
    point.lookAt(0, 0, 0)
    // point.rotation.x = theta
    // point.rotation.y = phi

    return(point)
}




animate();
