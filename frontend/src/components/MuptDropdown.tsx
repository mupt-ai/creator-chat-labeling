import MuptDropdownBase from "../components-base/MuptDropdownBase";
import { GetCreators } from "../api/Creators";
import { useState, useEffect, useContext } from "react";
import { Option } from "../components-base/MuptDropdownBase";
import { CurrentCreatorContext } from "../pages/Basepage";


type MuptDropdownProps = {
    openModal: boolean;
}

const MuptDropdown: React.FC<MuptDropdownProps> = (props) => {
    const [options, setOptions] = useState([]);

    const { setCurrentCreator } = useContext(CurrentCreatorContext);

    const updateChoiceLocalStorage = (choice: Option | string | null) => {
        if (typeof choice == "object" && choice != null) {
            localStorage.setItem("selectedCreatorId", choice.value);
            localStorage.setItem("selectedCreatorName", choice.label);
            setCurrentCreator(choice.value);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creators = await GetCreators();
                setOptions(creators["creators"]);
            } catch (error) {
                console.error('Error fetching creators:', error);
            }
        };
        fetchData();
    }, [props.openModal]);

    let selectedCreatorId = localStorage.getItem("selectedCreatorId") || "";
    let selectedCreatorName = localStorage.getItem("selectedCreatorName") || "";

    return (
        <MuptDropdownBase
            options={options.map(({ id, name }) => ({ value: id, label: name }))}
            onChange={(choice) => updateChoiceLocalStorage(choice)}
            defaultValue={{ value: selectedCreatorId, label: selectedCreatorName }}
        />
    )
}

export default MuptDropdown;
