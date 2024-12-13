import * as THREE from "three";

const colors = ["green", "white", "red", "blue", "yellow", "purple", "orange", "#ff10f0", "gray"];

const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height);
scene.add(camera);
camera.position.y = 5;

const cubes = new THREE.Group();
const cubes1 = new THREE.Group();
const cubes2 = new THREE.Group();
const cubes3 = new THREE.Group();

cubes.add(cubes1);
cubes.add(cubes2);
cubes.add(cubes3);

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        cubes.children[i].add(
            new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * 9)], wireframe: Math.floor(Math.random() * 2) && true })
            )
        );
        cubes.children[i].children[j].position.x = (j-1)*1.8
    }
    cubes.children[i].position.z = (i-1)*1.8
}

scene.add(cubes)
camera.lookAt(cubes.position)

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(width, height);

const clock = new THREE.Clock();
var delta = clock.getDelta();

const tick = () => {
    delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            cubes.children[i].children[j].rotation.x = elapsedTime - j - i
            cubes.children[i].children[j].rotation.y = elapsedTime - j - i
            cubes.children[i].children[j].rotation.z = elapsedTime - j - i
            cubes.children[i].children[j].position.y = Math.sin(elapsedTime-j)*0.5
        }
        cubes.children[i].position.y = Math.sin(elapsedTime-i)*0.5
    }
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
