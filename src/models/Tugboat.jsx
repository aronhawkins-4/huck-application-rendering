/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 tugboat.glb --transform 
Files: tugboat.glb [107.29MB] > /Users/aronhawkins/Documents/Projects/huck-application-renderings/tugboat-transformed.glb [1.76MB] (98%)
*/

import React from 'react';
import { useGLTF } from '@react-three/drei';
import BoatFile from '../../public/tugboat-transformed.glb';

export function Tugboat(props) {
  const { nodes, materials } = useGLTF(BoatFile);
  return (
    <group {...props} dispose={null} ref={props.refs}>
      <mesh geometry={nodes.body_guard_nose.geometry} material={materials['armchair.001']} scale={0.5} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}

useGLTF.preload(BoatFile);
