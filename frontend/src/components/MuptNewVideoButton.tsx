import MuptButtonBase from "../components-base/MuptButtonBase";
import { HiVideoCamera } from 'react-icons/hi';

type MuptNewVideoButtonProps = {
    onClick(): void;
}

const MuptNewVideoButton: React.FC<MuptNewVideoButtonProps> = (props) => {
    return (
        <MuptButtonBase icon={HiVideoCamera} text="New Video" onClick={props.onClick} />
    )
}

export default MuptNewVideoButton;