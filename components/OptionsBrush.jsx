import React from 'react';
import { Slider } from './ui/slider';
import { useCanvasContext } from '@/contextAPI/context';

export default function BrushOptions() {
  const {
    radius,
    setRadius,
    taperStart,
    setTaperStart,
    taperEnd,
    setTaperEnd,
    smoothing,
    setSmoothing,
    thinning,
    setThinning,
  } = useCanvasContext();
  return (
    <div className='w-full h-full flex flex-col gap-2 select-none'>
      Size: {radius}
      <Slider
        value={[radius]}
        min={1}
        max={50}
        step={1}
        onValueChange={(value) => setRadius(value)}
      />
      Smoothing: {smoothing}
      <Slider
        value={[smoothing]}
        min={0.0}
        max={0.9}
        step={0.1}
        onValueChange={(value) => setSmoothing(value)}
      />
      Thinning: {thinning}
      <Slider
        value={[thinning]}
        min={-0.99}
        max={0.99}
        step={0.01}
        onValueChange={(value) => setThinning(value)}
      />
      Taper Start: {taperStart}
      <Slider
        value={[taperStart]}
        min={0}
        max={99}
        step={1}
        onValueChange={(value) => setTaperStart(value)}
      />
      Taper End: {taperEnd}
      <Slider
        value={[taperEnd]}
        min={0}
        max={99}
        step={1}
        onValueChange={(value) => setTaperEnd(value)}
      />
    </div>
  );
}
