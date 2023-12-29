import MuptModalBase from "../components-base/MuptModalBase";

type MuptModalProps = {
    show: boolean;
    onClose(): void;
}

const MuptModal: React.FC<MuptModalProps> = (props) => {
    return (
        <MuptModalBase show={props.show} onClose={props.onClose} title="Add a new creator" />
    )
}

export default MuptModal
