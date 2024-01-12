import MuptSidebar from "../components/MuptSidebar"
import { useState, createContext } from "react";

interface CurrentCreatorContextType {
    currentCreator: string | null;
    setCurrentCreator: (creatorId: string | null) => void;
}

export const CurrentCreatorContext = createContext<CurrentCreatorContextType>({
    currentCreator: null,
    setCurrentCreator: () => { },
});

type BaseProps = {
    pageContent: React.ReactNode;
}

const BasePage: React.FC<BaseProps> = (props) => {
    const localCreatorId = localStorage.getItem("selectedCreatorId");
    const [currentCreator, setCurrentCreator] = useState<string | null>(localCreatorId);

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row h-[100vh]'>
                <div className='mt-6 ml-4 mb-4'>
                    <MuptSidebar />
                </div>
                <div className="grow">
                    <CurrentCreatorContext.Provider
                        value={{
                            currentCreator,
                            setCurrentCreator,
                        }}
                    >
                        {props.pageContent}
                    </CurrentCreatorContext.Provider>
                </div>
            </div>
        </div >
    )
}

export default BasePage;

