const sceneConfigs = [
    {
        id: 'scene1',
        model: 'assets/models/room.glb',
        cameraPos: [5, 5, 15],
        light: { ambient: 1.0, directional: 0.4, point: 0.2 },
        center: [0, 1, 0]
    },
    {
        id: 'scene2',
        model: 'assets/models/sofa.glb',
        colorId: 'sofaColor',
        materialId: 'sofaMaterial',
        cameraPos: [8, 5, 8],
        light: { ambient: 0.9, directional: 0.5, point: 0.3 },
        center: [0, 1, 0]
    },
    {
        id: 'scene3',
        model: 'assets/models/table.glb',
        colorId: 'tableColor',
        materialId: 'tableMaterial',
        cameraPos: [0, 2, 6],
        light: { ambient: 0.9, directional: 0.6, point: 0.2 },
        center: [0, 1, 0]
    },
    {
        id: 'scene4',
        model: 'assets/models/chair.glb',
        colorId: 'chairColor',
        materialId: 'chairMaterial',
        cameraPos: [0, 2, 6],
        light: { ambient: 0.85, directional: 0.6, point: 0.3 },
        center: [0, 1, 0]
    }
];

sceneConfigs.forEach(config => {
    const container = document.getElementById(config.id);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(...config.cameraPos);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, config.light.ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, config.light.directional);
    dirLight.position.set(5, 10, 7.5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 20;

    const pointLight = new THREE.PointLight(0xffffff, config.light.point);
    pointLight.position.set(0, 2, 2);

    scene.add(ambientLight, dirLight, pointLight);

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.target.set(...config.center);
    controls.update();

    // Group
    const loader = new THREE.GLTFLoader();
    const group = new THREE.Group();
    scene.add(group);

    let model = null;
    const excludedParts = ['leg', 'base', 'legs'];

    // Shadow-catching floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.ShadowMaterial({ opacity: 0.25 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Load model
    loader.load(config.model, gltf => {
        model = gltf.scene;

        model.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                const name = child.name.toLowerCase();
                const matName = (child.material?.name || '').toLowerCase();
                const isExcluded = excludedParts.some(part => name.includes(part) || matName.includes(part));

                if (config.id !== 'scene1' && !isExcluded) {
                    child.material = new THREE.MeshStandardMaterial({ color: '#6D6D6D' });
                }
            }
        });

        model.position.set(0, 0, 0);
        group.add(model);

        // Color selection
        if (config.colorId) {
            document.getElementById(config.colorId).addEventListener('change', (e) => {
                const color = e.target.value;
                model.traverse(child => {
                    if (child.isMesh) {
                        const name = child.name.toLowerCase();
                        const matName = (child.material?.name || '').toLowerCase();
                        const isExcluded = excludedParts.some(part => name.includes(part) || matName.includes(part));
                        if (!isExcluded && child.material) {
                            child.material.color.set(color);
                        }
                    }
                });
            });
        }

        // Material selection
        if (config.materialId) {
            document.getElementById(config.materialId).addEventListener('change', (e) => {
                applyMaterial(model, e.target.value);
            });

            applyMaterial(model, document.getElementById(config.materialId).value);
        }

        animate();
    });

    // Material application
    function applyMaterial(model, type) {
        const materialProps = {
            linen: { roughness: 1, metalness: 0.1 },
            leather: { roughness: 0.5, metalness: 0.3 },
            velvet: { roughness: 0.9, metalness: 0.2 },
            wood: { roughness: 0.8, metalness: 0.1 },
            glass: { roughness: 0.05, metalness: 0.8, transparent: true, opacity: 0.6 }
        };

        const props = materialProps[type] || { roughness: 0.5, metalness: 0.2 };

        model.traverse(child => {
            if (child.isMesh) {
                const name = child.name.toLowerCase();
                const matName = (child.material?.name || '').toLowerCase();
                const isExcluded = excludedParts.some(part => name.includes(part) || matName.includes(part));

                if (!isExcluded && child.material) {
                    child.material.roughness = props.roughness;
                    child.material.metalness = props.metalness;
                    child.material.transparent = props.transparent || false;
                    child.material.opacity = props.opacity ?? 1;
                }
            }
        });
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.003;
        controls.update();
        renderer.render(scene, camera);
    }

    // Responsive resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
});
