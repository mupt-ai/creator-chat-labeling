import MuptSidebar from "../components/MuptSidebar"
import MuptNewCreatorButton from "../components/MuptNewCreatorButton"
import MuptCreatorSelect from "../components/MuptCreatorSelect"
import MuptModal from "../components/MuptModal"
import { useState } from "react";
import MuptNewVideoButton from "../components/MuptNewVideoButton";
import MuptVideoTable from "../components/MuptVideoTable";


const Videos = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = () => {
        console.log(showModal);
        setShowModal(true);
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row h-[100vh]'>
                <div className='mt-6 ml-4 mb-4'>
                    <MuptSidebar />
                </div>
                <div className="grow">
                    <div className="flex flex-row grow">
                        <MuptCreatorSelect openModal={showModal} />
                        <MuptNewVideoButton onClick={openModal} />
                    </div>
                    <div className="mr-16 ml-16 mt-16">
                        <MuptVideoTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videos;

