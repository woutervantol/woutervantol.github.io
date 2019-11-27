var RADIUS = 10;
var mouseray = new THREE.Vector2();
var mouse = new THREE.Vector2();

var raycaster = new THREE.Raycaster();

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
var texture = new THREE.TextureLoader().load('images/elev_bump_8k.jpg');//intensiteit representeerd hier hoogteverschil, dat wordt dmv lichtval gesimuleerd
var material = new THREE.MeshPhongMaterial({map:world});
material.bumpMap = texture;
material.bumpScale=1;
var sphere = new THREE.Mesh(geometry, material);

var group = new THREE.Group();//alle meteorieten worden aan deze groep toegevoegd zodat ze samen geroteerd kunnen worden
group.add(sphere);


container.addEventListener("mousedown", onMouseDown, false);
container.addEventListener("wheel", onMouseWheel, false);
container.addEventListener("mousemove", onMouseMove, false);

function onMouseDown(event){
    container.addEventListener("mouseup", onMouseUp, false);
    container.addEventListener("mousemove", onMouseDrag, false);

    
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    // var classifyPoint = require("robust-point-in-polygon")
    // var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ]
    
    
    // mouseray.x =  ( event.clientX / window.innerWidth ) * 2 - 1;
    // mouseray.y = -( event.clientY / window.innerHeight) * 2 + 1;

    // raycaster.setFromCamera(mouseray, camera);
    // var intersects = raycaster.intersectObjects(group.children);
    // if (intersects[0].object != group.children[0]){
    //     console.log(intersects[0].object.material.color);
    //     intersects[0].object.material.color.setHex(0xff0000);
    //     console.log(intersects[0].object.material.colorWrite)
    // }




}
function onMouseUp(event){
    container.removeEventListener("mousemove", onMouseDrag, false);
    container.removeEventListener("mouseup", onMouseUp, false);
}
function onMouseDrag(event){
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



var intersected;
var red = new THREE.Color(0xff0000);
function onMouseMove(event){
    mouseray.x =  ( event.clientX / window.innerWidth ) * 2 - 1;
    mouseray.y = -( event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseray, camera);
    var intersects = raycaster.intersectObjects(group.children);
    if (intersects.length>0){
        if (intersects[0].object != group.children[0]){
            if (intersects[0].object.color != red){
                if (intersected){
                    intersected.material.color.setHex(0xffffff);
                }
                
                intersects[0].object.material.color.setHex(0xff0000);
                group.add(intersects[0].object)
                intersected = intersects[0].object


                document.getElementById("name").value = intersects[0].object.name
                document.getElementById("nametype").value = intersects[0].object.nametype
                document.getElementById("recclass").value = intersects[0].object.recclass
                document.getElementById("mass").value = intersects[0].object.mass
                document.getElementById("fall").value = intersects[0].object.fall
                document.getElementById("year").value = intersects[0].object.year
                document.getElementById("reclat").value = intersects[0].object.reclat
                document.getElementById("reclong").value = intersects[0].object.reclong
            }
        }
    }
}





//dataverwerking
var data

var oReq = new XMLHttpRequest();
oReq.open("GET", "data/testData.json", true);
oReq.onreadystatechange = function(){
    data = JSON.parse(this.responseText);
    var masses = []
    var reclats = []
    var reclongs = []
    // for (var i in data){
    //     masses = masses.concat(i.mass)
    // }
    Update()
}
oReq.send();

var countries;
var tags = [];
var oReq2 = new XMLHttpRequest();
oReq2.open("GET", "data/countries.json", true);
oReq2.onreadystatechange = function(){
    countries = JSON.parse(this.responseText);
    for (var i in countries){
        tags = tags.concat(countries[i].name);
        //console.log("\""+countries[i].name+"\",")
    }
    
}


oReq2.send();

function Update(){
    var count = 0

    var yearmin = document.getElementById("yearmin").value;
    var yearmax = document.getElementById("yearmax").value;

    var massmin = document.getElementById("massmin").value;
    var massmax = document.getElementById("massmax").value;

    for (var i of data){
        if (i.year >= yearmin && i.year <= yearmax && i.mass >= massmin && i.mass <= massmax){
            addPoint(i.name,i.nametype, i.recclass, i.mass, i.fall, i.year, i.reclat, i.reclong);
            count++;
        }
    }
    document.getElementById("count").innerHTML = count
}





scene.add(group);
scene.add(new THREE.AmbientLight(0x111111));
var light = new THREE.PointLight(0xffffff);
light.position.x = 20;
light.position.y = 20;
light.position.z = 30;
//de camera is in de z richting dus dit komt van rechts achter je q

scene.add(light);


camera.position.z = 20;

var rotating = false
var targetlat = 0
var targetlong = 0
function pan(name){
    rotating = true
    var country = countries[countrylist.findIndex(function(x){return x==name})]
    console.log(country)
    targetlat = (country.lat)/180.*Math.PI
    targetlong = -(country.long+90)/360.*Math.PI*2
    console.log(group.rotation)
    console.log(targetlat)
    console.log(targetlong)
}




function animate(){
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    if (rotating){
        if (group.rotation.x - targetlat < 0.01 && group.rotation.y - targetlong < 0.01){
            rotating = false;
        }else{
            group.rotation.x -= (group.rotation.x - targetlat)/10
            group.rotation.y -= (group.rotation.y - targetlong)/10
        }
    }
}

function addPoint(name, nametype, recclass, mass, fall, year, reclat, reclong){
    var pointGeometry = new THREE.CylinderBufferGeometry(0.04*Math.log10(Math.log(mass)+10), 0.04*Math.log10(mass)/5, (Math.log10(mass)**2)/5, 3);//(radius top, radius bottom, length, number of edges)
    //probeer:
        //width:
            //0.04*log10(log(mass)+10)
            //0.04*log10(mass)/5
        //height:
            //log(mass)/2
            //log(mass)
            //log10(mass)
            //log2(mass)/3
            //(log10(mass)**2)/5
    var point = new THREE.Mesh(pointGeometry, new THREE.MeshStandardMaterial());
    var theta = (90-reclat)/180.* Math.PI;
    var phi = -reclong/360.* Math.PI*2.;
    point.position.x = RADIUS*Math.sin(theta)*Math.cos(phi);
    point.position.z = RADIUS*Math.sin(theta)*Math.sin(phi);
    point.position.y = RADIUS*Math.cos(theta);

    var vec3 = new THREE.Vector3(point.position.z, 0, -point.position.x).normalize();
    point.rotateOnAxis(vec3, theta);

    point.material.color.set(0xffffff)

    point.name = name
    point.nametype = nametype
    point.recclass = recclass
    point.mass = mass
    point.fall = fall
    point.year = year
    point.reclat = reclat
    point.reclong = reclong




    group.add(point);
    
}


animate();