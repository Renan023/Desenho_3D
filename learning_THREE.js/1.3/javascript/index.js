let scene, camera, renderer;

const init = () =>{
    // Cena
    scene = new THREE.Scene();

    // Renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x9988ff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Habilitar sombra
    renderer.shadowMap.enabled = true;

    // Câmera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Criar um plano
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    
    // Plano recebe sombra
    plane.receiveShadow = true;

    // Rotação e posição do plano
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y = 0;

    // Adicionar plano
    scene.add(plane);

    // Construção do cubo
    const geometry = new THREE.BoxGeometry(10, 12, 10);
    const material = new THREE.MeshLambertMaterial({color: 0x99aadd});
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;

    // Adicionar cubo à cena
    scene.add(cube);

    // Posição da câmera
    camera.position.set(16, 15, 13);
    camera.lookAt(scene.position);

    // Adicionar renderizador à DOM
    document.body.appendChild(renderer.domElement);

    // Incluir holofote para sombras
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(20, 40, 35);
    spotLight.shadow.camera.near = 20;
    spotLight.shadow.camera.far = 50;
    spotLight.castShadow = true;
    scene.add(spotLight);

    addVertices(cube)
    render();
};

const addVertices = (mesh) =>{
    const vertices = mesh.geometry.attributes.position.array
    const verticesMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00})

    for(let i = 0; i < vertices.length; i +=3){
        const vertex = new THREE.Vector3(vertices[i], vertices[i+1], vertices [i+2])
        const vertexSphere = new THREE.SphereGeometry(0.30)
        const vertexMesh = new THREE.Mesh(vertexSphere, verticesMaterial)
        vertexMesh.position.copy(vertex)

        scene.add(vertexMesh)
    }
}
const render = () => {
    const speed = 0.01
    const x = camera.position.x
    const z = camera.position.z

    camera.position.x = x * Math.cos(speed) + z * Math.sin(speed)
    camera.position.z = z * Math.cos(speed) - x * Math.sin(speed)
    camera.lookAt(scene.position)

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
