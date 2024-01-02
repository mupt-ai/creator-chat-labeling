import MuptNewCreatorButton from "../components/MuptNewCreatorButton"
import MuptCreatorSelect from "../components/MuptCreatorSelect"
import MuptNewCreatorModal from "../components/MuptNewCreatorModal"
import { useState } from "react";
import BasePage from "./Basepage";

const Dashboard = () => {
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
                    <MuptNewCreatorButton onClick={openModal} />
                    <MuptNewCreatorModal show={showModal} onClose={closeModal} />
                </div>
            </>
        }></BasePage>
    )
}

export default Dashboard;

