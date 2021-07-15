import H6 from '@material-tailwind/react/Heading6';
import Image from '@material-tailwind/react/Image';
import Paragraph from '@material-tailwind/react/Paragraph';
import * as React from 'react';
interface WidgetCardProps {
  image: string;
  nameProduct: string;
  description: string;
}

export default function WidgetCard({ image, description, nameProduct }: WidgetCardProps) {
  return (
    <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
      <div className="px-6">
        <Image src={image} alt={nameProduct} raised />
        <div className="pt-6 text-center">
          <H6 color="gray">{nameProduct}</H6>
          <Paragraph color="blueGray">{description}</Paragraph>
        </div>
      </div>
    </div>
  );
}
