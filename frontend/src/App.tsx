import './App.css'
import { MuptSidebar } from './components/MuptSidebar'
import MuptDropdown from './components-base/MuptDropdown'
import MuptTable from './components-base/MuptTableBase'

function App() {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row h-[100vh]'>
        <div className='mt-6 ml-4 mb-4'>
          <MuptSidebar />
        </div>
        <div className='mt-6 ml-12 flex flex-col'>
          <h1 className="text-white text-4xl font-bold text-center">Welcome Back!</h1>
          <div className='mt-3 dark'>
            <MuptDropdown/>
          </div>
          <div className='flex flex-expand flex-col justify-center align-center'>
            <MuptTable colNames={["hello"]}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
