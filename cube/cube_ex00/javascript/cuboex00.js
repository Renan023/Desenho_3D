//cena
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(75 , window.innerWidth/ window.innerHeight, 0.1, 1000)

//renderizador 
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//cubo 
const geometry = new THREE.BoxGeometry(3,9,15)
const material = new THREE.MeshBasicMaterial({color: 0x330077})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//posição da camera
camera.position.z = 15

//redimensionamento 
window.addEventListener('resize',()=>{
    width = window.innerWidth
    height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width/ height
    camera.updateProjectionMatrix()
})

function animate (){
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}

animate()

//erro na construção do cubo ao invés de const foi colocado new