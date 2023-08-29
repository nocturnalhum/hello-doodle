import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCanvasContext } from '@/contextAPI/context';
import { Slider } from '@/components/ui/slider';
import { PiSlidersBold, PiXBold } from 'react-icons/pi';
// import { TiTimesOutline } from 'react-icons/ti';
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
    color1,
    color2,
    color3,
    color4,
    color5,
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

  return (
    <div className='relative flex justify-center p-3 bg-gray-500 portrait:rounded-l-md landscape:rounded-t-md z-50'>
      <button
        onClick={handleSettings}
        className={`flex justify-center items-center w-ful  portrait:rounded-l-md landscape:rounded-t-md hover:animate-pulse`}
      >
        {isOpen ? <PiXBold size={25} /> : <PiSlidersBold size={25} />}
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 m-auto p-3 bg-gray-300/50  rounded-xl backdrop-blur-md`}
          style={{ width: width + 'px', height: height + 'px' }}
          ref={popover}
        >
          <div className='h-full max-w-xs flex flex-col items-start p-5 gap-y-3 text-gray-950 font-medium  '>
            <div className='flex items-center gap-5 select-none z-10'>
              Brush Color:
              <PopoverPicker
                color={color1}
                onChange={setColor}
                settingsToggle={toggle}
              />
              <PopoverPicker
                color={color2}
                onChange={setColor}
                settingsToggle={toggle}
              />
              <PopoverPicker
                color={color3}
                onChange={setColor}
                settingsToggle={toggle}
              />
              <PopoverPicker
                color={color4}
                onChange={setColor}
                settingsToggle={toggle}
              />
              <PopoverPicker
                color={color5}
                onChange={setColor}
                settingsToggle={toggle}
              />
            </div>
            Size: {radius}
            <Slider
              value={[radius]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setRadius(value)}
            />
            Taper Start: {radius}
            <Slider
              value={[radius]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setRadius(value)}
            />
            Taper End: {radius}
            <Slider
              value={[radius]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setRadius(value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
