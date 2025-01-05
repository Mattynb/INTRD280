window.onload = function() {
    // Select the specific canvas element
    let canvas = document.getElementById('modelCanvas');

    // Create renderer and attach to the canvas
    let renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: false , antialias: true});
    renderer.setSize(window.innerWidth / 1.25, window.innerHeight / 2);
    
    // Create scene, camera, and lighting
    let scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x424242 );

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    let light = new THREE.DirectionalLight(0xff0000, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    
    // Orbit Controls
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enabled = false
    // Load STL Model
    let loader = new THREE.STLLoader();

    var mesh;
    loader.load('src/models/dna.stl', function (geometry) {
        let material = new THREE.MeshNormalMaterial(); // Material for the mesh
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z = 1.5;
        mesh.position.x = 6; 
        scene.add(mesh);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        
        time = Date.now() * 0.001;
        if (mesh) mesh.rotation.x = time;

        controls.update();
        renderer.render(scene, camera);

        // resize the canvas to fit the window
        renderer.setSize(window.innerWidth / .5, window.innerHeight  / 2);
    }
    animate();
    
    // Adjust the canvas size and camera on window resize
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    
};

