import React, { useCallback, useRef, useState } from 'react';
import { useCanvasContext } from '@/contextAPI/context';
import { Slider } from '@/components/ui/slider';
import { PiCaretRightFill } from 'react-icons/pi';
import useClickOutside from '@/hooks/useClickOutside';

export default function BrushSettings() {
  const [isOpen, toggle] = useState(false);
  const popover = useRef();
  const { radius, setRadius, tool, setTool } = useCanvasContext();

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  const handleSettings = () => {
    toggle(true);
    setTool('pen');
  };

  return (
    <div className='relative flex justify-center'>
      <button
        onClick={handleSettings}
        className={`flex justify-center items-center bg-black w-full border-r border-r-gray-700  portrait:rounded-l-md landscape:rounded-t-md hover:opacity-80 ${
          tool === 'pen' ? 'opacity-100' : 'opacity-50'
        }`}
      >
        <PiCaretRightFill size={15} />
      </button>

      {isOpen && (
        <div
          className='absolute top-0 w-[85dvw] left-12 bg-gray-300/40 h-48 rounded-xl backdrop-blur-sm'
          ref={popover}
        >
          <div className='h-full flex items-center p-5 text-gray-950'>
            Thickness: {radius}
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
