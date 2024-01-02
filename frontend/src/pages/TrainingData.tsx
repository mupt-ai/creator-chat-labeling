import MuptCreatorSelect from "../components/MuptCreatorSelect"
import { useState } from "react";
import MuptNewTrainingDataButton from "../components/MuptNewTrainingDataButton";
import BasePage from "./Basepage";
import MuptNewTrainingDataModal from "../components/MuptNewTrainingDataModal";
import MuptTrainingTable from "../components/MuptTrainingDataTable";

const TrainingData = () => {
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
                    <MuptNewTrainingDataButton onClick={openModal} />
                    <MuptNewTrainingDataModal show={showModal} onClose={closeModal} />
                </div>
                <div className="mr-16 ml-16 mt-16">
                    <MuptTrainingTable openModal={showModal} />
                </div>
            </>
        }></BasePage>
    )
}

export default TrainingData;

