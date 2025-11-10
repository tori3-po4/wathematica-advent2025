
import Calendar from './calendar';
import ArticleList from './articlelist';

export default function Home() {


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[url('/wathema_image.png')] bg-cover bg-center">
        <h1 className="text-7xl font-bold font-geist-sans text-white" >Wathematica
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
