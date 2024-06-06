let scene, camera , renderer, control

const init = () =>{

    //cena 
    scene = new THREE.Scene()

    //camera 
    camera = new THREE.PerspectiveCamera(48 , window.innerWidth / window.innerHeight, 0.1 , 1000)
    //posição da camera
    camera.position.set(16,29,30)
    camera.lookAt(scene.position)

    //renderizador
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xdddddd, 1.0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    //habilitar a sombra
    renderer.shadowMap.enabled = true

    document.body.appendChild(renderer.domElement)

    //construção do plano 
    const planeGeometry = new THREE.PlaneGeometry(20,20)
    const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
    const plane = new THREE.Mesh( planeGeometry, planeMaterial)
    //plano recebe a sombra 
    plane.receiveShadow = true 
    //rotação do plano 
    plane.rotation.x = -0.5 * Math.PI
    plane.position.y = -2

    scene.add(plane)
    
    //criação do cubo 
    const geometry = new THREE.BoxGeometry(6,4,6)
    const material = new THREE.MeshLambertMaterial({color: 0xcc0055, transparent: true})
    const cube = new THREE.Mesh(geometry, material)
    cube.name = 'cube'
    //sombra do cubo 
    cube.castShadow = true

    scene.add(cube)

    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(15,28,26)
    spotLight.shadow.camera.near = 20 
    spotLight.shadow.camera.far = 50
    //sombra do holofote 
    spotLight.castShadow = true

    scene.add(spotLight)

    //configura o objeto de controle para GUI
    control = new function (){
        this.rotationSpeed = 0.01
        this.opacity = 0.9
        this.color = material.color.getHex()
    }
    addControlGUI(control)

    render()
}

//adiciona GUI de controle
const addControlGUI = (controlObject) => {
    const gui = new dat.GUI()
    gui.add(controlObject, 'rotationSpeed', -0.01 , 0.1)
    gui.add(controlObject, 'opacity' , 0.1, 1)
    gui.addColor(controlObject, 'color')
}
const render = () => {

    const speed = control.rotationSpeed
    const x = camera.position.x
    const z = camera.position.z 

    camera.position.x = x * Math.cos(speed) + z * Math.sin(speed)
    camera.position.z = z * Math.cos(speed) - x * Math.sin(speed)
    camera.lookAt(scene.position)

    //altera opacidade
    scene.getObjectByName('cube').material.opacity = control.opacity

    //altera cor 
    scene.getObjectByName('cube').material.color.set(control.color)

    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

const handleResize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width/ height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
}
window.onload = init
window.addEventListener('resize', handleResize, false)

