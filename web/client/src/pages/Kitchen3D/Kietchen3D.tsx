import { useEffect, useRef } from "preact/hooks";
import { createKitchenScene } from "../../three/kitchenScene";
import { createStove, createTable } from "../../three/objects";
import { FunctionalComponent } from "preact";

const Kitchen3D: FunctionalComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const { scene, camera, renderer } =
      createKitchenScene(ref.current);

    const stove = createStove();
    const table = createTable();
    scene.add(stove, table);

    let running = true;
    function loop() {
      if (!running) return;
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    loop();

    return () => {
      running = false;
      renderer.dispose();
      ref.current!.innerHTML = "";
    };
  }, []);

   return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref} />
  );
}
export default Kitchen3D;
