import Calendar from './calendar';
import ArticleList from './articlelist';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function Home() {


  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen">
        <Image src="/wathema_image.png" alt="Background" fill className='object-cover z-[-1]' />
        <h1 className="md:text-8xl text-6xl font-bold font-geist-sans text-black bg-white/60" >Wathematica
          <br />
          Advent
          <br />
          Calendar
          <br />
          2025</h1>
      </div>
      <p className="font-light text-center mb-8 mt-8">
        『Wathematica Advent Calendar 2025』とは、12月1日から12月25日までの毎日Wathematicaのメンバーが記事を公開する企画です。<br />
      </p>
      <Calendar />
      <ArticleList />
    </>
  );
}
