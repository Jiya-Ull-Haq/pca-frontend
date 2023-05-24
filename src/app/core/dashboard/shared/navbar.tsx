import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

const Navbar = () => {
 
  const items = [
    {
      label: 'Home',
      icon: PrimeIcons.HOME,
      command: () => {

      }
    },
    {
      label: 'Create',
      icon: PrimeIcons.PLUS_CIRCLE,
      command: () => {

      }
    }
  ];


  return (
    <div>
      <Menubar
        end={
            <div>
                <Button className="p-button-danger pi pi-sign-out" />
            </div>
        }
        model={items}
        className="p-mb-3"
        style={{ borderBottom: '1px solid #ccc' }}
      />
    </div>
  );
};

export default Navbar;
