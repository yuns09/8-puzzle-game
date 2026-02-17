const Navbar = () => {
  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">Bluestocks</h1>
      <div className="space-x-6">
        <span className="cursor-pointer">Home</span>
        <span className="cursor-pointer">Puzzle</span>
        <span className="cursor-pointer">About</span>
      </div>
    </nav>
  );
};

export default Navbar;
