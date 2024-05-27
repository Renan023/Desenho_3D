const width = window.innerWidth
const height = window.innerHeight

//cena
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera( 75 , width / height , 0.1, 1000)
//posição da camera
camera.position.z = 6

//renderizador
const renderer = new THREE.WebGLRenderer({ alpha: true})
renderer.setSize(width, height)
//habilita a sombra no renderizador
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

//geometria do cubo 
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
const material = [ 
    new THREE.MeshStandardMaterial({color: 0x6677dd}),
    new THREE.MeshStandardMaterial({color: 0x6655ff}),
    new THREE.MeshStandardMaterial({color: 0x9900ee}),
    new THREE.MeshStandardMaterial({color: 0x9955dd}),
    new THREE.MeshStandardMaterial({color: 0x9944bb})
]
//cubo
const cube = new THREE.Mesh(geometry, material)
//sombra do cubo 
cube.castShadow = true
scene.add(cube)

//plano geometrico
const planeGeometry = new THREE.PlaneGeometry(200, 200)
//opacidade da sombra
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 })
const plane = new THREE.Mesh( planeGeometry, planeMaterial)
plane.rotation.x = -Math.PI / 2
plane.position.y = - 1.5
//plano recebendo a sombra
plane.receiveShadow = true
scene.add(plane)

//luz direcional 
const directionalLight = new THREE.DirectionalLight(0xfffff, 1 )
directionalLight.position.set( 10, 20, 10 )
//habilitar sombra no plano 
directionalLight.castShadow = true
scene.add(directionalLight)

//ajuste da luz
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 50
directionalLight.shadow.camera.left = -20
directionalLight.shadow.camera.right = 20
directionalLight.shadow.camera.top = -20
directionalLight.shadow.camera.bottom = 20 

//luz ambiente
const ambientLight = new THREE.AmbientLight( 0x404040 )
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
function animate(){
    requestAnimationFrame(animate)
    //movimento
    cube.position.x += speedX
    cube.position.y += speedY
    //colisão e inversão de eixos
    const halfWidth = (width / height)* camera.position.z
    const halfHeigth = camera.position.z
    const cubeSize = 1.5 / 2
    if (cube.position.x >= halfWidth - cubeSize || cube.position.x <= -halfWidth + cubeSize){
        speedX = - speedX
    }
    if(cube.position.y >= halfHeigth - cubeSize || cube.position.y <= - halfHeigth + cubeSize){
        speedY = - speedY
    }
    renderer.render( scene, camera)
}

animate()