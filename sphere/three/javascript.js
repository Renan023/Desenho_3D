// Cena
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;//Z = Aproximação

// Renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // <=dimensão do círculo
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x1500ff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 1;//Y= horizontal
sphere.castShadow = true; // A esfera projeta sombra
scene.add(sphere);

// Plano
const planeGeometry = new THREE.PlaneGeometry(10, 10, 32, 32); // plano geométrico
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff05, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2; // X= Vertical,Rotação correta do plano
plane.receiveShadow = true; // O plano recebe sombra
scene.add(plane);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10); // posição da luz
light.castShadow = true; // A luz projeta sombra
scene.add(light);

// Habilitar sombras no renderizador
renderer.shadowMap.enabled = true;

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.z += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
