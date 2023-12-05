import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import Player from "./Player";
import { useFrame, useThree } from "@react-three/fiber";
import { mouseMovement } from "../lib/mouseMovement";

export default function PlayerController() {
  console.log("rendered");
  const playerBody = useRef();
  const characterBody = useRef();
  const cameraRef = useRef();
  const three = useThree();

  const [subscribeKeys, getKeys] = useKeyboardControls();
  // const mouse = mouseMovement();
  useEffect(() => {
    console.log(cameraRef.current);

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
        }

        if (!pressed) {
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
  useFrame((state, delta) => {
    console.log(cameraRef.current.getSpherical());
  });
  return (
    <RigidBody
      ref={playerBody}
      colliders={false}
      restitution={0.2}
      friction={2}
      position={[0, 5, 0]}
      // enabledRotations={[false, true, false]}
      // linearDamping={0.5}
      // angularDamping={0.5}
    >
      <CameraControls ref={cameraRef} />
      <Player position={[0, -0.8, 0]} />
      <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
    </RigidBody>
  );
}
