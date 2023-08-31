import React, { useEffect, useRef, useState } from 'react';
import { TfiSave } from 'react-icons/tfi';
import { IoHardwareChipOutline } from 'react-icons/io5';
import { LuUndo2, LuRedo2 } from 'react-icons/lu';
import { PiTrash } from 'react-icons/pi';
import { useCanvasContext, useDiffusionContext } from '@/contextAPI/context';
import StableDiffusion from './StableDiffusion';
import convertImageToDataURL from '@/utils/convertImageToDataURL';
import SaveImage from './SaveImage';

export default function Footer() {
  const [isOpen, toggle] = useState(false);
  const [isSaveOpen, toggleSave] = useState(false);
  const { isFlipped, setIsModalOpen, canvasRef, undo, redo } =
    useCanvasContext();
  const { error, prediction } = useDiffusionContext();

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

  // const savePNG = async (e) => {
  //   const link = e.currentTarget;
  //   let image;

  //   if (isFlipped && prediction) {
  //     const imagePromises = prediction.output;
  //     const images = await Promise.all(imagePromises);
  //     const imageURL = images[images.length - 1];
  //     image = await convertImageToDataURL(imageURL);
  //   } else {
  //     image = canvasRef.current.toDataURL('image/png');
  //   }

  //   link.setAttribute('href', image);
  //   link.setAttribute('download', 'canvas.png');
  // };

  const savePNG = async (e) => {
    let link = e.currentTarget;
    link.setAttribute('download', 'canvas.png');
    let image =
      isUpdated && prediction
        ? await convertImageToDataURL(
            prediction.output[prediction.output.length - 1]
          )
        : canvasRef.current.toDataURL('image/png');

    link.setAttribute('href', image);
  };

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
          className={`${
            error ? 'bg-red-500 animate-bounce' : 'bg-black'
          } p-3 rounded-full hover:opacity-70 hover:animate-pulse`}
        >
          <IoHardwareChipOutline size={25} />
        </button>
        {isOpen && <StableDiffusion isOpen={isOpen} toggle={toggle} />}
        {isSaveOpen && (
          <SaveImage isSaveOpen={isSaveOpen} toggleSave={toggleSave} />
        )}
        <div className='bg-black p-3 rounded-full hover:opacity-70'>
          <button onClick={handleSave} className='select-none'>
            <TfiSave size={25} />
          </button>
          {/* <a onClick={handleSave} href='download_link' className='select-none'>
            <TfiSave size={25} />
          </a> */}
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
