import MuptDropdownBase from "../components-base/MuptDropdownBase";
import { getCreators } from "../api/creators";
import { useState, useEffect } from "react";
import { Option } from "../components-base/MuptDropdownBase";

const updateChoiceLocalStorage = (choice: Option | string | null) => {
    if (typeof choice == "object" && choice != null) {
        localStorage.setItem("selectedCreatorId", choice.value);
        localStorage.setItem("selectedCreatorName", choice.label);
    }
};

const MuptDropdown = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creators = await getCreators();
                setOptions(creators["creators"]);
            } catch (error) {
                console.error('Error fetching creators:', error);
            }
        };

        fetchData();
    }, []);

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
