import { Modal, Label, TextInput, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import MuptDropdownBase, { Option } from './MuptDropdownBase';

type MuptModalProps = {
    show: boolean;
    onClose(): void;
    title1: string;
    options1: Option[],
    title2: string;
    options2: Option[],
    onClick(arg1: string, arg2: string): Promise<void>;
}

const MuptTwoDropdownModalBase: React.FC<MuptModalProps> = (props) => {

    const [loading, setLoading] = useState(false);
    const [selected1, setSelected1] = useState<Option | null>(null);
    const [selected2, setSelected2] = useState<string | null>(null);
    const [buttonLabel, setButtonLabel] = useState('Add');

    useEffect(() => {
        if (loading) {
            setButtonLabel('Adding...');
        } else {
            setButtonLabel('Add');
        }
    }, [loading, props.show])

    const onChange = (value: Option | null | string,
        setSelected: React.Dispatch<React.SetStateAction<Option | null>>) => {
        if (typeof value === 'string') {
            return;
        }
        setSelected(value);
    }

    const onChangeNumber = (value: string,
        setSelected: React.Dispatch<React.SetStateAction<string | null>>) => {
        setSelected(value);
    }



    return (<Modal show={props.show} size="lg" onClose={props.onClose} popup>
        <Modal.Header />
        <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{props.title1}</h3>
                <div>
                    <MuptDropdownBase
                        options={props.options1}
                        defaultValue={null}
                        onChange={(value) => onChange(value, setSelected1)} />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{props.title2}</h3>
                <div>
                    <TextInput
                        type="number"
                        onChange={(value) => onChangeNumber(value.target.value, setSelected2)} />
                </div>
                <div className="flex">
                    <Button onClick={() => {
                        if (loading) {
                            return;
                        }
                        setLoading(true);
                        if (selected1 == null || selected2 == null) {
                            alert("Please select both options!");
                            props.onClose();
                            setLoading(false);
                            return;
                        }
                        props.onClick(selected1.value, selected2).then(() => {
                            setSelected1(null);
                            setSelected2(null);
                            props.onClose();
                            setLoading(false);
                        })
                    }}>{buttonLabel}</Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>)
}

export default MuptTwoDropdownModalBase