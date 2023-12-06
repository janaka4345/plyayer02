import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import Player from "./Player";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export default function PlayerController() {
  console.log("rendered");
  const playerBody = useRef();
  const characterBody = useRef();
  const cameraRef = useRef();
  // const three = useThree();

  const [subscribeKeys, getKeys] = useKeyboardControls();
  // const mouse = mouseMovement();
  useEffect(() => {
    // console.log(playerBody.current);
    const unsubcribeJump = subscribeKeys(
      (state) => state.jump,
      (pressed) => {
        if (pressed) {
          cameraRef.current.lockPointer();
          // console.log();
        }
        if (!pressed) {
          // console.log("jump", pressed);
        }
      },
    );
    const unsubcribeForward = subscribeKeys(
      (state) => state.forward,
      (pressed) => {
        if (pressed) {
          playerBody.current.setLinvel({ x: 2.0, y: 0.0, z: 0.0 }, true);
          // console.log(playerBody.current.linvel());
        }

        if (!pressed) {
          playerBody.current.linvel(0.0, 0.0, 0.0);
        }
      },
    );
    const unsubcribeBack = subscribeKeys(
      (state) => state.back,
      (pressed) => {
        if (pressed) {
        }
        if (!pressed) {
        }
      },
    );
    const unsubcribeLeft = subscribeKeys(
      (state) => state.left,
      (pressed) => {
        if (pressed) {
        }
        if (!pressed) {
        }
      },
    );
    const unsubcribeRight = subscribeKeys(
      (state) => state.right,
      (pressed) => {
        if (pressed) {
        }
        if (!pressed) {
        }
      },
    );
    const unsubcribeShift = subscribeKeys(
      (state) => state.run,
      (pressed) => {
        if (pressed) {
          return;
        }
        if (!pressed) {
        }
      },
    );
    return () => {
      unsubcribeJump();
      unsubcribeForward();
      unsubcribeBack();
      unsubcribeLeft();
      unsubcribeRight();
      unsubcribeShift();
    };
  }, []);

  // const mouse = mouseMovement();
  const cameraOffset = new Vector3(0, 3, 5);
  useFrame((state, delta) => {
    if (!playerBody.current || !characterBody.current) return;
    // const look = new Vector3().setFromSpherical(
    //   cameraRef.current.getSpherical(),
    // );
    const position = playerBody.current.translation();
    const newposition = position.add(cameraOffset);
    cameraRef.current.setPosition(newposition, true);
  });
  return (
    <RigidBody
      ref={playerBody}
      colliders={false}
      restitution={0.2}
      friction={2}
      position={[0, 5, 0]}
      enabledRotations={[false, true, false]}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <CameraControls ref={cameraRef} />
      <Player ref={characterBody} position={[0, -0.8, 0]} />
      <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
    </RigidBody>
  );
}
