import Button from '@material-tailwind/react/Button';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import InputIcon from '@material-tailwind/react/InputIcon';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import DefaultNavbar from 'components-templates/DefaultNavbar';
import Container from 'components-templates/login/Container';
import Page from 'components-templates/login/Page';
import SimpleFooter from 'components-templates/SimpleFooter';
import { authAction, selectAuthLoading } from 'features/auth/authSlice';
import { useState } from 'react';
import H5 from '@material-tailwind/react/Heading5';
import CardHeader from '@material-tailwind/react/CardHeader';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@material-ui/core';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const loading = useAppSelector(selectAuthLoading);

  const handelClick = () => {
    if (username === '') {
      setErrorUsername(true);
      return;
    } else {
      setErrorUsername(false);
    }
    if (password === '') {
      setErrorPassword(true);
      return;
    } else {
      setErrorPassword(false);
    }
    dispatch(
      authAction.login({
        username: username,
        password: password,
      })
    );
  };
  return (
    <Page>
      <DefaultNavbar />
      <Container>
        <Card>
          <CardHeader color="lightBlue" size="lg">
            <H5 color="white">{t('common.titleLogin')}</H5>
          </CardHeader>
          <CardBody>
            <div className="mb-12 px-4 bg-bb">
              <InputIcon
                error={errorUsername ? 'username is require' : ''}
                type="text"
                color="lightBlue"
                placeholder={t('common.username')}
                iconName="people"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-8 px-4">
              <InputIcon
                error={errorPassword ? 'password is require' : ''}
                type="password"
                color="lightBlue"
                placeholder={t('common.password')}
                iconName="lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-center bg-bb">
              <Button
                color="lightBlue"
                buttonType="filled"
                size="lg"
                ripple="dark"
                onClick={handelClick}
              >
                {loading && <CircularProgress size={18} />}
                &nbsp;
                {t('common.btnLogin')}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
      <SimpleFooter />
    </Page>
  );
}
