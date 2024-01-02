import MuptTwoDropdownModalBase from "../components-base/MuptTwoDropdownModalBase";
import { GetAllVideos } from "../api/Videos";
import { useContext, useEffect, useState } from "react";
import { CurrentCreatorContext } from "../pages/Basepage";
import { Option } from "../components-base/MuptDropdownBase";
import { NewTrainingData } from "../api/TrainingData";
import { Video } from "./MuptVideoTable"

type MuptModalProps = {
    show: boolean;
    onClose(): void;
}


const MuptNewTrainingDataModal: React.FC<MuptModalProps> = (props) => {

    const { currentCreator } = useContext(CurrentCreatorContext);

    const [videos, setVideos] = useState<Option[]>([]);

    // define a list from 1 to 10
    const options: Option[] = Array.from(Array(10).keys()).map((num) => {
        return { value: (num + 1).toString(), label: (num + 1).toString() };
    });

    const onClick = async (videoId: string, numQuestions: string) => {
        if (currentCreator) {
            await NewTrainingData(parseInt(currentCreator),
                parseInt(numQuestions),
                videoId);
            props.onClose();
        } else {
            alert("Please select a creator first!");
            props.onClose();
        }
    }

    useEffect(() => {
        if (currentCreator == null) {
            return;
        }
        GetAllVideos(parseInt(currentCreator)).then((res) => {
            setVideos(res.map((video: Video) => {
                return { value: video.video_id, label: video.video_id }
            }));
        })
    }, [currentCreator])

    return (
        <MuptTwoDropdownModalBase
            show={props.show}
            onClose={props.onClose}
            title1="Video"
            title2="Number of Questions"
            options1={videos}
            options2={options}
            onClick={onClick} />
    )
}

export default MuptNewTrainingDataModal
