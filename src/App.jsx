import Footer from "./components/Footer"
import Manager from "./components/Manager"
import Navbar from "./components/Navbar"
function App() {

  return (
    <>

    <Navbar />  
    <div className=" bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
      <Manager />
       </div>
      </div>
      <Footer />
    </>
  )
}

export default App
