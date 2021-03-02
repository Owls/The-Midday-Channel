/* What are we doing here? */
/* Creates our scene. */
const scene = new THREE.Scene();

/*
Here we add fog to our scene. This can be done in one of two ways - liner fog or FogExp2, which is a bit harder to use.
Put simply, we are adding the fog to our scene, defining its color, and the distance at which it renders.
Seems to need to be declared directly after the scene.
 */
const fogColor = new THREE.Color(0xc9aee3);

scene.background = fogColor;
scene.fog = new THREE.Fog(fogColor, 0.00225, 10);

/*
This will set up our scene, our camera, and our WebGL Renderer. It's important to note that there are actually several camera types, however, for now we're using Perspective Camera.
The layout of Perspective Camera is as follows: ex: PerspectiveCamera(fov, aspect, near, far).
After defining the type of our camera, we need to define our FOV - ex: PerspectiveCamera(fov, aspect, near, far). This value is written in degrees, and controls the extent of the screen shown by the camera at any given moment.
Secondly, we need to define our aspect ratio. A general rule of thumb is to use the width of the element divided by the height - failure to do this will most likely result in a squished image.
Finally, we need to define our near and far clipping plane. This means that any objects further away from the camera than our defined value of far, or closer than that of near, will not be rendered.
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

spotLight = new THREE.SpotLight(0x433939, 1.5);
spotLight.position.set( 10000, 10000, 10000 );
scene.add(spotLight);

/*
This is our renderer. It's important to note that there are several types of renderer we can use, however, here we're using the WebGL renderer. Largely, those are used as alternatives for older browsers that do not support WebGL.
After creating our renderer instance, we need to set the size we'd like for our scene to render at. Generally, we would want to use the width and height of the area we'd like to fill with our application - in this particular instance,
we're using the width and height of the browser. If your application is performance heavy, you can give setSize smaller values ex. (window.innerWidth/2 and window.innerHeight/2) which would make the application render at half size, assuming your <canvas> is at 100%.
Finally, we add the renderer element to our HTML document - this uses the <canvas> element to render our scene.
 */
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*
This applies a control scheme, namely, Orbit Controls. As with much of Three.js, there are other controls we can use, but for testing purposes, these work fine. Requires OrbitControls.js. Remember to place after defining our camera and renderer.
 */
controls = new THREE.OrbitControls( camera, renderer.domElement );

/*
Here, we are adding an audio source to our camera. I'd argue, generally, that this would not be best practice, as you'd likely be better off assigning an audio source to an object; this is acceptable for now, however.
We start by initializing our audio listener, and applying it to the camera. We then define what audio is loaded, buffer it, loop it (true), set its volume, and play our sound.
 */
const listener = new THREE.AudioListener();
camera.add( listener );


const sound = new THREE.Audio( listener );


const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'ASSETS/whale.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.5 );
    sound.play();
});

/*
Makes a ground plane.
We start by loading our texture, set it to repeating, set the filter to nearest, and then set it to how many times we'd like it to repeat.
In this instance we're using a 2X2 checkerboard pattern. By repeating and setting the repeat to half the size of the plane each check on the checkerboard will be exactly 1 unit large.
 */
const planeSize = 40;
const loader = new THREE.TextureLoader();
const texture = loader.load('ASSETS/checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

/*
Here, we make a plane geometry, a material for our plane, and a mesh so we can insert it into the scene. By default, a plane exists in XY, though here we have the plane in XZ, so we need to rotate it.
 */
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial
(
    {
        map: texture,
        side: THREE.DoubleSide,
    }
);
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
scene.add(mesh);

/*
To make our cube, we need BoxGeometry. BoxGeometry is an object that contains all the points (vertices) and fill (faces) of our cube.
In addition to defining our geometry, we need a material to apply color to the cube. As with previous segments, Three.js does have several different materials we could use, however, for now we're using MeshBAsicMaterial.
All materials take an object of properties that will be applied to them. In this instance, we're keeping it simple by applying the color Green through Hex.
Next, we need a Mesh. a mesh is an object that takes a geometry and applies a material to it, which can then be inserted into our scene and moved at will.
By default, calling scene.add() will set the coordinates of the object we are adding to (0,0,0). This would cause the camera to be inside of the cube, so, we simply move the camera out a little bit with camera.position.
 */
const geometry = new THREE.BoxGeometry();

/*
Here, we use cubeMaterials to create an array where we can define the texture for each face of the cube.
 */
const cubeMaterials =
    [
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/GameCube/gcright.png'), side: THREE.DoubleSide } ), // Right Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/GameCube/gcleft.png'), side: THREE.DoubleSide } ), // Left Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/GameCube/gctop.png'), side: THREE.DoubleSide } ), // Top Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/GameCube/gcbottom.png'), side: THREE.DoubleSide } ), // Bottom Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/GameCube/gcfront.png'), side: THREE.DoubleSide } ), // Front Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/GameCube/gcback.png'), side: THREE.DoubleSide } ),  // Back Side
    ];

const material = new THREE.MeshFaceMaterial( cubeMaterials ); // Call our array of textures to apply to the cube.
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0.9, 0.9, 0.9); // Spawn point
scene.add(cube);


/*
This is identical to the previous segment in most aspects, except the cube is much larger. Alternatively, instead of using THREE.DoubleSide, you could use THREE.BackSide, which would texture the inside of the cube.
 */
const skyBox = new THREE.BoxGeometry(20, 20, 20);
const skyMaterials =
    [
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skybox/skybox1/1.png'), side: THREE.DoubleSide } ), // Right Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skybox/skybox1/2.png'), side: THREE.DoubleSide } ), // Left Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skybox/skybox1/3.png'), side: THREE.DoubleSide } ), // Top Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skybox/skybox1/4.png'), side: THREE.DoubleSide } ), // Bottom Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skybox/skybox1/5.png'), side: THREE.DoubleSide } ), // Front Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skybox/skybox1/6.png'), side: THREE.DoubleSide } )  // Back Side
    ];

const skyboxMaterials = new THREE.MeshFaceMaterial(skyMaterials);
const skyCube = new THREE.Mesh(skyBox, skyboxMaterials);
scene.add(skyCube);

camera.position.set(1, 1, 3);
/*
In order to move the cube, we need to set up an animation loop.
Basically, this creates a loop where the renderer draws the scene every time the screen is refreshed (generally, 60x a second for most screens). requestAnimationFrame gives us several distinct advantages over setInterval, though most importantly -
it allows us to pause the animation when the User is on another tab, which saves resources.
 */
function animate()
{
    requestAnimationFrame(animate);

    /* Calls our animate function so the cube will do fun things. Anything that you want to move, or animate, will need to be done inside of the animation loop. */
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();