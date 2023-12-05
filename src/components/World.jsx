import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import Plane from "./Plane";
import { Physics } from "@react-three/rapier";
import PlayerController from "./PlayerController";

export default function World() {
  return (
    <>
      <OrbitControls makeDefault />
      <axesHelper args={[2]} />
      <color attach="background" args={["#000000"]} />
      <Physics>
        <Lights />
        <Plane />
        <PlayerController />
      </Physics>
    </>
  );
}
