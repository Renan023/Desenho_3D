//cena
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x660055)//background do fundo 

//camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000)
camera.position.z = 5 //posição da camera 

//renderizador 
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//cubo
const geometry = new THREE.BoxGeometry(2,2,2)
const material = new THREE.MeshBasicMaterial({color: 0x330088})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//velocidade 
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
function animate (){
    requestAnimationFrame(animate)

    //movimento do cubo 
    cube.position.x += speedX
    cube.position.y += speedY
    

    const halfWidth = (window.innerWidth / window.innerHeight) * camera.position.z
    const halfHeigth = camera.position.z
    const cubeSize = 2 /2 
    if(cube.position.x >= halfWidth -cubeSize || cube.position.x <=  -halfWidth +cubeSize){
        speedX = - speedX // invertendo eixo X
    }
    if(cube.position.y >= halfHeigth -cubeSize || cube.position.y <=  -halfHeigth +cubeSize){
        speedY = - speedY//invertendo eixo Y
    }
    renderer.render(scene, camera)
}

animate()

//erros no background da cena, movimentação do cubo e na colisão do cubo 
//scene.background({color: 0x00000}) erro
//scene.background = new THREE.Color(0x000000) correção
//cube.position.x = speedX erro
//cube.position.x += speedX correção
//if(camera.position.x) erro
//if(cube.position.x) correção