import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import PinDropRoundedIcon from '@material-ui/icons/PinDropRounded';
import { useTranslation } from 'react-i18next';
import Dropdown from '@material-tailwind/react/Dropdown';
import { DropdownItemCustom } from 'components/Common';
import i18n from 'translation/i18n';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState('-left-64');
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    index === 0 ? changeLanguage('vi') : changeLanguage('en');
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <a
            href="https://material-tailwind.com?ref=mtd"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-center w-full inline-block"
          >
            <H6 color="gray">TRADE ZONE MAP</H6>
          </a>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-4">
                <NavLink
                  to="/dashboard"
                  exact
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <Icon name="dashboard" size="2xl" />
                  {t('content.dashboard')}
                </NavLink>
              </li>

              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/dashboard/tables"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <StoreRoundedIcon size="2xl" />
                  {t('content.stores')}
                </NavLink>
              </li>
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/dashboard/pois"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <PinDropRoundedIcon size="2xl" />
                  {t('content.poi')}
                </NavLink>
              </li>
              <li className="rounded-lg mb-2 text-gray-700">
                <NavLink
                  to="/dashboard/maps"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <Icon name="map" size="2xl" />
                  {t('content.map')}
                </NavLink>
              </li>
              <li className="rounded-lg mb-2 text-gray-700">
                <NavLink
                  to="/dashboard/templates"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <Icon name="web" size="2xl" />
                  {t('content.templates')}
                </NavLink>
              </li>
              <li className="px-4 rounded-lg mb-2 text-gray-700">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/profile"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <Icon name="account_circle" size="2xl" />
                  {t('content.profile')}
                </a>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/dashboard/settings"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <Icon name="settings" size="2xl" />
                  {t('content.settings')}
                </NavLink>
              </li>
            </ul>

            <div className="flex-col min-w-full flex list-none absolute bottom-0">
              <Dropdown
                color="lightBlue"
                placement="bottom-start"
                buttonText={t('content.languages')}
                buttonType="outline"
                size="sm"
                rounded={false}
                block={false}
                ripple="dark"
              >
                <DropdownItemCustom
                  color="lightBlue"
                  ripple="dark"
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  VI
                </DropdownItemCustom>
                <DropdownItemCustom
                  color="lightBlue"
                  ripple="dark"
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  EN
                </DropdownItemCustom>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
