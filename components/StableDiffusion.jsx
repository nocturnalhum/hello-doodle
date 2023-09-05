import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import dataURLtoFile from '@/utils/dataURLtoFile';
import { useCanvasContext, useDiffusionContext } from '@/contextAPI/context';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function StableDiffusion({ isOpen, toggle }) {
  const [inputPrompt, setInputPrompt] = useState('');
  const {
    message,
    setMessage,
    loading,
    setLoading,
    error,
    setError,
    setPrediction,
  } = useDiffusionContext();

  const router = useRouter();
  const { canvasRef, setIsFlipped } = useCanvasContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggle(false);
    const canvas = canvasRef.current;
    const drawingDataUrl = canvas.toDataURL('image/png');
    const convertedUrlToFile = dataURLtoFile(
      drawingDataUrl,
      `image-${uuidv4()}.png`
    );

    try {
      setMessage('Getting Signed Url...');
      setIsFlipped(true);
      setLoading(true);
      const res = await fetch(
        `/api/upload?file=${convertedUrlToFile.name}&${convertedUrlToFile.type}`
      );

      const { preSignedUrl, imgUrl } = await res.json();

      setMessage('Uploading image to S3...');
      const upload = await fetch(preSignedUrl, {
        method: 'PUT',
        body: convertedUrlToFile,
        headers: { 'Content-Type': 'fileType' },
      });

      if (upload.ok) {
        console.log('Uploaded Successfully!', upload);
        setMessage('Uploaded Successfully to S3');

        const response = await fetch('/api/predictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: inputPrompt,
            img: imgUrl,
          }),
        });

        let prediction = await response.json();
        if (response.status !== 201) {
          setMessage(prediction.detail);
          console.log('RES1', response);
          return;
        } else {
          console.log('RES2', response);
        }
        setPrediction(prediction);

        while (
          prediction.status !== 'succeeded' &&
          prediction.status !== 'failed'
        ) {
          setLoading(true);
          await sleep(1000);
          const response = await fetch('/api/predictions/' + prediction.id);
          prediction = await response.json();
          if (response.status !== 200) {
            setError(prediction.detail);
            return;
          }
          console.log({ prediction });
          setPrediction(prediction);
          setMessage(null);
          setLoading(false);
        }
      } else {
        console.error('S3 Upload Error:', upload.statusText);
        setMessage('Error uploading');
        setLoading(false);
        setIsFlipped(false);
      }
    } catch (error) {
      console.error('Error processing image prediction:', error.toString());
      setMessage('Error processing image prediction');
      setError(error.toString());
      setIsFlipped(false);
      setLoading(false);
    }
  };

  const handleClose = () => {
    toggle(false);
    setMessage(null);
    router.reload();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800/75'>
      {isOpen && !message && (
        <div className='bg-blue-200 w-[80vw] h-[90vh] max-w-xl max-h-96 m-10 backdrop-blur-sm rounded-lg p-4'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <h2 className='text-black font-medium text-base my-2 ml-3'>
              Enter a prompt to convert image to AI generated image ...
            </h2>
            <textarea
              rows='7'
              cols='60'
              reszie='none'
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className={`h-full w-full rounded-xl p-5 text-gray-950 bg-blue-50 flex items-start focus:outline-none duration-700`}
              placeholder={`e.g. Cat in the style of Van Gogh`}
            />
            <h1 className='text-black/70 ml-3'>
              Works best with black & white line drawings
            </h1>
            <div className='flex h-12 justify-between items-center px-2'>
              <button
                className='bg-blue-950 h-8 w-16 rounded-lg'
                onClick={(prev) => toggle(!prev)}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='flex justify-center items-center text-white bg-blue-500 rounded-full p-2 disabled:cursor-not-allowed'
                disabled={loading || error || !inputPrompt}
              >
                Go!
              </button>
            </div>
          </form>
        </div>
      )}
      {message && (
        <div className='flex flex-col justify-center items-center'>
          <p className=' text-green-500 text-lg font-semibold'>
            Status: {message}
          </p>
          <button
            className='bg-gray-950 rounded-lg my-7 px-4 py-2'
            onClick={handleClose}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
