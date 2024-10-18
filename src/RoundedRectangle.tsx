import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

export const RoundedRectangle = ({ width, height, radius, color }) => {
  const shape = new THREE.Shape();

  const x = -width / 2;
  const y = -height / 2;

  // Start the shape at the top left corner
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.absarc(x + width - radius, y + radius, radius, Math.PI * 1.5, 0, false);
  shape.lineTo(x + width, y + height - radius);
  shape.absarc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5, false);
  shape.lineTo(x + radius, y + height);
  shape.absarc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI, false);
  shape.lineTo(x, y + radius);
  shape.absarc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false);

  // Create the geometry from the shape
  const geometry = new THREE.ShapeGeometry(shape);

  return <mesh geometry={geometry}></mesh>;
};
