//cena
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1 , 1000)
camera.position.z = 5

//renderizador
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//cubo 
const geometry = new THREE.BoxGeometry(1.5,1.5,1.5)
const material = new THREE.MeshBasicMaterial({color: 0xff1100})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//velocidade do cubo *
let speedX = 0.05
let speedY = 0.05

//redimensionamento
window.addEventListener('resize',()=>{
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width/ height
    camera.updateProjectionMatrix()
})

//renderização e animação
function animate(){
    requestAnimationFrame(animate)

    //mover cubo *
    cube.position.x += speedX
    cube.position.y += speedY

    //verificar colisão com as bordas da janela *
    const halfWidth = window.innerWidth / window.innerHeight * camera.position.z
    const halfHeigth = camera.position.z
    if(cube.position.x >= halfWidth - 0 || cube.position.x <= -halfWidth + 0){
        speedX = - speedX//inverter direção X *
    }
    if(cube.position.y >= halfHeigth - 0 || cube.position.y <= -halfHeigth+ 0){
        speedY = - speedY//inverter direção Y *
    }
    renderer.render(scene, camera)
}

animate()