import { Modal, Label, TextInput, Button } from 'flowbite-react';

type MuptModalProps = {
    show: boolean;
    onClose(): void;
    title: string;
    labelValue: string;
    onClick(arg: string): Promise<void>;
}

import { useState } from 'react';

const MuptOneLabelModalBase: React.FC<MuptModalProps> = (props) => {

    const [name, setName] = useState('');

    return (<Modal show={props.show} size="md" onClose={props.onClose} popup>
        <Modal.Header />
        <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{props.title}</h3>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value={props.labelValue} />
                    </div>
                    <TextInput
                        id="name"
                        placeholder={"Enter " + props.labelValue}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>
                <div className="flex">
                    <Button onClick={() => {
                        props.onClick(name).then(() => {
                            setName('');
                            props.onClose();
                        })
                    }}>Add</Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>)
}

export default MuptOneLabelModalBase