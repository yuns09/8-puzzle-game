import Puzzle from './pages/Puzzle';

function App() {
  return (
    <div className="min-h-screen bg-brand-background font-body flex flex-col items-center">
      <header className="w-full bg-brand-primary py-5 shadow-md">
        <h1 className="text-center text-white text-3xl font-heading tracking-wide">
          Daily Puzzle Challenge
        </h1>
      </header>

      <Puzzle />
    </div>
  );
}

export default App;
