import './App.css'
import MuptNavbar from './components/MuptNavbar'
import MuptSidebar from './components/MuptSidebar'
import MuptTable from './components/MuptTable'
function App() {
  return (
    <div className='flex flex-col'>
      <MuptNavbar/>
      <div className='flex flex-row h-[calc(100vh-74px)]'>
        <div className='mt-4 ml-4'>
          <MuptSidebar />
        </div>
        <div className='mt-16 flex-grow flex justify-center'>
          <MuptTable />
        </div>
      </div>
    </div>
  )
}

export default App
