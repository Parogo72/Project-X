function Light({ brightness, color, position }) {
    return (
      <spotLight
        color={color}
        intensity={brightness}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow={true}
        shadowCamera
        angle={0.3}
        position={position}
      />
    );
  }

export default Light;