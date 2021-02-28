/* What are we doing here? */
/* Creates our scene. */
const scene = new THREE.Scene();

/* This will set up our scene, our camera, and our WebGL Renderer. It's important to note that there are actually several camera types, however, for now we're using Perspective Camera.
The layout of Perspective Camera is as follows: ex: PerspectiveCamera(fov, aspect, near, far).
After defining the type of our camera, we need to define our FOV - ex: PerspectiveCamera(fov, aspect, near, far). This value is written in degrees, and controls the extent of the screen shown by the camera at any given moment.
Secondly, we need to define our aspect ratio. A general rule of thumb is to use the width of the element divided by the height - failure to do this will most likely result in a squished image.
Finally, we need to define our near and far clipping plane. This means that any objects further away from the camera than our defined value of far, or closer than that of near, will not be rendered.
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );


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
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skyboxtest.jpg'), side: THREE.DoubleSide } ), // Right Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skyboxtest.jpg'), side: THREE.DoubleSide } ), // Left Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skyboxtest.jpg'), side: THREE.DoubleSide } ), // Top Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skyboxtest.jpg'), side: THREE.DoubleSide } ), // Bottom Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skyboxtest.jpg'), side: THREE.DoubleSide } ), // Front Side
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('ASSETS/skyboxtest.jpg'), side: THREE.DoubleSide } )  // Back Side
    ];
const material = new THREE.MeshFaceMaterial( cubeMaterials ); // Call our array of textures to apply to the cube.
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

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