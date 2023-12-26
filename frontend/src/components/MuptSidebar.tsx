import { Sidebar } from 'flowbite-react'
import { HiUser, HiPlusCircle } from 'react-icons/hi';

function MuptSidebar() {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiUser}>
            Creators 
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiPlusCircle}>
            Training Data 
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default MuptSidebar;