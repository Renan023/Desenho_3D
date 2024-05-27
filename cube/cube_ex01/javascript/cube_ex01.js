//cena
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth/ window.innerHeight)
camera.position.z = 4

//renderizador
const renderer = new THREE.WebGLRenderer({alpha: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//cubo 
const geometry = new THREE.BoxGeometry(1.5,1.5,1.5)
const material = [  new THREE.MeshBasicMaterial({ color: 0xff22dd }),
                    new THREE.MeshBasicMaterial({ color: 0xffaaee }),
                    new THREE.MeshBasicMaterial({ color: 0xccb8ff }),
                    new THREE.MeshBasicMaterial({ color: 0xccaaff }), 
                    new THREE.MeshBasicMaterial({ color: 0xcc99ee }),
                    new THREE.MeshBasicMaterial({ color: 0xcc77dd })  
] 
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
    let halfWidth = (window.innerWidth/ window.innerHeight) * camera.position.z
    let halfHeight = camera.position.z
    let cubeSize = 1.5 / 2
    if(cube.position.x >= halfWidth - cubeSize || cube.position.x <= -halfWidth +cubeSize){
        speedX = - speedX
    }
    if(cube.position.y >= halfHeight -cubeSize || cube.position.y <= - halfHeight + cubeSize){
        speedY = - speedY
    }
    renderer.render(scene,camera)
}

animate()