import DefaultFooter from 'components-templates/DefaultFooter';
import DefaultNavbar from 'components-templates/DefaultNavbar';
import Content from 'components-templates/profile/Content';
import Header from 'components-templates/profile/Header';

export default function Profile() {
  return (
    <>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <main>
        <Header />
        <Content />
      </main>
      <DefaultFooter />
    </>
  );
}
