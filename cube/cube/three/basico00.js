       // cena
       const scene = new THREE.Scene();
       //camera
       const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
       //render
       const renderer = new THREE.WebGLRenderer();
       renderer.setSize(window.innerWidth,window.innerHeight);
       document.body.appendChild(renderer.domElement);
       //Cubo
       const geometry = new THREE.BoxGeometry(5,4,1);
       const material = new THREE.MeshBasicMaterial({color: 0x0000ff });
       const cube = new THREE.Mesh(geometry,material);
       scene.add(cube)
       //posicionando camera 
       camera.position.z = 5;
       //redimensionar janela
       window.addEventListener('resize',()=>{
           const width = window.innerWidth;
           const height = window.innerHeight;
           renderer.setSize(width,height);
           camera.aspect = width/ height
           camera.updateProjectionMatrix()
       })
       // Renderização
       function animate (){
           requestAnimationFrame(animate);
           cube.rotation.x += 0.01;
           cube.rotation.y += 0.01;
           renderer.render(scene,camera)
       }
       animate()