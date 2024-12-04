const youtubeAPI = document.createElement('script');
youtubeAPI.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(youtubeAPI);

window.onYouTubeIframeAPIReady = function() {
  console.log('YouTube API Ready');
};

let scene, camera, renderer, composer, controls, world, clock;
let fileManager, windowManager, taskbar;
let physicsBodies = [];
let neuralNetwork, circuitDiagram;
let quantumParticles = [];
let multiversalPortals = [];
let realityDistortionField;
let cosmicWeb;
let dimensionalRift;
let timelineManager;
let consciousnessField;
let multiversalDisplay;
let selectedObject = null;
let customizationGui = null;
let keyStates = {};

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Set up the WebGL renderer (for 3D objects)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Set up the CSS3D renderer (for HTML elements)
  cssRenderer = new THREE.CSS3DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = 'absolute';
  cssRenderer.domElement.style.top = '0';
  cssRenderer.domElement.style.left = '0';
  document.body.appendChild(cssRenderer.domElement);

  // Append the WebGL renderer's DOM element to the CSS renderer's element
  cssRenderer.domElement.appendChild(renderer.domElement);
  
  const container = document.getElementById('container');
  if (!container) {
    console.error('Container element not found');
    return;
  }
  container.appendChild(renderer.domElement);

  clock = new THREE.Clock();

  world = new CANNON.World();
  world.gravity.set(0, 0, 0);
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.solver.iterations = 50;
  world.solver.tolerance = 0.00001;

  camera.position.set(0, 5, 10);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const ambientLight = new THREE.AmbientLight(0x00ffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 4096;
  directionalLight.shadow.mapSize.height = 4096;
  scene.add(directionalLight);

  const renderScene = new THREE.RenderPass(scene, camera);
  const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = 0.2;
  bloomPass.strength = 1.5;
  bloomPass.radius = 0.8;

  composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  createQuantumEnvironment();
  createQuantumAIFileManager();
  createQuantum3DWindowManager();
  createQuantumTaskbar();
  createQuantumCircuit();
  createNeuralNetwork();
  createMultiversalPortals();
  createRealityDistortionField();
  createCosmicWeb();
  createDimensionalRift();
  createTimelineManager();
  createConsciousnessField();
  
  createYoutubeScreen('yJ7R3jxSF_g');

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('quantumentanglement', onQuantumEntanglement, false);
  window.addEventListener('multiversalshift', onMultiversalShift, false);
  window.addEventListener('consciousnessexpansion', onConsciousnessExpansion, false);

  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }

  const multiversalDisplayElement = document.getElementById('multiversal-display');
  if (multiversalDisplayElement) {
    multiversalDisplay = multiversalDisplayElement;
  }

  const createObjectBtn = document.getElementById('create-object-btn');
  if (createObjectBtn) {
    createObjectBtn.addEventListener('click', () => {
      showObjectCreationDialog();
    });
  }

  animate();
  initInteractionControls();
}

function findFreePosition() {
    const minDistance = 3; // Minimum distance between objects
    let position = new THREE.Vector3(0, 2, -5); // Default position
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        // Check if position is occupied
        let isOccupied = false;
        scene.children.forEach(child => {
            if (child instanceof THREE.Mesh && child.position.distanceTo(position) < minDistance) {
                isOccupied = true;
            }
        });

        if (!isOccupied) {
            return position;
        }

        // Try a new random position
        position = new THREE.Vector3(
            Math.random() * 10 - 5,    // x between -5 and 5
            Math.random() * 4 + 1,     // y between 1 and 5
            Math.random() * 10 - 10    // z between -10 and 0
        );
        attempts++;
    }

    // If no free position found after max attempts, return offset from default
    return new THREE.Vector3(
        Math.random() * 2 - 1,  // Small random offset
        2,
        -5 + Math.random() * 2 - 1
    );
}

function createVideoTexture(videoId) {
  const existingIframe = document.querySelector(`iframe[data-video-id="${videoId}"]`);
  if (existingIframe) {
    existingIframe.remove();
  }

  const iframe = document.createElement('iframe');
  iframe.style.cssText = `
    position: absolute;
    top: -9999px;  
    left: -9999px;
    width: 640px;
    height: 360px;
    pointer-events: none;
  `;
  iframe.setAttribute('data-video-id', videoId);
  iframe.setAttribute('allow', 'autoplay');
  iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`;
  document.body.appendChild(iframe);

  const texture = new THREE.VideoTexture(iframe);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  texture.generateMipmaps = false;

  texture.userData = { iframe };
  
  return texture;
}

function createYoutubeScreen(videoId = 'yJ7R3jxSF_g') {
  const iframe = document.createElement('iframe');
  iframe.style.width = '800px'; // Set size according to your needs
  iframe.style.height = '450px';
  iframe.style.border = 'none';
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`;

  const cssObject = new THREE.CSS3DObject(iframe);

  const position = findFreePosition();
  cssObject.position.copy(position);
  cssObject.rotation.set(0, 0, 0);

  cssObject.scale.set(0.01, 0.01, 0.01); // Adjust scale to match your scene

  cssObject.userData.type = 'youtube-screen';
  cssObject.userData.videoId = videoId;

  scene.add(cssObject);
  return cssObject;
    // Create an invisible plane for interaction
    const planeGeometry = new THREE.PlaneGeometry(16 / 9 * 2, 2);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0, // Make it invisible
    transparent: true,
  });
  const interactionPlane = new THREE.Mesh(planeGeometry, planeMaterial);

  interactionPlane.position.copy(cssObject.position);
  interactionPlane.rotation.copy(cssObject.rotation);
  interactionPlane.scale.copy(cssObject.scale);

  interactionPlane.userData.type = 'youtube-screen';
  interactionPlane.userData.videoId = videoId;
  interactionPlane.userData.cssObject = cssObject;

  // Add the CSS3DObject as a child of the interaction plane
  interactionPlane.add(cssObject);

  scene.add(interactionPlane);
  return interactionPlane;
}



function deleteSelectedObject() {
  if (selectedObject) {
    if (selectedObject.userData.type === 'youtube-screen') {
      if (selectedObject.material.map) {
        selectedObject.material.map.dispose();
      }
      if (selectedObject.userData.iframe) {
        selectedObject.userData.iframe.remove();
      }
    }
    scene.remove(selectedObject);
    deselectObject();
  }
}

function showObjectCreationDialog() {
    const existingDialog = document.querySelector('#object-creation-dialog');
    if (existingDialog) existingDialog.remove();

    const dialog = document.createElement('div');
    dialog.id = 'object-creation-dialog';
    dialog.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #00ffff;
        padding: 20px;
        color: #00ffff;
        border-radius: 5px;
        z-index: 1000;
    `;

    const content = `
        <h3 style="color: #00ffff; margin-top: 0;">Create New Object</h3>
        <div style="margin: 10px 0;">
            <label style="display: block; margin-bottom: 5px;">Object Type:</label>
            <select id="object-type-select" style="background: #000; color: #00ffff; border: 1px solid #00ffff; padding: 5px;">
                <option value="screen">Video Screen</option>
                <option value="cube">Cube</option>
                <option value="sphere">Sphere</option>
                <option value="torus">Torus</option>
            </select>
        </div>
        <div id="video-settings" style="margin: 10px 0;">
            <label style="display: block; margin-bottom: 5px;">Video ID:</label>
            <input type="text" id="video-id-input" value="yJ7R3jxSF_g" 
                   style="background: #000; color: #00ffff; border: 1px solid #00ffff; padding: 5px; width: 200px;">
        </div>
        <div style="margin: 10px 0;">
            <label style="display: block; margin-bottom: 5px;">Position:</label>
            X: <input type="number" id="pos-x" value="0" step="0.5" style="width: 60px; margin-right: 10px;">
            Y: <input type="number" id="pos-y" value="2" step="0.5" style="width: 60px; margin-right: 10px;">
            Z: <input type="number" id="pos-z" value="-5" step="0.5" style="width: 60px;">
        </div>
        <div style="margin: 15px 0;">
            <button id="create-btn" style="background: #00ffff; color: black; border: none; padding: 8px 15px; margin-right: 10px; cursor: pointer;">Create</button>
            <button id="cancel-btn" style="background: #666; color: white; border: none; padding: 8px 15px; cursor: pointer;">Cancel</button>
        </div>
    `;

    dialog.innerHTML = content;
    document.body.appendChild(dialog);

    const typeSelect = document.getElementById('object-type-select');
    const videoSettings = document.getElementById('video-settings');
    
    typeSelect.addEventListener('change', () => {
        videoSettings.style.display = typeSelect.value === 'screen' ? 'block' : 'none';
    });

    document.getElementById('create-btn').addEventListener('click', () => {
        const type = typeSelect.value;
        const position = new THREE.Vector3(
            parseFloat(document.getElementById('pos-x').value),
            parseFloat(document.getElementById('pos-y').value),
            parseFloat(document.getElementById('pos-z').value)
        );

        let object;
        if (type === 'screen') {
            const videoId = document.getElementById('video-id-input').value;
            object = createYoutubeScreen(videoId);
        } else {
            object = createNewObject(type);
        }

        object.position.copy(position);
        selectObject(object);
        dialog.remove();
    });

    document.getElementById('cancel-btn').addEventListener('click', () => {
        dialog.remove();
    });
}

function createQuantumEnvironment() {
  const particleGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  const particleMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.7
  });

  for (let i = 0; i < 100; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10
    );
    scene.add(particle);
    quantumParticles.push(particle);
  }
}

function createQuantumAIFileManager() {
  fileManager = new THREE.Group();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.8
  });
  const file = new THREE.Mesh(geometry, material);
  fileManager.add(file);
  scene.add(fileManager);
}

function createQuantum3DWindowManager() {
  windowManager = new THREE.Group();
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.5
  });
  const window = new THREE.Mesh(geometry, material);
  windowManager.add(window);
  scene.add(windowManager);
}

function createQuantumTaskbar() {
  taskbar = new THREE.Group();
  const geometry = new THREE.BoxGeometry(10, 0.5, 0.1);
  const material = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    transparent: true,
    opacity: 0.7
  });
  const bar = new THREE.Mesh(geometry, material);
  taskbar.add(bar);
  scene.add(taskbar);
}

function createQuantumCircuit() {
  const canvas = document.getElementById('circuit-diagram');
  if (!canvas) {
    console.warn('Circuit diagram canvas not found');
    return;
  }
  const ctx = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 150;
  ctx.strokeStyle = '#00ffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 75);
  ctx.lineTo(190, 75);
  ctx.stroke();
}

function createNeuralNetwork() {
  const canvas = document.getElementById('neural-network');
  if (!canvas) {
    console.warn('Neural network canvas not found');
    return;
  }
  const ctx = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 150;
  ctx.strokeStyle = '#00ffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, Math.PI * 2);
  ctx.stroke();
}

function createMultiversalPortals() {
  const portalGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
  const portalMaterial = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    emissive: 0xff00ff,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.6
  });

  for (let i = 0; i < 3; i++) {
    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    portal.position.set(i * 8 - 8, 0, -5);
    scene.add(portal);
    multiversalPortals.push(portal);
  }
}

function createRealityDistortionField() {
  const geometry = new THREE.IcosahedronGeometry(5, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  realityDistortionField = new THREE.Mesh(geometry, material);
  scene.add(realityDistortionField);
}

function createCosmicWeb() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 1000; i++) {
    vertices.push(
      Math.random() * 100 - 50,
      Math.random() * 100 - 50,
      Math.random() * 100 - 50
    );
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1
  });
  cosmicWeb = new THREE.Points(geometry, material);
  scene.add(cosmicWeb);
}

function createDimensionalRift() {
  const geometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
  const material = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    emissive: 0xff00ff,
    emissiveIntensity: 0.5,
    wireframe: true
  });
  dimensionalRift = new THREE.Mesh(geometry, material);
  scene.add(dimensionalRift);
}

function createTimelineManager() {
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: true
  });
  timelineManager = new THREE.Mesh(geometry, material);
  scene.add(timelineManager);
}

function createConsciousnessField() {
  const geometry = new THREE.PlaneGeometry(20, 20, 32, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float d = length(p);
        float c = sin(d * 10.0 - time) * 0.5 + 0.5;
        gl_FragColor = vec4(c * 0.0, c * 1.0, c * 1.0, 0.5);
      }
    `,
    transparent: true
  });
  consciousnessField = new THREE.Mesh(geometry, material);
  consciousnessField.rotation.x = -Math.PI / 2;
  consciousnessField.position.y = -5;
  scene.add(consciousnessField);
}

function createNewObject(type = 'cube') {
  const geometries = {
    cube: new THREE.BoxGeometry(1, 1, 1),
    sphere: new THREE.SphereGeometry(0.5, 32, 32),
    torus: new THREE.TorusGeometry(0.5, 0.2, 16, 100),
    screen: new THREE.PlaneGeometry(16 / 9 * 2, 2)
  };

  const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.8
  });

  const object = new THREE.Mesh(geometries[type], material);
  object.position.set(0, 0, -5);
  scene.add(object);
  selectObject(object);
  return object;
}

function createCustomizationGui(object) {
  if (customizationGui) customizationGui.destroy();
  customizationGui = new dat.GUI({ autoPlace: true });
  customizationGui.domElement.style.position = 'absolute';
  customizationGui.domElement.style.top = '10px';
  customizationGui.domElement.style.right = '10px';

  const posFolder = customizationGui.addFolder('Position');
  posFolder.add(object.position, 'x', -10, 10).name('X');
  posFolder.add(object.position, 'y', -10, 10).name('Y');
  posFolder.add(object.position, 'z', -10, 10).name('Z');
  
  // Synchronize cssObject position
  object.position.onChange(() => {
    if (object.userData.cssObject) {
      object.userData.cssObject.position.copy(object.position);
    }
  });

  const rotFolder = customizationGui.addFolder('Rotation');
  rotFolder.add(object.rotation, 'x', 0, Math.PI * 2).name('X');
  rotFolder.add(object.rotation, 'y', 0, Math.PI * 2).name('Y');
  rotFolder.add(object.rotation, 'z', 0, Math.PI * 2).name('Z');

  const scaleFolder = customizationGui.addFolder('Scale');
  scaleFolder.add(object.scale, 'x', 0.1, 2).name('X');
  scaleFolder.add(object.scale, 'y', 0.1, 2).name('Y');
  scaleFolder.add(object.scale, 'z', 0.1, 2).name('Z');

  if (object.material) {
    const matFolder = customizationGui.addFolder('Material');
    if (object.material.color) {
      matFolder.addColor(object.material, 'color').name('Color');
    }
    if (object.material.opacity !== undefined) {
      matFolder.add(object.material, 'opacity', 0, 1).name('Opacity');
    }
    if (object.material.emissiveIntensity !== undefined) {
      matFolder.add(object.material, 'emissiveIntensity', 0, 2).name('Glow');
    }

    const brightnessController = {
      brightness: 1.0,
      update: function() {
        if (object.material && object.material.color) {
          const color = object.material.color;
          const r = Math.min(1, color.r * this.brightness);
          const g = Math.min(1, color.g * this.brightness);
          const b = Math.min(1, color.b * this.brightness);
          object.material.color = new THREE.Color(r, g, b);
          
          if (object.material.emissive) {
            const emissive = object.material.emissive;
            const er = Math.min(1, emissive.r * this.brightness);
            const eg = Math.min(1, emissive.g * this.brightness);
            const eb = Math.min(1, emissive.b * this.brightness);
            object.material.emissive = new THREE.Color(er, eg, eb);
          }
        }
      }
    };
    
    matFolder.add(brightnessController, 'brightness', 0.1, 3)
      .name('Brightness')
      .onChange(() => brightnessController.update());
  }

  const managementFolder = customizationGui.addFolder('Object Management');

  managementFolder.add({ delete: () => deleteSelectedObject() }, 'delete')
    .name('Delete Object');

  const createOptions = {
    type: 'cube',
    create: () => createNewObject(createOptions.type)
  };

  managementFolder.add(createOptions, 'type', ['cube', 'sphere', 'torus', 'screen'])
    .name('New Object Type');
  managementFolder.add(createOptions, 'create')
    .name('Create New Object');

  if (object.userData.type === 'youtube-screen') {
    const ytFolder = customizationGui.addFolder('YouTube Settings');
    const ytSettings = {
      videoId: object.userData.videoId || '',
      update: () => {
        if (ytSettings.videoId) {
          const position = object.position.clone();
          const rotation = object.rotation.clone();
          const scale = object.scale.clone();
          
          scene.remove(object);
          if (object.userData.iframe) {
            document.body.removeChild(object.userData.iframe);
          }
          
          const newScreen = createYoutubeScreen(ytSettings.videoId);
          newScreen.position.copy(position);
          newScreen.rotation.copy(rotation);
          newScreen.scale.copy(scale);
          
          selectObject(newScreen);
        }
      }
    };
    ytFolder.add(ytSettings, 'videoId').name('Video ID');
    ytFolder.add(ytSettings, 'update').name('Update Video');
  }

  managementFolder.open();
  Object.values(customizationGui.__folders).forEach(folder => folder.open());
}

function initInteractionControls() {
  renderer.domElement.addEventListener('click', onObjectClick);

  document.addEventListener('keydown', (e) => {
    keyStates[e.key.toLowerCase()] = true;

    if (e.key === 'Delete') {
      deleteSelectedObject();
    }

    if (e.key.toLowerCase() === 'n') {
      createNewObject();
    }
  });
  document.addEventListener('keyup', (e) => keyStates[e.key.toLowerCase()] = false);
}

function onObjectClick(event) {
  event.preventDefault();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const objects = scene.children.filter((obj) => {
    return (
      obj instanceof THREE.Mesh ||
      obj instanceof THREE.Group ||
      obj instanceof THREE.Points
    );
  });

  const intersects = raycaster.intersectObjects(objects, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;

    // If the clicked object is part of an interaction plane
    let parent = clickedObject;
    while (parent && !parent.userData.type) {
      parent = parent.parent;
    }

    if (parent && parent.userData.type) {
      if (selectedObject === parent) {
        deselectObject();
      } else {
        selectObject(parent);
      }
    } else {
      deselectObject();
    }
  } else {
    deselectObject();
  }
}

function selectObject(object) {
  deselectObject();
  selectedObject = object;

  // Outline code
  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.BackSide,
  });
  const outlineMesh = new THREE.Mesh(
    object.geometry.clone(),
    outlineMaterial
  );
  outlineMesh.scale.multiplyScalar(1.05);
  outlineMesh.name = 'outline';
  object.add(outlineMesh);

  createCustomizationGui(object);
}

function deselectObject() {
  if (selectedObject) {
    const outline = selectedObject.getObjectByName('outline');
    if (outline) selectedObject.remove(outline);

    if (customizationGui) {
      customizationGui.destroy();
      customizationGui = null;
    }

    selectedObject = null;
  }
}


function updateWASDControls() {
  const moveSpeed = 0.1;
  if (keyStates['w']) camera.position.z -= moveSpeed;
  if (keyStates['s']) camera.position.z += moveSpeed;
  if (keyStates['a']) camera.position.x -= moveSpeed;
  if (keyStates['d']) camera.position.x += moveSpeed;
}

function animate() {
  requestAnimationFrame(animate);

  updateWASDControls();

  const delta = clock.getDelta();
  const elapsedTime = clock.getElapsedTime();

  quantumParticles.forEach((particle, index) => {
    particle.position.x += Math.sin(elapsedTime * 0.5 + index) * 0.02;
    particle.position.y += Math.cos(elapsedTime * 0.5 + index) * 0.02;
    particle.position.z += Math.sin(elapsedTime * 0.5 + index * 0.5) * 0.02;
  });

  multiversalPortals.forEach((portal, index) => {
    portal.rotation.y += 0.01 * (index + 1);
  });

  if (realityDistortionField) {
    realityDistortionField.rotation.x += 0.001;
    realityDistortionField.rotation.y += 0.002;
  }

  if (cosmicWeb) {
    cosmicWeb.rotation.y += 0.0005;
  }

  if (dimensionalRift) {
    dimensionalRift.rotation.z += 0.002;
  }

  if (timelineManager) {
    timelineManager.rotation.y += 0.001;
  }

  if (consciousnessField) {
    consciousnessField.material.uniforms.time.value += delta;
  }

  controls.update();
  composer.render();
  cssRenderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
}


function onQuantumEntanglement(event) {
  const { particle1, particle2 } = event.detail;
}

function onMultiversalShift(event) {
  const { newUniverse } = event.detail;
  multiversalDisplay.textContent = `Current Universe: ${newUniverse} | Parallel Realities: ∞`;
}

function onConsciousnessExpansion(event) {
  const { level } = event.detail;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  if (!container) {
    console.error('Container element not found');
    return;
  }
  init();
});