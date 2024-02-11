import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { SharedValue } from "react-native-reanimated";
import { useFrame } from "@react-three/fiber";
import { useWindowDimensions } from "react-native";

type GLTFResult = GLTF & {
    nodes: {
        shoe: THREE.Mesh;
        shoe_1: THREE.Mesh;
        shoe_2: THREE.Mesh;
        shoe_3: THREE.Mesh;
        shoe_4: THREE.Mesh;
        shoe_5: THREE.Mesh;
        shoe_6: THREE.Mesh;
        shoe_7: THREE.Mesh;
    };
    materials: {
        mesh: THREE.MeshStandardMaterial;
        sole: THREE.MeshStandardMaterial;
        stripes: THREE.MeshStandardMaterial;
        band: THREE.MeshStandardMaterial;
        caps: THREE.MeshStandardMaterial;
        patch: THREE.MeshStandardMaterial;
        inner: THREE.MeshStandardMaterial;
        laces: THREE.MeshStandardMaterial;
    };
};

type Props = {
    baseColor: string,
    soleColor: string,
    position: SharedValue<number>,
    direction:'x'|'y',
}

const Shoe = ({ baseColor, soleColor, position,direction }: Props) => {
    const { width } = useWindowDimensions()
    const { nodes, materials } = useGLTF(require("../../assets/3DShopAssets/shoe.glb")) as GLTFResult;
    const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

    useFrame(() => (ref.current!.rotation[`${direction}`] = position.value / (width / 8)))
    return (
        <group ref={ref} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shoe.geometry}
                material={materials.mesh}
                material-color={baseColor}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shoe_1.geometry}
                material={materials.sole}
                material-color={soleColor}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shoe_2.geometry}
                material={materials.stripes}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shoe_3.geometry}
                material={materials.band}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shoe_4.geometry}
                material={materials.caps}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shoe_5.geometry}
                material={materials.patch}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shoe_6.geometry}
                material={materials.inner}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shoe_7.geometry}
                material={materials.laces}
            />
        </group>
    );
}

export default Shoe

