const width = window.innerWidth
const height = window.innerHeight

//cena
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1 , 1000)
//posição da camera 
camera.position.z = 6

//renderizador
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(width, height)
renderer.shadowMap.enabled = true //habilitar sombras no renderizador
document.body.appendChild(renderer.domElement)

//cubo 
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
const material =[   new THREE.MeshBasicMaterial({ color: 0x6666ee }),
                    new THREE.MeshBasicMaterial({ color: 0x66aaff }),
                    new THREE.MeshBasicMaterial({ color: 0x9999ff }),
                    new THREE.MeshBasicMaterial({ color: 0x9977ff }),
                    new THREE.MeshBasicMaterial({ color: 0x9955ee })
] 
const cube = new THREE.Mesh(geometry, material)
cube.castShadow = true//habilitar projeção da sombra no cubo 
scene.add(cube)

//plano 
const planeGeometry = new THREE.PlaneGeometry(200,200)
//opacidade da sombra 
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = - Math.PI / 2 
plane.position.y = - 4.5
//habilitar recebimento da sombra 
plane.receiveShadow = true
scene.add(plane)

//luz
const directionalLight = new THREE.DirectionalLight(0xffffff , 1)
directionalLight.position.set(10,20,10)
//habilitar projeção da luz
directionalLight.castShadow = true
scene.add(directionalLight)

//ajustes a resolução da sombra
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 50
directionalLight.shadow.camera.left = -20
directionalLight.shadow.camera.right = 20
directionalLight.shadow.camera.top = 20
directionalLight.shadow.camera.bottom = -20

//luz ambiente 
const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

//velocidade
let speedX = 0.05
let speedY = 0.05

//redimensionamento
window.addEventListener('resize', () =>{
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

//renderização e animação 
function animate (){
    requestAnimationFrame(animate)
    
    //movimento
    cube.position.x += speedX
    cube.position.y += speedY

    //colisão
    const halfWidth = ( width / height) * camera.position.z
    const halfHeight = camera.position.z
    //metade do cubo
    const cubeSize = 1.5 / 2
    if (cube.position.x >= halfWidth - cubeSize || cube.position.x <= -halfWidth + cubeSize){
        speedX = - speedX
    }
    if (cube.position.y >= halfHeight - cubeSize || cube.position.y <= -halfHeight + cubeSize){
        speedY = - speedY
    }
    renderer.render(scene, camera)
}

animate()