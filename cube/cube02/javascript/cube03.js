//cena
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(120, window.innerWidth/ window.innerHeight, 0.1,1000)

//renderizador
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(2,5,5)
const material = new THREE.MeshBasicMaterial({color: 0xcc0044})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//posicionamento da camera 
camera.position.z = 5

//redimensionamento 
window.addEventListener('resize',()=>{
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width/ height
    camera.updateProjectionMatrix()
})

function animate(){
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}

animate()