import MuptSidebar from "../components/MuptSidebar"
import MuptCreatorSelect from "../components/MuptCreatorSelect"
import { useState, createContext } from "react";
import MuptNewVideoButton from "../components/MuptNewVideoButton";
import MuptVideoTable from "../components/MuptVideoTable";
import BasePage from "./Basepage";

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
        <BasePage pageContent={
            <>
                <div className="flex flex-row grow">
                    <MuptCreatorSelect openModal={showModal} />
                    <MuptNewVideoButton onClick={openModal} />
                </div>
                <div className="mr-16 ml-16 mt-16">
                    <MuptVideoTable />
                </div>
            </>
        }></BasePage>
    )
}

export default Videos;

