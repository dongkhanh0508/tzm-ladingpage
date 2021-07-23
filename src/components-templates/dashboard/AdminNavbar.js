import Button from '@material-tailwind/react/Button';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import H6 from '@material-tailwind/react/Heading6';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
import { useAppDispatch } from 'app/hooks';
import ProfilePicture from 'assets/img/team-1-800x800.jpg';
import { authAction } from 'features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation().pathname;
  const dispath = useAppDispatch();
  const handelLogout = () => {
    dispath(authAction.logout());
  };
  const { t } = useTranslation();
  return (
    <nav className="bg-light-blue-500 md:ml-64 py-6 px-3">
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden">
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            iconOnly
            rounded
            ripple="light"
            onClick={() => setShowSidebar('left-0')}
          >
            <Icon name="menu" size="2xl" color="white" />
          </Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === 'left-0' ? 'left-64' : '-left-64'
            } z-50 transition-all duration-300`}
          >
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar('-left-64')}
            >
              <Icon name="close" size="2xl" color="white" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-white text-sm tracking-wider mt-1">
            {location === '/' ? 'DASHBOARD' : location.toUpperCase().replace('/', '')}
          </h4>

          <div className="flex">
            {/* <Link to="/dashboard" exact>
              <NavLink ripple="light" style={{ cursor: 'pointer' }}>
                <Icon name="dashboard" size="2xl" />
                &nbsp;{t('content.dashboard')}
              </NavLink>
            </Link>
            <Link to="/dashboard" exact>
              <NavLink ripple="light" style={{ cursor: 'pointer' }}>
                <Icon name="dashboard" size="2xl" />
                &nbsp;{t('content.dashboard')}
              </NavLink>
            </Link>
            <Link to="/dashboard" exact>
              <NavLink ripple="light" style={{ cursor: 'pointer' }}>
                <Icon name="dashboard" size="2xl" />
                &nbsp;{t('content.dashboard')}
              </NavLink>
            </Link>
            <Link to="/dashboard" exact>
              <NavLink ripple="light" style={{ cursor: 'pointer' }}>
                <Icon name="dashboard" size="2xl" />
                &nbsp;{t('content.dashboard')}
              </NavLink>
            </Link> */}
            <H6 color="white" style={{ display: 'flex', alignItems: 'center' }}>
              {user.fullname}
            </H6>

            <div className="-mr-4 ml-6">
              <Dropdown
                color="transparent"
                buttonText={
                  <div className="w-12">
                    <Image src={user.imageUrl ? user.imageUrl : ProfilePicture} rounded />
                  </div>
                }
                rounded
                style={{
                  padding: 0,
                  color: 'transparent',
                }}
              >
                <DropdownItem color="lightBlue">Action</DropdownItem>
                <DropdownItem color="lightBlue">Another Action</DropdownItem>
                <DropdownItem color="lightBlue" onClick={handelLogout}>
                  {t('common.logout')}
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
