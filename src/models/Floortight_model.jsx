/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 floortight_model.glb --transform 
Files: floortight_model.glb [6.85MB] > /Users/aronhawkins/Documents/Projects/huck-application-rendering/floortight_model-transformed.glb [448.76KB] (93%)
*/

import React from 'react';
import { useGLTF } from '@react-three/drei';
import FloorTightFile from '../../public/floortight_model-transformed.glb';

export function FloorTightBolt(props) {
  const { nodes, materials } = useGLTF(FloorTightFile);
  return (
    <group {...props} dispose={null} ref={props.refs}>
      <mesh geometry={nodes['1_1'].geometry} material={materials.Steel} />
      <mesh geometry={nodes['1_2'].geometry} material={materials['Brushed Copper']} />
    </group>
  );
}

useGLTF.preload(FloorTightFile);
