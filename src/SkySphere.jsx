import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Canvas, useLoader } from '@react-three/fiber';
import React from 'react';

// eslint-disable-next-line react/prop-types
export const SkySphere = (props) => {
  const colorMap = useLoader(TextureLoader, props.file);
  return (
    <mesh {...props}>
      <sphereGeometry args={[30, 80, 80]} />
      <meshStandardMaterial map={colorMap} side={THREE.BackSide} />
    </mesh>
  );
};
