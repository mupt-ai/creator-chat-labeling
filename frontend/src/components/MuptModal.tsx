import MuptOneLabelModalBase from "../components-base/MuptOneLabelModalBase";
import { newCreator } from "../api/creators";

type MuptModalProps = {
    show: boolean;
    onClose(): void;
}

const onClick = async (creatorName: string) => {
    await newCreator(creatorName);
}

const MuptModal: React.FC<MuptModalProps> = (props) => {
    return (
        <MuptOneLabelModalBase
            show={props.show}
            onClose={props.onClose}
            title="Add a New Creator"
            labelValue="Creator Name"
            onClick={onClick} />
    )
}

export default MuptModal
