let scene, camera, renderer;

const init = () =>{
    // Cena
    scene = new THREE.Scene();

    // Renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x9988ff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Câmera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Posição da câmera
    camera.position.set(16, 15, 13);
    camera.lookAt(scene.position);

    // Adicionar renderizador à DOM
    document.body.appendChild(renderer.domElement);

    render();
}

const render = () => {

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

const handleResize = () =>{
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

window.onload = init;
window.addEventListener('resize', handleResize, false);
