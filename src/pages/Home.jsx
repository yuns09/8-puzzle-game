function Home({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Bluestocks Puzzle Game
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-xl">
        This is a simple puzzle game built using React and Tailwind CSS as part
        of the Bluestocks Software Development Internship assessment.
      </p>

      <button
        onClick={onStart}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Game
      </button>
    </div>
  );
}

export default Home;
