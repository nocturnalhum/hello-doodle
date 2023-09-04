import { useCanvasContext, useDiffusionContext } from '@/contextAPI/context';
import convertImageToDataURL from '@/utils/convertImageToDataURL';
import React from 'react';

export default function SaveImage({ isSaveOpen, toggleSave }) {
  const { canvasRef } = useCanvasContext();
  const { prediction } = useDiffusionContext();

  const saveOriginal = (e) => {
    const link = e.currentTarget;
    const image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
    link.setAttribute('download', 'canvas.png');
    toggleSave(false);
  };

  const saveAIOutput = async () => {
    if (!prediction) return;

    const image = await convertImageToDataURL(
      prediction.output[prediction.output.length - 1]
    );
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas.png';
    link.click();
    toggleSave(false);
  };
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800/75'>
      {isSaveOpen && (
        <div className='bg-blue-200 w-[20rem] h-[20rem] max-w-xl max-h-96 backdrop-blur-sm rounded-lg p-4'>
          <div className='h-full w-full bg-blue-50 rounded-lg p-7'>
            <h1 className='font-medium text-lg text-blue-950 mb-5'>
              Select an image to save:
            </h1>
            <div className='flex flex-col gap-3'>
              <a
                onClick={saveOriginal}
                href='download_link'
                className='flex  justify-center bg-blue-500 px-2 py-2 rounded-lg select-none'
              >
                Original Sketch
              </a>
              <button
                onClick={saveAIOutput}
                className={`flex justify-center bg-blue-500 px-2 py-2 rounded-lg select-none ${
                  prediction
                    ? 'cursor-pointer'
                    : 'bg-gray-500/40 cursor-not-allowed'
                }`}
                disabled={!prediction}
              >
                AI Output
              </button>
              <button
                onClick={(prev) => toggleSave(!prev)}
                className='bg-blue-950 px-2 py-2 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
