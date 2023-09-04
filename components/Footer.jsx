import React, { useEffect, useRef, useState } from 'react';
import { TfiSave } from 'react-icons/tfi';
import { IoHardwareChipOutline } from 'react-icons/io5';
import { LuUndo2, LuRedo2 } from 'react-icons/lu';
import { PiTrash } from 'react-icons/pi';
import { useCanvasContext, useDiffusionContext } from '@/contextAPI/context';
import StableDiffusion from './StableDiffusion';
import SaveImage from './SaveImage';

export default function Footer() {
  const [isOpen, toggle] = useState(false);
  const [isSaveOpen, toggleSave] = useState(false);
  const { setIsModalOpen, undo, redo } = useCanvasContext();
  const { error } = useDiffusionContext();

  useEffect(() => {
    const undoRedoFunction = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    document.addEventListener('keydown', undoRedoFunction);
    return () => {
      document.removeEventListener('keydown', undoRedoFunction);
    };
  }, [undo, redo]);

  const handleSave = () => {
    toggleSave((prev) => !prev);
  };

  const handleSettings = () => {
    toggle((prev) => !prev);
  };

  const clearCanvas = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='flex justify-center items-center text-gray-50  portrait:h-[5rem] portrait:w-full landscape:h-full landscape:w-[5rem]'>
      <div className='flex portrait:flex-row landscape:flex-col justify-center items-center gap-5'>
        <button
          onClick={handleSettings}
          className={`relative ${
            error ? ' bg-red-500 animate-bounce' : 'bg-black'
          } p-2.5 rounded-full hover:opacity-70 hover:animate-pulse`}
        >
          <IoHardwareChipOutline size={30} />
          <h5 className='absolute text-[10px] left-5 top-[17px]'>AI</h5>
        </button>
        {isOpen && <StableDiffusion isOpen={isOpen} toggle={toggle} />}
        {isSaveOpen && (
          <SaveImage isSaveOpen={isSaveOpen} toggleSave={toggleSave} />
        )}
        <div className='bg-black p-3 rounded-full hover:opacity-70'>
          <button
            onClick={handleSave}
            className='select-none flex items-center'
          >
            <TfiSave size={25} />
          </button>
        </div>
        <button
          onClick={undo}
          className='bg-black p-3 rounded-full hover:opacity-70'
        >
          <LuUndo2 size={25} />
        </button>
        <button
          onClick={redo}
          className='bg-black p-3 rounded-full hover:opacity-70'
        >
          <LuRedo2 size={25} />
        </button>
        <button
          onClick={clearCanvas}
          className='bg-black p-3 rounded-full hover:opacity-70'
        >
          <PiTrash size={25} />
        </button>
      </div>
    </div>
  );
}
