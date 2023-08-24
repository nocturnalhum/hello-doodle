import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';

export default function Home() {
  return (
    <main
      className={`flex h-screen min-h-screen items-center justify-between portrait:flex-col landscape:flex-row`}
    >
      <Header />
      <div className='h-full w-full bg-blue-300'>Main</div>
      <Footer />
    </main>
  );
}
