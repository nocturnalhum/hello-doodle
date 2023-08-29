import { useCanvasContext } from '@/contextAPI/context';
import useClickOutside from '@/hooks/useClickOutside';
import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function PopoverPicker({ color, onChange, settingsToggle }) {
  const [isOpen, toggle] = useState(false);
  const popover = useRef();
  const { setColor } = useCanvasContext();

  const close = useCallback(() => {
    onChange(color);
    setColor(color);
    toggle(false);
    settingsToggle(false);
  }, [color, onChange, settingsToggle, setColor]);

  useClickOutside(popover, close);

  return (
    <div className='relative flex justify-center'>
      <div
        className='h-8 w-8 rounded-full border-[3px] border-white drop-shadow-md cursor-pointer'
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className='absolute top-9 rounded-lg' ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
