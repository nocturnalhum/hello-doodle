import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCanvasContext } from '@/contextAPI/context';
import { PiSlidersBold, PiXBold } from 'react-icons/pi';
import useClickOutside from '@/hooks/useClickOutside';
import OptionsBrush from './OptionsBrush';
import ColorOptions from './ColorOptions';
import SelectToolOption from './SelectToolOption';
import OptionsShapes from './OptionsShapes';

export default function Settings() {
  const [isOpen, toggle] = useState(false);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [toolOption, setToolOption] = useState('brush');
  const popover = useRef();
  const { canvasRef } = useCanvasContext();

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
    <div
      className={`relative flex justify-center p-3 portrait:rounded-l-md landscape:rounded-t-md z-40  ${
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
            <ColorOptions toggle={toggle} />
            <hr
              className='border border-gray-400/50 select-none'
              style={{ width: width - '60' + 'px' }}
            />
            <div className='flex w-[80vw] max-w-md  h-full items-start flex-col sm:flex-row sm:justify-between'>
              <div className='h-[16rem] w-full p-3 border-2 border-black/10 rounded-xl sm:w-[50rem] bg-slate-200 shadow-md'>
                {toolOption === 'brush' && <OptionsBrush />}
                {toolOption === 'shapes' && <OptionsShapes />}
              </div>
              <div className='mt-5 w-full sm:mt-0'>
                <SelectToolOption
                  toolOption={toolOption}
                  setToolOption={setToolOption}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
