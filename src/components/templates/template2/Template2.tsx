import H2 from '@material-tailwind/react/Heading2';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
import LeadText from '@material-tailwind/react/LeadText';
import { makeStyles } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WebIcon from '@material-ui/icons/Web';
import Image1 from 'assets/img/team-1-800x800.jpg';
import Image2 from 'assets/img/team-2-800x800.jpg';
import Image3 from 'assets/img/team-3-800x800.jpg';
import Image4 from 'assets/img/team-4-470x470.png';
import { TemplateProps } from 'models';
import WidgetCard from './WidgetCard';

const useStyles = makeStyles((theme) => ({
  iconSpacing: {
    justifyContent: 'space-evenly',
  },
}));
export default function Template2({
  backgroundImage,
  facebook,
  gmail,
  logoImage,
  phone,
  title,
  website,
  zalo,
  address,
  instagram,
  youtube,
  slogan,
}: TemplateProps) {
  const classes = useStyles();
  return (
    <>
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
          <div
            className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="container max-w-8xl relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <Image src={logoImage} rounded={true} raised={false} alt="Rounded Image" />
                <H2 color="white">{title}</H2>
                <div className="text-gray-200">
                  <LeadText color="gray-200">
                    <LocationOnIcon />
                    &nbsp;
                    {address}
                  </LeadText>
                  <LeadText color="gray-200">
                    <AlternateEmailIcon />
                    &nbsp;
                    {gmail}
                  </LeadText>
                  <LeadText color="gray-200">
                    <WebIcon />
                    &nbsp;
                    {website}
                  </LeadText>
                  <div className="pt-6 text-center">
                    <div className={`flex items-center justify-center ${classes.iconSpacing}`}>
                      <a
                        href={facebook}
                        className="grid place-items-center bg-white text-blue-600 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon family="font-awesome" name="fab fa-facebook-square" />
                      </a>
                      <a
                        href={instagram}
                        className="grid place-items-center bg-white text-indigo-500 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon family="font-awesome" name="fab fa-instagram" />
                      </a>
                      <a
                        href={youtube}
                        className="grid place-items-center bg-white text-red-600 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon family="font-awesome" name="fab fa-youtube" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="pt-20 pb-48">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap">
              <WidgetCard image={Image1} nameProduct="PD1" description="Web Developer" />
              <WidgetCard
                image={Image2}
                nameProduct="Romina Hadid"
                description="Marketing Specialist"
              />
              <WidgetCard image={Image3} nameProduct="Alexa Smith" description="UI/UX Designer" />
              <WidgetCard image={Image4} nameProduct="Jenna Kardi" description="Founder and CEO" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
