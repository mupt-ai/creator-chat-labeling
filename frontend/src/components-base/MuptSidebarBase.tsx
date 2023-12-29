import { Sidebar } from 'flowbite-react'
import { IconType } from 'react-icons'

type ItemTitleInfo = {
  itemName: string;
  href: string;
  icon: IconType;
}

type MuptSidebarProps = {
  logoUrl: string;
  title: string;
  itemTitleToInfo: ItemTitleInfo[];
}

const MuptSidebarBase: React.FC<MuptSidebarProps> = (props) => {
  return (
    <Sidebar className='dark rounded rounded-lg'>
      <Sidebar.Logo href="#" img={props.logoUrl} imgAlt="{title} logo">
        {props.title}
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {props.itemTitleToInfo.map((itemInfo, index) => (
            <Sidebar.Item key={index} href={itemInfo.href} icon={itemInfo.icon}>
              {itemInfo.itemName}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default MuptSidebarBase;