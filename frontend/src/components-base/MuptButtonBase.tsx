import { Button } from 'flowbite-react'
import { IconType } from 'react-icons';

type MuptButtonProps = {
    icon: IconType;
    text: string;
    onClick(): void;
}

const MuptButtonBase: React.FC<MuptButtonProps> = (props) => {
    return (
        <Button pill className='mt-3 mr-8 self-center ml-auto' gradientMonochrome="teal" size='md' onClick={props.onClick}>
            <props.icon className="mr-2 h-5 w-5" />
            {props.text}
        </Button>
    );
};

export default MuptButtonBase;
