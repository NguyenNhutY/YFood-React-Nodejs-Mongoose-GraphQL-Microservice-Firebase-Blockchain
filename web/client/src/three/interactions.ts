import * as THREE from "three";

export function enableDrag(
  camera: THREE.Camera,
  dom: HTMLElement,
  objects: THREE.Object3D[]
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selected: THREE.Object3D | null = null;

  dom.addEventListener("mousedown", (e) => {
    mouse.x = (e.offsetX / dom.clientWidth) * 2 - 1;
    mouse.y = -(e.offsetY / dom.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hit = raycaster.intersectObjects(objects);
    selected = hit[0]?.object || null;
  });

  dom.addEventListener("mousemove", (e) => {
    if (!selected) return;
    selected.position.x += e.movementX * 0.01;
    selected.position.z -= e.movementY * 0.01;
  });

  dom.addEventListener("mouseup", () => (selected = null));
}
