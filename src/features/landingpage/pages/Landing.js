import DefaultFooter from 'components-templates/DefaultFooter';
import DefaultNavbar from 'components-templates/DefaultNavbar';
import ContactSection from 'components-templates/landing/ContactSection';
import Header from 'components-templates/landing/Header';
import TeamSection from 'components-templates/landing/TeamSection';
import WorkingSection from 'components-templates/landing/WorkingSection';

export default function Landing() {
  return (
    <>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <main>
        <Header />
        <WorkingSection />
        <TeamSection />
        <ContactSection />
      </main>
      <DefaultFooter />
    </>
  );
}
