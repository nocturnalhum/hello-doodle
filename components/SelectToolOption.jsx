import { AiOutlineLine } from 'react-icons/ai';
import { PiPaintBrush, PiRectangle, PiCircle } from 'react-icons/pi';

export default function SelectToolOption({ toolOption, setToolOption }) {
  return (
    <div className='flex justify-start w-full sm:ml-10'>
      <div className='flex flex-col items-start'>
        <div className='flex text-white sm:flex-col gap-4 ml-4 sm:ml-0'>
          <div className='flex flex-col items-center'>
            <button
              onClick={() => setToolOption('brush')}
              className={`h-12 w-12 bg-black p-3 rounded-xl hover:opacity-80 ${
                toolOption === 'brush' ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <PiPaintBrush size={25} />
            </button>
            <h1 className='block text-gray-950'>Brush</h1>
          </div>
          <div className='flex flex-col items-center'>
            <button
              onClick={() => setToolOption('shapes')}
              className={`h-12 w-12 bg-black p-3 rounded-xl hover:opacity-80 ${
                toolOption === 'shapes' ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className='relative p-3'>
                <div className='absolute -left-1 top-0 p-1'>
                  <PiRectangle size={30} />
                </div>
                <div className='absolute -top-2 right-1'>
                  <PiCircle size={30} />
                </div>
                <div className='absolute -rotate-45 left-0 -top-5'>
                  <AiOutlineLine size={40} />
                </div>
              </div>
            </button>
            <h1 className='block text-gray-950'>Shapes</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
