import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import H3 from '@material-tailwind/react/Heading3';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import * as React from 'react';
import { TemplateProps } from 'models';

export default function Template1({
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
  return (
    <>
      <main>
        <section className="relative block h-[500px]">
          <div
            className="bg-profile-background bg-cover bg-center absolute top-0 w-full h-full"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </section>
        <section className="relative py-16 bg-gray-100">
          <div className="container max-w-7xl px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <div className="w-40 -mt-20">
                        <Image src={logoImage} alt="Profile picture" raised rounded />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:self-center flex justify-center mt-10 lg:justify-end lg:mt-0">
                    <Button color="lightBlue" ripple="light">
                      {phone}
                    </Button>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
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

                <div className="text-center my-8">
                  <H3 color="gray">{title}</H3>
                  <div className="mt-0 mb-2 text-gray-700 font-medium flex items-center justify-center gap-2">
                    <Icon name="place" size="xl" />
                    {address}
                  </div>
                  <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                    <Icon name="work" size="xl" />
                    {gmail}
                  </div>
                  <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                    <Icon name="account_balance" size="xl" />
                    {website}
                  </div>
                </div>

                <div className="mb-10 py-2 border-t border-gray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4 flex flex-col items-center">
                      <LeadText color="blueGray">{slogan}</LeadText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
