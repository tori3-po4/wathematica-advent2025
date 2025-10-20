import Calendar from './calendar';

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold ">Wathematica
          <br />
          Advent
          <br />
          Calendar
          <br />
          2025</h1>
      </div>
      <Calendar />
    </>
  );
}
