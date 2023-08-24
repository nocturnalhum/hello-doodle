import { useCanvasContext } from '@/contextAPI/context';
import Card1 from '@/components/Card1';
import Card2 from '@/components/Card2';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  const { isFlipped, showTools } = useCanvasContext();

  return (
    <main
      className={`flex h-screen min-h-screen items-center justify-between bg-gradient-to-br from-slate-700 via-blue-300 to-gray-400`}
    >
      <div className='flex h-full w-full max-w-7xl mx-auto items-center  portrait:flex-col landscape:flex-row'>
        <Header />
        <div
          className={`relative flex h-full w-full glass-border duration-500 preserve-3d touch-none ${
            isFlipped ? 'rotate-y-180 ' : ''
          }`}
        >
          <div className='absolute inset-0 p-2'>
            <Card1 />
          </div>
          <div className='absolute inset-0 h-full w-full rounded-xl rotate-y-180 backface-hidden p-4'>
            <Card2 />
          </div>
        </div>
        <div
          className={`absolute top-10 duration-300 ${
            !showTools ? '-translate-x-[100%]' : 'translate-x-[0%]'
          } `}
        ></div>
        <div
          className={`absolute top-0 duration-300 ${
            showTools ? 'translate-y-[100%]' : 'translate-y-0'
          } `}
        ></div>
        <Footer />
      </div>
    </main>
  );
}
