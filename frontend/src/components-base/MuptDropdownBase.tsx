import Select from 'react-select'

export type Option = {
    value: string;
    label: string;
}

type MuptDropdownProps = {
    options: Option[];
    // function onChange(choice: Option): void;
    defaultValue: Option | string | null;
    onChange(option: Option | string | null): void;
}

const MuptDropdownBase: React.FC<MuptDropdownProps> = (props) => {
    return (
        <Select
            options={props.options}
            theme={theme => ({
                ...theme,
                borderRadius: 5,
                colors: {
                    ...theme.colors,
                },
            })}
            defaultValue={props.defaultValue}
            onChange={(choice) => props.onChange(choice)}
        />)
}

export default MuptDropdownBase