import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Nav from '@material-tailwind/react/Nav';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavLink from '@material-tailwind/react/NavLink';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function DefaultNavbar() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const { t } = useTranslation();

  return (
    <Navbar color="transparent" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <a href="https://material-tailwind.com?ref=mtk" target="_blank" rel="noreferrer">
            <NavbarBrand>Trade Zone Map</NavbarBrand>
          </a>
          <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} color="white" />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav>
            <div className="flex flex-col z-50 lg:flex-row lg:items-center">
              <Link to="/dashboard" exact>
                <NavLink ripple="light" style={{ cursor: 'pointer' }}>
                  <Icon name="dashboard" size="2xl" />
                  &nbsp;{t('content.dashboard')}
                </NavLink>
              </Link>
              {/* <NavLink
                href="https://github.com/creativetimofficial/material-tailwind/issues?ref=mtk"
                target="_blank"
                rel="noreferrer"
                ripple="light"
              >
                Issues
              </NavLink> */}
              <Link to="/login">
                <Button color="transparent" className="bg-white text-black ml-4" ripple="dark">
                  {t('content.login')}
                </Button>
              </Link>
            </div>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
}
