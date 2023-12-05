import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import useStateEngine from "../useStateEngine";
import { Player } from "./Player";
import { useFrame } from "@react-three/fiber";

export function PlayerController() {
  const playerBody = useRef();
  const characterBody = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useEffect(() => {
    const unsubcribeJump = subscribeKeys(
      (state) => state.jump,
      (pressed) => {
        if (pressed) {
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
          // playerBody.current.applyTorqueImpulse({ x: 0, y: 0.1, z: 0 }, true);
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

  useFrame((state, delta) => {});
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
      <group ref={characterBody}></group>
      <Player03 position={[0, -0.8, 0]} />
      <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
    </RigidBody>
  );
}
