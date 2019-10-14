var scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


var geometry = new THREE.SphereBufferGeometry(50, 32, 32);
var world = new THREE.TextureLoader().load('world.jpg');
var texture = new THREE.TextureLoader().load('worldtexture.jpg');
var material = new THREE.MeshPhongMaterial({map:world});
material.bumpMap = texture;
var sphere = new THREE.Mesh(geometry, material);


var group = new THREE.Group();
group.add(sphere)
group.add(addPoint(50, 50, 10))


scene.add(new THREE.AmbientLight(0x111111));
var light = new THREE.PointLight(0xffffff);
light.position.x = 60;
light.position.y = 60;
light.position.z = 100;

scene.add(group);
scene.add(light);



camera.position.z = 100;


function animate(){
    requestAnimationFrame(animate);

    //sphere.rotation.y += 0.01
    group.rotation.y += 0.01

    renderer.render(scene, camera);
}

function addPoint(lat, lon, mag){
    var pointGeometry = new THREE.CylinderBufferGeometry(0.1, 1, 10, 32);
    var point = new THREE.Mesh(pointGeometry, new THREE.MeshStandardMaterial());
    point.position.z = 50;
    
    point.rotation.x = Math.PI/2;
    return(point)
}




animate();
