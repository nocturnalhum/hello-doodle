import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCanvasContext } from '@/contextAPI/context';
import { Slider } from '@/components/ui/slider';
import { PiSlidersBold, PiXBold } from 'react-icons/pi';
import useClickOutside from '@/hooks/useClickOutside';
import PopoverPicker from './PopoverPicker';

export default function BrushSettings() {
  const [isOpen, toggle] = useState(false);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const popover = useRef();
  const {
    radius,
    setRadius,
    setColor,
    setColor1,
    setColor2,
    setColor3,
    setColor4,
    setColor5,
    color1,
    color2,
    color3,
    color4,
    color5,
    taperStart,
    setTaperStart,
    taperEnd,
    setTaperEnd,
    smoothing,
    setSmoothing,
    thinning,
    setThinning,
    canvasRef,
  } = useCanvasContext();

  const close = useCallback(() => toggle(false), []);

  useClickOutside(popover, close);

  const handleSettings = () => {
    toggle(true);
  };

  useEffect(() => {
    setWidth(canvasRef.current.width);
    setHeight(canvasRef.current.height);
    // Function to update dimensions based on screen size and orientation
    const updateDimensions = () => {
      if (isOpen) {
        setWidth(canvasRef.current.width);
        setHeight(canvasRef.current.height);
      }
    };

    // Attach event listener to window resize
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);

    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, [isOpen, canvasRef]);

  const handleChange = (e, setColorVal) => {
    setColorVal(e);
    setColor(e);
  };

  return (
    <div
      className={`relative flex justify-center p-3  portrait:rounded-l-md landscape:rounded-t-md z-40  ${
        isOpen ? 'bg-red-500' : 'bg-gray-500'
      }`}
    >
      <button
        onClick={handleSettings}
        className={`flex justify-center items-center w-full portrait:rounded-l-md landscape:rounded-t-md hover:animate-pulse`}
      >
        {isOpen ? <PiXBold size={25} /> : <PiSlidersBold size={25} />}
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 m-auto p-1 md:p-3 bg-gray-300/50  rounded-xl backdrop-blur-md`}
          style={{ width: width + 'px', height: height + 'px' }}
          ref={popover}
        >
          <div className='h-full max-w-xs flex flex-col items-start p-5 gap-y-3 text-gray-950 font-medium  '>
            <div className='flex items-center w-96 gap-3 select-none z-10'>
              Brush Color:
              <div className='flex gap-3 sm:gap-5'>
                <PopoverPicker
                  color={color1}
                  onChange={(e) => handleChange(e, setColor1)}
                  settingsToggle={toggle}
                />
                <PopoverPicker
                  color={color2}
                  onChange={(e) => handleChange(e, setColor2)}
                  settingsToggle={toggle}
                />
                <PopoverPicker
                  color={color3}
                  onChange={(e) => handleChange(e, setColor3)}
                  settingsToggle={toggle}
                />
                <PopoverPicker
                  color={color4}
                  onChange={(e) => handleChange(e, setColor4)}
                  settingsToggle={toggle}
                />
                <PopoverPicker
                  color={color5}
                  onChange={(e) => handleChange(e, setColor5)}
                  settingsToggle={toggle}
                />
              </div>
            </div>
            <hr
              className='border border-gray-400/50'
              style={{ width: width - '60' + 'px' }}
            />
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
              min={1}
              max={99}
              step={1}
              onValueChange={(value) => setTaperStart(value)}
            />
            Taper End: {taperEnd}
            <Slider
              value={[taperEnd]}
              min={1}
              max={99}
              step={1}
              onValueChange={(value) => setTaperEnd(value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
