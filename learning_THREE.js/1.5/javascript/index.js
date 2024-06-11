let scene, camera, renderer, control

const init = () =>{

    //cena 
    scene = new THREE.Scene()

    //camera 
    camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 1000)
    //posição da camera 
    camera.position.set(16 , 29 , 30)
    camera.lookAt(scene.position)

    //renderizador
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xdddddd , 1.0 )
    renderer.setSize(window.innerWidth , window.innerHeight)
    //habilitar sombra 
    renderer.shadowMap.enabled = true 

    document.body.appendChild(renderer.domElement)

    //construção do plano 
    const planeGeometry = new THREE.PlaneGeometry(20, 20)
    const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
    const plane = new THREE.Mesh(planeGeometry ,planeMaterial)
    //recebimento da sombra 
    plane.receiveShadow = true
    //rotação do plano
    plane.rotation.x = -0.5 * Math.PI
    plane.position.y = -2 

    scene.add(plane)

    //criação do cubo 
    const cubeGeometry = new THREE.BoxGeometry(6 , 4, 6)
    const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xcc0055, transparent: true})
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.name = 'cube'
    //sombra
    cube.castShadow = true 
    
    scene.add(cube)

    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(15, 28 ,26)
    spotLight.shadow.camera.near = 20
    spotLight.shadow.camera.far = 50
    //sombra
    spotLight.castShadow = true

    scene.add(spotLight)

    control = new function (){
        this.rotationSpeed = 0.01
        this.opacity = 0.6
        this.color = cubeMaterial.color.getHex()
    }
    //adicionar GUI de controle
    addControlGUI(control)
    //adicionar objeto de estatisticas 
    addStatsObject()
    //chamar função renderização
    render()
}

//GUI de controle
const addControlGUI = (controlObject) => {
    const gui = new dat.GUI()
    gui.add(controlObject, 'rotationSpeed', -0.01 , 0.1)
    gui.add(controlObject, 'opacity' , 0.1, 1)
    gui.addColor(controlObject, 'color')
}

//objeto de estatisticas
const addStatsObject = ()=> {
    stats = new Stats()
    stats.showPanel(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.right = '0px'
    document.body.appendChild(stats.dom)
}
const render = () => {
    stats.begin()

    const speed = control.rotationSpeed
    const x = camera.position.x 
    const z = camera.position.z
    
    camera.position.x = x * Math.cos(speed) + z *Math.sin(speed)
    camera.position.z = z * Math.cos(speed) - x *Math.sin(speed)
    camera.lookAt(scene.position)

    scene.getObjectByName('cube').material.opacity = control.opacity

    scene.getObjectByName('cube').material.color.set(control.color)

    requestAnimationFrame(render)
    stats.end()
    renderer.render(scene, camera)
}
    const handleResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        camera.aspect = width/ height
        camera.updateProjectionMatrix()
        renderer.setSize( width, height)
    }


window.onload = init
window.addEventListener('resize',handleResize, false)