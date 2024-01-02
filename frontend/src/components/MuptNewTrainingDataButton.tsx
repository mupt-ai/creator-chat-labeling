import MuptButtonBase from "../components-base/MuptButtonBase";
import { HiChartBar } from 'react-icons/hi';

type MuptNewTrainingDataProps = {
    onClick(): void;
}

const MuptNewTrainingDataButton: React.FC<MuptNewTrainingDataProps> = (props) => {
    return (
        <MuptButtonBase icon={HiChartBar} text="New Training Data" onClick={props.onClick} />
    )
}

export default MuptNewTrainingDataButton;