import Header from '@/components/Header';
import Card1 from '@/components/Card1';
import Card2 from '@/components/Card2';
import Footer from '@/components/Footer';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useCanvasContext } from '@/contextAPI/context';
import { MdOutlineFlipCameraAndroid } from 'react-icons/md';
import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });

export default function Home() {
  const {
    canvasRef,
    isFlipped,
    setIsFlipped,
    isModalOpen,
    setIsModalOpen,
    setElements,
  } = useCanvasContext();

  const handleConfirmClear = () => {
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');
    context.fillStyle = '#FFF'; // Set the background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
    setIsModalOpen(false);
  };

  const handleCancelClear = () => {
    setIsModalOpen(false);
  };

  return (
    <main
      className={`flex h-[100dvh] min-h-[100dvh] items-center justify-between bg-gradient-to-br from-slate-700 via-blue-300 to-gray-400 ${manrope.className}`}
    >
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
      />

      <div className='flex h-full w-full max-w-7xl mx-auto items-center  portrait:flex-col landscape:flex-row'>
        <Header />
        <div className='relative w-full h-full'>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className='absolute top-4 right-4 bg-blue-50 text-blue-950 rounded-full z-30'
          >
            <MdOutlineFlipCameraAndroid size={30} />
          </button>
          <div
            className={`relative flex h-full w-full glass-border duration-500 preserve-3d touch-none ${
              isFlipped ? 'rotate-y-180 ' : ''
            }`}
          >
            <div className='absolute inset-0 p-2'>
              <Card1 />
            </div>
            <div className='absolute inset-0 h-full w-full rotate-y-180 backface-hidden p-2'>
              <Card2 />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
