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
    const unsubsribeAnimation = useStateEngine.subscribe(
      (state) => state.currentState,
      (value) => {
        currAnimation.current = value;
        // console.log("cur:", value);
        // actions[prevAnimation.current].fadeOut(0.5);
        // actions[value].reset().fadeIn(0.5).play();
      },
    );
    const unsubcribeJump = subscribeKeys(
      (state) => state.jump,
      (pressed) => {
        if (pressed) {
          // console.log();
          setAnimationState("TPose");
        }
        if (!pressed) {
          // console.log("jump", pressed);
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeForward = subscribeKeys(
      (state) => state.forward,
      (pressed) => {
        if (pressed) {
          setAnimationState("Walk");
        }

        if (!pressed) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeBack = subscribeKeys(
      (state) => state.back,
      (pressed) => {
        if (pressed) {
          setAnimationState("Walk");
        }
        if (!pressed) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeLeft = subscribeKeys(
      (state) => state.left,
      (pressed) => {
        if (pressed) {
          // playerBody.current.applyTorqueImpulse({ x: 0, y: 0.1, z: 0 }, true);
          setAnimationState("Walk");
        }
        if (!pressed) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeRight = subscribeKeys(
      (state) => state.right,
      (pressed) => {
        if (pressed) {
          // playerBody.current.applyTorqueImpulse({ x: 0, y: -0.1, z: 0 }, true);
          setAnimationState("Walk");
        }
        if (!pressed) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeShift = subscribeKeys(
      (state) => state.run,
      (pressed) => {
        if (pressed && currAnimation.current === "Walk") {
          setAnimationState("Run");
          return;
        }
        if (!pressed && currAnimation.current === "Walk") {
          setAnimationState("Walk");
          return;
        }
        if (!pressed) {
          setAnimationState("Idle");
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
      unsubsribeAnimation();
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
      <group ref={characterBody}>
        {/* <Player position={[0, -0.8, 0]} /> */}
      </group>
      {/* <Player02 position={[0, -0.8, 0]} /> */}
      <Player03 position={[0, -0.8, 0]} />
      <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
    </RigidBody>
  );
}
