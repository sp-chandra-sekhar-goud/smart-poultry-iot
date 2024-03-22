import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="flex bg-blue-800 min-h-screen">
      <Nav />
      <div className="h-screen overflow-auto flex-grow bg-white p-4 mt-2 mr-2 rounded-lg">
        {children}
      </div>
    </div>
  );
}