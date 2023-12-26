import './MuptNavbar.css'
import { Navbar } from 'flowbite-react'

const MuptNavbar = () => { 
    return (
        <Navbar fluid border>
            <Navbar.Brand>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                mupt.ai
                </span>
            </Navbar.Brand>
        </Navbar>
    )
}

export default MuptNavbar;