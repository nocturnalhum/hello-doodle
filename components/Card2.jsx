import Image from 'next/image';
import { LuLoader2 } from 'react-icons/lu';
import { useDiffusionContext } from '@/contextAPI/context';

export default function Card2() {
  const { prediction, message, error } = useDiffusionContext();

  return (
    <div className='relative h-full w-full bg-gray-900 rounded-xl flex items-center justify-center touch-none select-none'>
      {prediction && (
        <>
          {prediction?.output && (
            <Image
              src={prediction.output[prediction.output.length - 1]}
              alt='output'
              fill
              sizes='500px'
              className='object-cover rounded-xl'
            />
          )}

          {error && (
            <p className='py-3 text-lg text-orange-500'>Status: {error}</p>
          )}
          {message && (
            <p className='py-3 text-lg text-orange-500'>Status: {message}</p>
          )}
          {!message && prediction.status !== 'succeeded' && (
            <div className='flex flex-col items-center justify-center gap-2'>
              <LuLoader2 size={35} className='text-white animate-spin' />
              <p className='py-3 text-xl text-orange-500'>
                Status: {prediction.status}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
