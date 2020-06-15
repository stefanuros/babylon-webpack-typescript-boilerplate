import { Engine, SceneLoader, HemisphericLight, Vector3, ArcRotateCamera, Scene } from 'babylonjs';
import 'babylonjs-loaders';

// Import our glTF model.
import gltf from '../assets/aviao_low_poly/scene.gltf';

// Create the engine and scene, which will consist of one light and the main camera.
const canvas = document.getElementById('canvas');
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
const light = new HemisphericLight("HemiLight", new Vector3(0, 1, 0), scene);
const camera = new ArcRotateCamera("camera1", 0, 1, 220, new Vector3(0, 0, 0), scene);
camera.position = new Vector3(15, 15, 15);
camera.attachControl(canvas, false);

// Load the glTF model and add it to the scene.
// SceneLoader.Append("/", gltf, scene);

// Instruct the engine to resize when the window does.
window.addEventListener('resize', () => engine.resize());

// Start the engine's main render loop.
engine.runRenderLoop(() => scene.render());

showWorldAxis(100);

loadPlane();

async function loadPlane() {
  console.log("PLANE HERE")
  let plane = await SceneLoader.ImportMeshAsync(null, '/', gltf, scene);
  console.log(plane);
  plane.meshes[0].rotation = new Vector3(0, Math.PI + Math.PI/4, 0);
}

function showWorldAxis(size) {
  var makeTextPlane = function (text, color, size) {
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
    var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backFaceCulling = false;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
  };
  var axisX = BABYLON.Mesh.CreateLines("axisX", [
    BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
    new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
  ], scene);
  axisX.color = new BABYLON.Color3(1, 0, 0);
  var xChar = makeTextPlane("X", "red", size / 10);
  xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
  var axisY = BABYLON.Mesh.CreateLines("axisY", [
    BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
    new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
  ], scene);
  axisY.color = new BABYLON.Color3(0, 1, 0);
  var yChar = makeTextPlane("Y", "green", size / 10);
  yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
  var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
    BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
    new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
  ], scene);
  axisZ.color = new BABYLON.Color3(0, 0, 1);
  var zChar = makeTextPlane("Z", "blue", size / 10);
  zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};
