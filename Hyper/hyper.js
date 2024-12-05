let virtualScene, perspectiveCamera, webRenderer, visualComposer, cameraControls, physicsWorld, gameTimer;
    let quantumFileManager, virtualWindowManager, systemTaskbar;
    let physicsBodies = [];
    let aiNeuralNetwork, quantumCircuitDiagram;
    let quantumParticles = [];
    let multiversalPortals = [];
    let realityDistortionField;
    let cosmicInterconnectionWeb;
    let dimensionalRift;
    let timelineCoordinator;
    let consciousnessEnergyField;
    let multiversalUserInterface;
    let selectedObject = null;
    let customizationGui = null;
    let keyStates = {};
    
    function init() {
      virtualScene = new THREE.Scene();
      perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      webRenderer = new THREE.WebGLRenderer({ antialias: true });
      webRenderer.setSize(window.innerWidth, window.innerHeight);
      webRenderer.shadowMap.enabled = true;
      webRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
      document.getElementById('container').appendChild(webRenderer.domElement);
    
      gameTimer = new THREE.Clock();
    
      physicsWorld = new CANNON.World();
      physicsWorld.gravity.set(0, 0, 0);
      physicsWorld.broadphase = new CANNON.SAPBroadphase(physicsWorld);
      physicsWorld.solver.iterations = 50;
      physicsWorld.solver.tolerance = 0.00001;
    
      perspectiveCamera.position.set(0, 5, 10);
      cameraControls = new THREE.OrbitControls(perspectiveCamera, webRenderer.domElement);
      cameraControls.target.set(0, 0, 0);
      cameraControls.update();
      cameraControls.enableDamping = true;
      cameraControls.dampingFactor = 0.05;
    
      const ambientLight = new THREE.AmbientLight(0x00ffff, 0.5);
      virtualScene.add(ambientLight);
    
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 7.5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 4096;
      directionalLight.shadow.mapSize.height = 4096;
      virtualScene.add(directionalLight);
    
      const renderScene = new THREE.RenderPass(virtualScene, perspectiveCamera);
      const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
      bloomPass.threshold = 0.2;
      bloomPass.strength = 1.5;
      bloomPass.radius = 0.8;
    
      visualComposer = new THREE.EffectComposer(webRenderer);
      visualComposer.addPass(renderScene);
      visualComposer.addPass(bloomPass);
    
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
    
      document.getElementById('loading').style.display = 'none';
      multiversalUserInterface = document.getElementById('multiversal-display');
    
      document.getElementById('create-object-btn').addEventListener('click', () => {
          showObjectCreationDialog();
      });
    
      animate();
      initInteractionControls();
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
    
    function createYoutubeScreen(videoId = 'yJ7R3jxSF_g') {
      const screen = createNewObject('screen');
      
      const position = findFreePosition();
      screen.position.copy(position);
      screen.rotation.set(0, 0, 0);   
    
      const texture = createVideoTexture(videoId);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });
      
      screen.material = material;
      screen.userData.type = 'youtube-screen';
      screen.userData.videoId = videoId;
    
      return screen;
    }
    
    function createVideoTexture(videoId) {
      const existingIframe = document.querySelector(`iframe[data-video-id="${videoId}"]`);
      if (existingIframe) {
        document.body.removeChild(existingIframe);
      }

      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.top = '-9999px';  // Move off-screen
      iframe.style.left = '-9999px';
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      iframe.width = '640';
      iframe.height = '360';
      iframe.setAttribute('data-video-id', videoId);
  
      // Modify iframe attributes to address permission policies
      iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
  
      // Use privacy-enhanced mode with additional parameters
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?` + 
        'enablejsapi=1&' +
        'autoplay=0&' +
        'mute=1&' +
        'playsinline=1&' +  // Inline playback on mobile
        'fs=1&' +  // Enable fullscreen
        'rel=0';  // Disable related videos
  
      // Add sandbox attribute to restrict iframe capabilities
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  
      document.body.appendChild(iframe);

      // Create a canvas texture with a gradient background
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e5799');    // Dark blue
      gradient.addColorStop(0.5, '#7db9e8');  // Light blue
      gradient.addColorStop(1, '#1e5799');    // Dark blue
      
      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add video ID text
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Video: ${videoId}`, canvas.width / 2, canvas.height / 2);
  
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
  
      // Optional: Attempt to load video metadata
      iframe.addEventListener('load', () => {
        try {
          // Create a promise to resolve when metadata is loaded
          const metadataPromise = new Promise((resolve, reject) => {
            const ytScript = document.createElement('script');
            ytScript.src = 'https://www.youtube.com/iframe_api';
            ytScript.onload = () => {
              window.onYouTubeIframeAPIReady = () => {
                try {
                  const player = new YT.Player(iframe, {
                    events: {
                      'onReady': (event) => {
                        const videoTitle = event.target.getVideoData().title;
                        
                        // Redraw canvas with video title
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        
                        ctx.fillStyle = 'white';
                        ctx.font = '20px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(`Video: ${videoTitle}`, canvas.width / 2, canvas.height / 2 - 30);
                        ctx.font = '16px Arial';
                        ctx.fillText(`ID: ${videoId}`, canvas.width / 2, canvas.height / 2 + 30);
                        
                        texture.needsUpdate = true;
                        resolve();
                      }
                    }
                  });
                } catch (playerError) {
                  console.warn('Could not create YouTube player:', playerError);
                  reject(playerError);
                }
              };
            };
            ytScript.onerror = reject;
            document.head.appendChild(ytScript);
          });

          // Handle any potential errors
          metadataPromise.catch((error) => {
            console.warn('Could not load video metadata:', error);
          });
        } catch (error) {
          console.warn('Could not process video texture:', error);
        }
      });

      return texture;
    }
    
    function findFreePosition() {
      const position = new THREE.Vector3();
      const existingScreens = virtualScene.children.filter(obj => 
        obj.userData && obj.userData.type === 'youtube-screen'
      );
    
      position.set(0, 2, -5);
    
      if (existingScreens.length > 0) {
        position.x = Math.max(...existingScreens.map(s => s.position.x)) + 4;
      }
    
      return position;
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
        virtualScene.add(particle);
        quantumParticles.push(particle);
      }
    }
    
    function createQuantumAIFileManager() {
      quantumFileManager = new THREE.Group();
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8
      });
      const file = new THREE.Mesh(geometry, material);
      quantumFileManager.add(file);
      virtualScene.add(quantumFileManager);
    }
    
    function createQuantum3DWindowManager() {
      virtualWindowManager = new THREE.Group();
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.5
      });
      const window = new THREE.Mesh(geometry, material);
      virtualWindowManager.add(window);
      virtualScene.add(virtualWindowManager);
    }
    
    function createQuantumTaskbar() {
      systemTaskbar = new THREE.Group();
      const geometry = new THREE.BoxGeometry(10, 0.5, 0.1);
      const material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.7
      });
      const bar = new THREE.Mesh(geometry, material);
      systemTaskbar.add(bar);
      virtualScene.add(systemTaskbar);
    }
    
    function createQuantumCircuit() {
      const canvas = document.getElementById('circuit-diagram');
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
        virtualScene.add(portal);
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
      virtualScene.add(realityDistortionField);
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
      cosmicInterconnectionWeb = new THREE.Points(geometry, material);
      virtualScene.add(cosmicInterconnectionWeb);
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
      virtualScene.add(dimensionalRift);
    }
    
    function createTimelineManager() {
      const geometry = new THREE.SphereGeometry(2, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        wireframe: true
      });
      timelineCoordinator = new THREE.Mesh(geometry, material);
      virtualScene.add(timelineCoordinator);
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
      consciousnessEnergyField = new THREE.Mesh(geometry, material);
      consciousnessEnergyField.rotation.x = -Math.PI / 2;
      consciousnessEnergyField.position.y = -5;
      virtualScene.add(consciousnessEnergyField);
    }
    
    function deleteSelectedObject() {
      if (selectedObject) {
        virtualScene.remove(selectedObject);
        deselectObject();
      }
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
      virtualScene.add(object);
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
              
              virtualScene.remove(object);
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
      webRenderer.domElement.addEventListener('click', onObjectClick);
    
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
    
      raycaster.setFromCamera(mouse, perspectiveCamera);
    
      const objects = virtualScene.children.filter(obj =>
        obj.type === 'Mesh' ||
        obj.type === 'Group' ||
        obj.type === 'Points'
      );
    
      const intersects = raycaster.intersectObjects(objects, true);
    
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
    
        if (selectedObject === clickedObject) {
          deselectObject();
        } else {
          selectObject(clickedObject);
        }
      } else {
        deselectObject();
      }
    }
    
    function selectObject(object) {
      deselectObject();
      selectedObject = object;
    
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.BackSide
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
      if (keyStates['w']) perspectiveCamera.position.z -= moveSpeed;
      if (keyStates['s']) perspectiveCamera.position.z += moveSpeed;
      if (keyStates['a']) perspectiveCamera.position.x -= moveSpeed;
      if (keyStates['d']) perspectiveCamera.position.x += moveSpeed;
    }
    
    function animate() {
      requestAnimationFrame(animate);
    
      updateWASDControls();
    
      const delta = gameTimer.getDelta();
      const elapsedTime = gameTimer.getElapsedTime();
    
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
    
      if (cosmicInterconnectionWeb) {
        cosmicInterconnectionWeb.rotation.y += 0.0005;
      }
    
      if (dimensionalRift) {
        dimensionalRift.rotation.z += 0.002;
      }
    
      if (timelineCoordinator) {
        timelineCoordinator.rotation.y += 0.001;
      }
    
      if (consciousnessEnergyField) {
        consciousnessEnergyField.material.uniforms.time.value += delta;
      }
    
      cameraControls.update();
      visualComposer.render();
    }
    
    function onWindowResize() {
      perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
      perspectiveCamera.updateProjectionMatrix();
      webRenderer.setSize(window.innerWidth, window.innerHeight);
      visualComposer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function onQuantumEntanglement(event) {
      const { particle1, particle2 } = event.detail;
    }
    
    function onMultiversalShift(event) {
      const { newUniverse } = event.detail;
      multiversalUserInterface.textContent = `Current Universe: ${newUniverse} | Parallel Realities: ∞`;
    }
    
    function onConsciousnessExpansion(event) {
      const { level } = event.detail;
    }
    
    window.addEventListener('load', () => {
      // Ensure all dependencies are loaded before initialization
      const requiredLibs = [
        window.THREE, 
        window.CANNON, 
        window.dat
      ];

      if (requiredLibs.every(lib => lib)) {
        init();
      } else {
        console.error('Required libraries not loaded:', {
          THREE: !!window.THREE,
          CANNON: !!window.CANNON,
          dat: !!window.dat
        });
      }
    });