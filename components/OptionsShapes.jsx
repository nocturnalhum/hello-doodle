import React from 'react';
import { Slider } from './ui/slider';
import { useCanvasContext } from '@/contextAPI/context';
import ToggleSwitch from './ToggleSwitch';

export default function OptionsRect() {
  const {
    color,
    radius,
    setRadius,
    shapeRoughness,
    setShapeRoughness,
    useFill,
    setUseFill,
    hachureAngle,
    setHachureAngle,
    hachureGap,
    setHachureGap,
  } = useCanvasContext();

  const handleChange = () => {
    useFill === 0 ? setUseFill(color) : setUseFill(0);
  };

  return (
    <div className='w-full h-full flex  flex-col gap-2 capitalize overflow-y-auto select-none'>
      <div className='flex items-center mb-1 gap-3'>
        fill shape:
        <ToggleSwitch value={useFill} onChange={handleChange} />
      </div>
      size: {radius}
      <Slider
        value={[radius]}
        min={1}
        max={50}
        step={1}
        onValueChange={(value) => setRadius(...value)}
      />
      shape roughness: {shapeRoughness}
      <Slider
        value={[shapeRoughness]}
        min={0}
        max={10}
        step={1}
        onValueChange={(value) => setShapeRoughness(...value)}
      />
      fill angle: {hachureAngle}
      <Slider
        value={[hachureAngle]}
        min={-90}
        max={90}
        step={1}
        onValueChange={(value) => setHachureAngle(...value)}
      />
      fill gap: {hachureGap}
      <Slider
        value={[hachureGap]}
        min={0}
        max={50}
        step={1}
        onValueChange={(value) => setHachureGap(...value)}
      />
    </div>
  );
}
