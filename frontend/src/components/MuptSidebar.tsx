import MuptSidebarBase from '../components-base/MuptSidebarBase';
import {
    HiChartPie,
    HiVideoCamera,
    HiTable,
    HiUser,
    HiChat,
} from 'react-icons/hi';

const MuptSidebar = () => {
    return (
        <MuptSidebarBase
            logoUrl="vite.svg"
            title="Mupt Creator"
            itemTitleToInfo={[
                {
                    itemName: "Creator Dashboard",
                    href: "#",
                    icon: HiUser,
                },
                {
                    itemName: "New Videos",
                    href: "#",
                    icon: HiVideoCamera
                },
                {
                    itemName: "Training Data",
                    href: "#",
                    icon: HiTable
                },
                {
                    itemName: "Bot Analytics",
                    href: "#",
                    icon: HiChartPie
                },
                {
                    itemName: "Test Chat",
                    href: "#",
                    icon: HiChat
                }
            ]}
        />
    )
}

export default MuptSidebar;