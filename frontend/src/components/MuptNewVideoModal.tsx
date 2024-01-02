import MuptOneLabelModalBase from "../components-base/MuptOneLabelModalBase";
import { NewVideo } from "../api/Videos";
import { useContext } from "react";
import { CurrentCreatorContext } from "../pages/Basepage";

type MuptModalProps = {
    show: boolean;
    onClose(): void;
}


const MuptNewVideoModal: React.FC<MuptModalProps> = (props) => {

    const { currentCreator } = useContext(CurrentCreatorContext);
    const onClick = async (youtubeLink: string) => {
        if (currentCreator) {
            await NewVideo(youtubeLink, parseInt(currentCreator));
            props.onClose();
        } else {
            alert("Please select a creator first!");
            props.onClose();
        }
    }

    return (
        <MuptOneLabelModalBase
            show={props.show}
            onClose={props.onClose}
            title="Add a New Video Link"
            labelValue="Video Link"
            onClick={onClick} />
    )
}

export default MuptNewVideoModal
