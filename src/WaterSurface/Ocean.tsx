import * as THREE from 'three';
import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three-stdlib';
import WaterNormalsFile from '../../public/water/waternormals.jpeg';

extend({ Water });

export function Ocean(props) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, WaterNormalsFile);
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(256, 256), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta / 4));
  useEffect(() => {
    if (ref.current) {
      console.log(ref.current);
    }
  }, []);
  return (
    <mesh {...props} ref={props.refs} receiveShadow>
      <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} receiveShadow />
    </mesh>
  );
}
