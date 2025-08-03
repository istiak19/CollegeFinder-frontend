import { Outlet } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer";

function App() {
  // const handleSearch = (query: string) => {
  //   // change
  //   // Route or update search results based on query
  //   console.log("Search query:", query);
  // };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100svh-345px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App
