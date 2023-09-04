import React from 'react';
import { Slider } from './ui/slider';
import { useCanvasContext } from '@/contextAPI/context';
import ToggleSwitch from './ToggleSwitch';

export default function OptionsRect() {
  const {
    radius,
    setRadius,
    shapeRoughness,
    setShapeRoughness,
    useHachure,
    setUseHachure,
    hachureAngle,
    setHachureAngle,
    hachureGap,
    setHachureGap,
  } = useCanvasContext();

  return (
    <div className='w-full h-full flex  flex-col gap-2 capitalize overflow-y-auto select-none'>
      <div className='flex items-center mb-1 gap-3'>
        fill shape:
        <ToggleSwitch value={useHachure} onChange={setUseHachure} />
      </div>
      size: {radius}
      <Slider
        value={[radius]}
        min={1}
        max={50}
        step={1}
        onValueChange={(value) => setRadius(...value)}
      />
      drawing roughness: {shapeRoughness}
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
      fill space: {hachureGap}
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
