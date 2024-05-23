//cena
const scene = new THREE.Scene()

//camera 
const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1,1000)

//renderizador
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//cubo
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0x330022})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//posição da camera 
camera.position.z = 4

//redimensionamento
window.addEventListener('resize',()=>{
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

//renderização
function animate (){
    requestAnimationFrame(animate)
    camera.rotation.x += 0.010
    camera.rotation.y += 0.010
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}

animate()