import Image from 'next/image';
import { LuLoader2 } from 'react-icons/lu';
import { useDiffusionContext } from '@/contextAPI/context';

export default function Card2() {
  const { prediction, message, error } = useDiffusionContext();
  return (
    <div className='relative h-full w-full bg-gray-300 rounded-2xl'>
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
          {prediction.status !== 'succeeded' && (
            <div className='flex flex-col items-center justify-center opacity-90  '>
              <LuLoader2 size={30} className='animate-spin' />
              <p className='py-3 text-lg text-orange-500'>
                Status: {prediction.status}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
