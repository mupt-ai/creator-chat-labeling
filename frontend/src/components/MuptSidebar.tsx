import MuptSidebarBase from '../components-base/MuptSidebarBase';
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiTable,
    HiUser,
  } from 'react-icons/hi';

export const MuptSidebar = () => {
    return (
        <MuptSidebarBase
            logoUrl="vite.svg"
            title="Mupt Creator"
            itemTitleToInfo={[
                {
                    itemName: "Creator Dashboard",
                    href: "#",
                    icon: HiUser 
                },
                {
                    itemName: "Training Data",
                    href: "#",
                    icon: HiTable
                },
            ]}
        />
    )
}