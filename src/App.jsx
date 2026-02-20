import Puzzle from "./pages/Puzzle";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-body">

      {/* 🔵 Header */}
      <header className="bg-blue-900 text-white py-4 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          
          <h1 className="text-2xl font-bold tracking-wide">
            Bluestocks Daily Puzzle
          </h1>

          <p className="text-sm font-medium">
            Developed by Yunus
          </p>

        </div>
      </header>

      {/* 🧩 Puzzle Section */}
      <main className="max-w-4xl mx-auto py-10">
        <Puzzle />
      </main>

    </div>
  );
}

export default App;
