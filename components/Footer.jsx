import React, { useEffect, useRef } from 'react';
import { BsImages } from 'react-icons/bs';
import { TfiSave } from 'react-icons/tfi';
import { LuUndo2, LuRedo2 } from 'react-icons/lu';
import { PiTrash } from 'react-icons/pi';
import { useCanvasContext } from '@/contextAPI/context';

export default function Footer() {
  const inputRef = useRef();
  const {
    setIsModalOpen,
    canvasRef,
    setActions,
    currentPosition,
    setCurrentPosition,
    undo,
    redo,
  } = useCanvasContext();

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

  const savePNG = (e) => {
    let link = e.currentTarget;
    link.setAttribute('download', 'canvas.png');
    let image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
  };

  const handleClick = (e) => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      console.log('Canvas Width', canvas.width, 'Canvas Height', canvas.height);
      console.log(
        'Image Width',
        image.naturalWidth,
        'Image Height',
        image.naturalHeight
      );
      const scale =
        canvas.width > canvas.height
          ? canvas.height / Math.max(image.naturalWidth, image.naturalHeight)
          : canvas.width / Math.max(image.naturalWidth, image.naturalHeight);

      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;
      const startX = (canvas.width - imageWidth) / 2;
      const startY = (canvas.height - imageHeight) / 2;

      // Create a new canvas to hold the scaled-down image
      const scaledCanvas = document.createElement('canvas');
      scaledCanvas.width = imageWidth;
      scaledCanvas.height = imageHeight;
      const scaledContext = scaledCanvas.getContext('2d');

      // Draw the image on the scaled canvas
      scaledContext.drawImage(image, 0, 0, imageWidth, imageHeight);

      // Get the data URL of the scaled image
      const drawing = scaledCanvas.toDataURL('image/png');

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, startX, startY, imageWidth, imageHeight);
      localStorage.setItem('drawing', drawing);
      setActions((prevActions) => {
        const newActions = prevActions.slice(0, currentPosition + 1);
        return [...newActions, drawing];
      });
      setCurrentPosition((prevPosition) => prevPosition + 1);
    };
  };

  const clearCanvas = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='flex justify-center items-center text-gray-50  portrait:h-[5rem] portrait:w-full landscape:h-full landscape:w-[5rem]'>
      <div className='flex portrait:flex-row landscape:flex-col justify-center items-center gap-5'>
        <div className='bg-black p-3 rounded-full hover:opacity-70'>
          <a onClick={savePNG} href='download_link' className='select-none'>
            <TfiSave size={25} />
          </a>
        </div>
        <form
          onClick={handleClick}
          className='rounded-full bg-black p-3 cursor-pointer hover:opacity-70'
        >
          <BsImages size={25} />
          <input
            type='file'
            ref={inputRef}
            onChange={handleFileChange}
            accept='image/*'
            className='hidden'
          />
        </form>
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
