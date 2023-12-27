import { Dropdown } from 'flowbite-react';

const MuptDropdown = () => {
    return (
        <Dropdown className="dark" label="Dropdown button" dismissOnClick={false}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
    )
    
}

export default MuptDropdown