import React, { useState } from 'react';
import PopoverPicker from './PopoverPicker';
import { useCanvasContext } from '@/contextAPI/context';

export default function ColorOptions({ toggle }) {
  const {
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
  } = useCanvasContext();

  const handleChange = (e, setColorVal) => {
    setColorVal(e);
    setColor(e);
  };

  return (
    <div className='flex items-center w-96 gap-2 select-none z-10'>
      Color Pallete:
      <div className='flex gap-2 sm:gap-5'>
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
  );
}
