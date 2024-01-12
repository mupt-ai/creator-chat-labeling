import MuptButtonBase from "../components-base/MuptButtonBase";
import { HiUserAdd } from 'react-icons/hi';

type MuptNewCreatorButtonProps = {
    onClick(): void;
}

const MuptNewCreatorButton: React.FC<MuptNewCreatorButtonProps> = (props) => {
    return (
        <MuptButtonBase icon={HiUserAdd} text="New Creator" onClick={props.onClick} />
    )
}

export default MuptNewCreatorButton;