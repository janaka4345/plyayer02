import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";

export default function Player(props) {
  const group = useRef();

  const { nodes, materials, animations } = useGLTF("./Soldier.glb");
  // console.log(animations);
  const { actions, mixer } = useAnimations(animations, group);
  // const [subscribeKeys, getKeys] = useKeyboardControls();

  useEffect(() => {}, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name="Scene"
        userData={{
          background_color: [
            0.05087608844041824, 0.05087608844041824, 0.05087608844041824,
          ],
          frames_per_second: 30,
        }}
      >
        <group
          name="Character"
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={0.01}
          userData={{ name: "Character" }}
        >
          <skinnedMesh
            castShadow
            name="vanguard_Mesh"
            geometry={nodes.vanguard_Mesh.geometry}
            material={materials.VanguardBodyMat}
            skeleton={nodes.vanguard_Mesh.skeleton}
            userData={{ name: "vanguard_Mesh" }}
          />
          <skinnedMesh
            name="vanguard_visor"
            geometry={nodes.vanguard_visor.geometry}
            material={materials.Vanguard_VisorMat}
            skeleton={nodes.vanguard_visor.skeleton}
            userData={{ name: "vanguard_visor" }}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Soldier.glb");
