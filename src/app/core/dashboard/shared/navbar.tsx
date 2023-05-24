import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { PrimeContext } from '../../../App';
import { useContext } from 'react';

const Navbar = () => {
  const { showToast } = useContext(PrimeContext);
  const navigate = useNavigate();
  
  function logout() {
    localStorage.clear();
    showToast('success', 'Logged out successfully!', 'Please login to continue.');
    navigate('/login');
  }
 
  const items = [
    {
      label: 'Home',
      icon: PrimeIcons.HOME,
      command: () => {
        navigate('/dashboard');
      }
    },
    {
      label: 'Create',
      icon: PrimeIcons.PLUS_CIRCLE,
      command: () => {
        navigate('/dashboard/create');
      }
    }
  ];


  return (
    <div>
      <Menubar
        end={
            <div>
                <Button className="p-button-danger pi pi-sign-out"  onClick={logout}/>
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
