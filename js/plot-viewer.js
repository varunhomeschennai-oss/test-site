import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.166.1/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById("propertyViewerCanvas");
const wrap = document.getElementById("plotCanvasWrap");

if (canvas && wrap) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setClearColor(0xf1eee8);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1eee8);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 180);
  const defaultCamera = new THREE.Vector3(16, 24, 28);
  const defaultTarget = new THREE.Vector3(0, 0, 0);
  camera.position.copy(defaultCamera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 13;
  controls.maxDistance = 58;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.target.copy(defaultTarget);
  controls.update();

  const textureLoader = new THREE.TextureLoader();
  const planTexture = textureLoader.load("images/1bhk.png");
  planTexture.colorSpace = THREE.SRGBColorSpace;
  planTexture.anisotropy = 8;

  const home = new THREE.Group();
  scene.add(home);

  addLights();
  buildOneBhkModel();
  bindControls();
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("fullscreenchange", resize);
  animate();

  function addLights() {
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc9bda8, 1.65));

    const sun = new THREE.DirectionalLight(0xfff3da, 3.2);
    sun.position.set(-18, 34, 24);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -24;
    sun.shadow.camera.right = 24;
    sun.shadow.camera.top = 24;
    sun.shadow.camera.bottom = -24;
    scene.add(sun);

    const softFill = new THREE.DirectionalLight(0xbfd9ff, .8);
    softFill.position.set(18, 16, -18);
    scene.add(softFill);
  }

  function buildOneBhkModel() {
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xe8e0d3, roughness: .72 });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf7f3ea, roughness: .66 });
    const brickMat = new THREE.MeshStandardMaterial({ color: 0x9a553e, roughness: .78 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xa7703f, roughness: .58 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x9fc3ce, roughness: .18, metalness: .08, transparent: true, opacity: .68 });
    const stairMat = new THREE.MeshStandardMaterial({ color: 0xb66f31, roughness: .55 });
    const fabricMat = new THREE.MeshStandardMaterial({ color: 0xd4cbc0, roughness: .84 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3332, roughness: .5 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(13.6, .45, 19.6), baseMat);
    base.position.y = .18;
    base.castShadow = true;
    base.receiveShadow = true;
    home.add(base);

    const plan = new THREE.Mesh(
      new THREE.PlaneGeometry(12.7, 18.4),
      new THREE.MeshStandardMaterial({ map: planTexture, roughness: .55, side: THREE.DoubleSide })
    );
    plan.rotation.x = -Math.PI / 2;
    plan.position.y = .43;
    plan.receiveShadow = true;
    home.add(plan);

    addWall(0, -9.25, 13.2, .38, 2.2, wallMat);
    addWall(0, 9.25, 13.2, .38, 2.2, wallMat);
    addWall(-6.6, 0, .38, 18.5, 2.2, wallMat);
    addWall(6.6, 0, .38, 18.5, 2.2, wallMat);
    addWall(0, -9.52, 12.8, .28, .72, brickMat, .42);

    addWall(-2.1, 1.1, .32, 16.2, 2, wallMat);
    addWall(2.55, 2.1, .32, 9.4, 2, wallMat);
    addWall(4.62, 1.35, 3.7, .32, 2, wallMat);
    addWall(-4.45, 3.4, 4.1, .32, 2, wallMat);
    addWall(1.35, 6.2, 8.6, .32, 2, wallMat);
    addWall(4.55, -1.75, 3.8, .32, 2, wallMat);

    addWindow(-6.68, -4.3, .15, 3.8, glassMat, "side");
    addWindow(-6.68, 3.9, .15, 2.1, glassMat, "side");
    addWindow(0.1, -9.7, 4.4, .15, glassMat, "front");
    addWindow(3.3, 9.48, 3.3, .15, glassMat, "back");
    addWindow(-4.2, 9.48, 1.5, .15, glassMat, "back");
    addWindow(6.78, 2.4, .15, 1.6, glassMat, "side");

    addDoor(-4.2, -9.72, woodMat, "front");
    addDoor(5.2, -9.72, woodMat, "front");
    addDoor(1.1, 1.25, woodMat, "side");
    addDoor(3.1, -1.75, woodMat, "front");

    addStairs(4.8, -4.5, stairMat);
    addBed(3.3, 5.8, fabricMat, woodMat);
    addSofa(-4.85, -4.8, fabricMat);
    addSofa(3.15, -4.1, fabricMat);
    addTable(-2.8, -2.15, woodMat);
    addKitchen(-4.95, 5.45, woodMat, darkMat);
    addToilet(4.35, 1.05, wallMat, darkMat);
    addCabinet(.25, 4.65, woodMat);
    addPlant(-5.2, -1.2);
    addPlant(3.05, 1.05);

    const label = makeTextSprite("1BHK Floor Plan");
    label.position.set(0, 3.2, -10.2);
    label.scale.set(5.8, 1.5, 1);
    home.add(label);
  }

  function addWall(x, z, w, d, h, mat, y = 1.45) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    wall.position.set(x, y, z);
    wall.castShadow = true;
    wall.receiveShadow = true;
    home.add(wall);
  }

  function addWindow(x, z, w, d, mat, direction) {
    const glass = new THREE.Mesh(new THREE.BoxGeometry(w, 1.05, d), mat);
    glass.position.set(x, 1.55, z);
    glass.castShadow = true;
    home.add(glass);

    const frameSize = direction === "side" ? [w + .08, 1.18, .08] : [w + .08, 1.18, .08];
    const frame = new THREE.Mesh(new THREE.BoxGeometry(...frameSize), new THREE.MeshStandardMaterial({ color: 0x68442b, roughness: .55 }));
    frame.position.copy(glass.position);
    home.add(frame);
  }

  function addDoor(x, z, mat, direction) {
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.55, .12), mat);
    door.position.set(x, 1.05, z);
    if (direction === "side") door.rotation.y = Math.PI / 2;
    door.castShadow = true;
    home.add(door);
  }

  function addStairs(x, z, mat) {
    for (let i = 0; i < 8; i += 1) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(2.45, .18, .62), mat);
      step.position.set(x, .55 + i * .1, z + i * .48);
      step.castShadow = true;
      step.receiveShadow = true;
      home.add(step);
    }
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.09, 1.2, 4.4), new THREE.MeshStandardMaterial({ color: 0xc9c9c9, roughness: .25, metalness: .4 }));
    rail.position.set(x - 1.38, 1.25, z + 1.7);
    rail.castShadow = true;
    home.add(rail);
  }

  function addBed(x, z, fabricMat, woodMat) {
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.7, .42, 3.4), fabricMat);
    base.position.set(x, .82, z);
    base.castShadow = true;
    home.add(base);

    const pillow = new THREE.Mesh(new THREE.BoxGeometry(2.45, .28, .62), new THREE.MeshStandardMaterial({ color: 0xf4f0ea, roughness: .8 }));
    pillow.position.set(x, 1.18, z + 1.08);
    pillow.castShadow = true;
    home.add(pillow);

    [-1.85, 1.85].forEach((side) => {
      const table = new THREE.Mesh(new THREE.BoxGeometry(.62, .55, .72), woodMat);
      table.position.set(x + side, .76, z + .9);
      table.castShadow = true;
      home.add(table);
    });
  }

  function addSofa(x, z, mat) {
    const sofa = new THREE.Mesh(new THREE.BoxGeometry(2.7, .72, .92), mat);
    sofa.position.set(x, .8, z);
    sofa.castShadow = true;
    home.add(sofa);
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.7, .9, .25), mat);
    back.position.set(x, 1.05, z + .48);
    back.castShadow = true;
    home.add(back);
  }

  function addTable(x, z, mat) {
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.75, .18, 1.15), mat);
    table.position.set(x, .82, z);
    table.castShadow = true;
    home.add(table);
  }

  function addKitchen(x, z, woodMat, darkMat) {
    const counter = new THREE.Mesh(new THREE.BoxGeometry(2.85, .75, .62), woodMat);
    counter.position.set(x, .83, z);
    counter.castShadow = true;
    home.add(counter);
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.9, .08, .68), darkMat);
    top.position.set(x, 1.24, z);
    top.castShadow = true;
    home.add(top);
  }

  function addToilet(x, z, wallMat, darkMat) {
    const sink = new THREE.Mesh(new THREE.BoxGeometry(.7, .42, .52), wallMat);
    sink.position.set(x - .72, .78, z);
    sink.castShadow = true;
    home.add(sink);
    const wc = new THREE.Mesh(new THREE.CylinderGeometry(.32, .36, .34, 20), wallMat);
    wc.position.set(x + .55, .72, z - .15);
    wc.castShadow = true;
    home.add(wc);
    const tile = new THREE.Mesh(new THREE.BoxGeometry(2.4, .04, 2.1), new THREE.MeshStandardMaterial({ color: 0xc6c8c4, roughness: .9 }));
    tile.position.set(x, .48, z);
    tile.receiveShadow = true;
    home.add(tile);
  }

  function addCabinet(x, z, mat) {
    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(.7, 1.8, 2.2), mat);
    cabinet.position.set(x, 1.3, z);
    cabinet.castShadow = true;
    home.add(cabinet);
  }

  function addPlant(x, z) {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.06, .09, .55, 8), new THREE.MeshStandardMaterial({ color: 0x6a432d, roughness: .8 }));
    trunk.position.set(x, .85, z);
    trunk.castShadow = true;
    home.add(trunk);
    const top = new THREE.Mesh(new THREE.ConeGeometry(.42, .85, 8), new THREE.MeshStandardMaterial({ color: 0x3f7a3f, roughness: .85 }));
    top.position.set(x, 1.35, z);
    top.castShadow = true;
    home.add(top);
  }

  function makeTextSprite(text) {
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 512;
    labelCanvas.height = 128;
    const ctx = labelCanvas.getContext("2d");
    ctx.fillStyle = "rgba(255,255,255,.92)";
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = "#1e1e1e";
    ctx.font = "900 44px Inter, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 256, 64);
    const texture = new THREE.CanvasTexture(labelCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  }

  function bindControls() {
    document.getElementById("plotZoomIn")?.addEventListener("click", () => dolly(.84));
    document.getElementById("plotZoomOut")?.addEventListener("click", () => dolly(1.16));
    document.getElementById("plotRotateLeft")?.addEventListener("click", () => rotateCamera(-Math.PI / 10));
    document.getElementById("plotRotateRight")?.addEventListener("click", () => rotateCamera(Math.PI / 10));
    document.getElementById("plotResetCamera")?.addEventListener("click", resetCamera);
    document.getElementById("plotFullscreen")?.addEventListener("click", () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        wrap.requestFullscreen?.();
      }
    });
  }

  function dolly(factor) {
    camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);
    controls.update();
  }

  function rotateCamera(angle) {
    const offset = camera.position.clone().sub(controls.target);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  }

  function resetCamera() {
    camera.position.copy(defaultCamera);
    controls.target.copy(defaultTarget);
    controls.update();
  }

  function resize() {
    const rect = wrap.getBoundingClientRect();
    const width = Math.max(320, rect.width);
    const height = Math.max(420, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
}
