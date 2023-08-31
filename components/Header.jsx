import React, { useRef } from 'react';
import { BsImages } from 'react-icons/bs';
import { TfiSave } from 'react-icons/tfi';
import { AiOutlineLine } from 'react-icons/ai';
import {
  PiCircle,
  PiRectangle,
  PiSelectionBackgroundDuotone,
  PiPaintBrush,
  PiEraserFill,
  PiCaretLeftFill,
} from 'react-icons/pi';
import PopoverPicker from './PopoverPicker';
import { useCanvasContext } from '@/contextAPI/context';
import BrushSettings from './BrushSettings';

export default function Header() {
  const { tool, setTool } = useCanvasContext();
  const inputRef = useRef();

  return (
    <div className='flex justify-center items-center text-gray-50 portrait:h-[5rem] portrait:w-full landscape:h-full landscape:w-[5rem]'>
      <div className='flex portrait:flex-row landscape:flex-col justify-center items-center gap-5'>
        <div className='flex portrait:flex-row landscape:flex-col'>
          <BrushSettings />
          <button
            onClick={() => setTool('pen')}
            className={`bg-black p-3 hover:opacity-80 ${
              tool === 'pen' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <PiPaintBrush size={25} />
          </button>
          {/* <div className='flex flex-col drop-shadow-md shadow-lg select-none'>
          <h1 className='font-medium text-sm text-gray-100'>Color</h1>
          <PopoverPicker color={color} onChange={setColor} />
        </div> */}
          <button
            onClick={() => setTool('rectangle')}
            className={`bg-black p-3  ${
              tool === 'rectangle' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <PiRectangle size={25} />
          </button>
          <button
            onClick={() => setTool('ellipse')}
            className={`bg-black p-3  hover:opacity-80 ${
              tool === 'ellipse' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <PiCircle size={25} />
          </button>
          <button
            onClick={() => setTool('line')}
            className={`bg-black p-3  hover:opacity-80 ${
              tool === 'line' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <AiOutlineLine size={25} />
          </button>
          <button
            onClick={() => setTool('selection')}
            className={`bg-black p-3  hover:opacity-80 ${
              tool === 'selection' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <PiSelectionBackgroundDuotone size={25} />
          </button>
          <button
            onClick={() => setTool('delete')}
            className={`bg-black p-3 portrait:rounded-r-md landscape:rounded-b-md  hover:opacity-80 ${
              tool === 'delete' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <PiEraserFill size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
