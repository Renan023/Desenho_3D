  // Cena
  const scene = new THREE.Scene();

  // Câmera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderizador
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Cubo
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const material = new THREE.MeshBasicMaterial({ color: 0xff1100 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Velocidade do cubo
  let speedX = 0.05;
  let speedY = 0.05;

  // Redimensionamento da janela
  window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  });

  // Renderização e animação
  function animate() {
      requestAnimationFrame(animate);

      // Mover cubo
      cube.position.x += speedX;
      cube.position.y += speedY;

      // Verificar colisão com as bordas da janela
      const halfWidth = (window.innerWidth / window.innerHeight) * camera.position.z;
      const halfHeight = camera.position.z;
      const cubeSize = 1.5 / 2; // Metade do tamanho do cubo

      if (cube.position.x >= halfWidth - cubeSize || cube.position.x <= -halfWidth + cubeSize) {
          speedX = -speedX; // Inverter direção X
      }
      if (cube.position.y >= halfHeight - cubeSize || cube.position.y <= -halfHeight + cubeSize) {
          speedY = -speedY; // Inverter direção Y
      }

      renderer.render(scene, camera);
  }

  animate();