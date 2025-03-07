const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let videoTexture;
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        videoTexture = new THREE.VideoTexture(video);
        scene.background = videoTexture;
    });

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    transparent: true,
    opacity: 0.8
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 2;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();