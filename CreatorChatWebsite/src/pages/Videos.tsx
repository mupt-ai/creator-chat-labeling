import MuptCreatorSelect from "../components/MuptCreatorSelect"
import { useState } from "react";
import MuptNewVideoButton from "../components/MuptNewVideoButton";
import MuptVideoTable from "../components/MuptVideoTable";
import BasePage from "./Basepage";
import MuptNewVideoModal from "../components/MuptNewVideoModal";

const Videos = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
    }

    return (
        <BasePage pageContent={
            <>
                <div className="flex flex-row grow">
                    <MuptCreatorSelect openModal={showModal} />
                    <MuptNewVideoButton onClick={openModal} />
                    <MuptNewVideoModal show={showModal} onClose={closeModal} />
                </div>
                <div className="mr-16 ml-16 mt-16">
                    <MuptVideoTable openModal={showModal} />
                </div>
            </>
        }></BasePage>
    )
}

export default Videos;

