const width = window.innerWidth
const height = window.innerHeight

//cena
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(75 , window.innerWidth/ window.innerHeight, 0.1, 1000)
//posição da camera 
camera.position.z = 6

//renderizador
const renderer = new THREE.WebGLRenderer({alpha: true})
renderer.setSize(width , height)
document.body.appendChild(renderer.domElement)

//cubo
const geometry = new THREE.BoxGeometry(2,2,2)
const material = [  new THREE.MeshBasicMaterial({ color: 0x6666ee }),
                    new THREE.MeshBasicMaterial({ color: 0x66aaff }),
                    new THREE.MeshBasicMaterial({ color: 0x9999ff }),
                    new THREE.MeshBasicMaterial({ color: 0x9977ff }),
                    new THREE.MeshBasicMaterial({ color: 0x9955ee })
                ]
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//velocidade
let speedX = 0.05
let speedY = 0.05

//redimensionamento
window.addEventListener('resize',()=>{
    renderer.setSize(width, height)
    camera.aspect = width/height
    camera.updateProjectionMatrix()
})

//renderização e animação 
function animate(){
    requestAnimationFrame(animate)

    //movimento
    cube.position.x += speedX
    cube.position.y += speedY

    //colisão
    const cubeSize = 2 / 2
    const halfWidth = (width/height)* camera.position.z 
    const halfHeight = camera.position.z 
    if (cube.position.x >= halfWidth -cubeSize || cube.position.x <= - halfWidth + cubeSize){
        speedX = -speedX
    }
    if (cube.position.y >= halfHeight - cubeSize || cube.position.y <= - halfHeight + cubeSize){
        speedY = - speedY
    }
    renderer.render(scene,camera)
}

animate()