import MuptDropdown from "./MuptDropdown"

type MuptCreatorSelectProps = {
    openModal: boolean;
}

const MuptCreatorSelect: React.FC<MuptCreatorSelectProps> = (props) => {
    return (<div className='mt-6 ml-12 flex flex-col'>
        <h1 className="text-white text-4xl font-bold text-center">Hey there,</h1>
        <div className='mt-3 dark'>
            <MuptDropdown openModal={props.openModal} />
        </div>
    </div>)
}

export default MuptCreatorSelect;