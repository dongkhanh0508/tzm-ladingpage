import Button from '@material-tailwind/react/Button';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import InputIcon from '@material-tailwind/react/InputIcon';
import { useAppDispatch } from 'app/hooks';
import DefaultNavbar from 'components-templates/DefaultNavbar';
import Container from 'components-templates/login/Container';
import Page from 'components-templates/login/Page';
import SimpleFooter from 'components-templates/SimpleFooter';
import { authAction } from 'features/auth/authSlice';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const dispatch = useAppDispatch();

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
          <CardBody>
            <div className="mb-12 px-4 bg-bb">
              <InputIcon
                error={errorUsername ? 'username is require' : ''}
                type="text"
                color="lightBlue"
                placeholder="Username"
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
                placeholder="Password"
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
                buttonType="link"
                size="lg"
                ripple="dark"
                onClick={handelClick}
              >
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
      <SimpleFooter />
    </Page>
  );
}
