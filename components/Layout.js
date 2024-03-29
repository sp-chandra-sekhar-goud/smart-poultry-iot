import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row bg-blue-800 min-h-screen">
      <Nav />
      <div className="h-screen overflow-auto flex-grow bg-white p-2 md:p-4 mt-2 md:mr-2 rounded-lg">
        {children}
      </div>
    </div>
  );
}