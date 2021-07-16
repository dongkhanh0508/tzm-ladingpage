import { useAppDispatch, useAppSelector } from 'app/hooks';
import Template1 from 'components/templates/template1/Template1';
import Template2 from 'components/templates/template2/Template2';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchAttrs, selectAttrs, templateActions } from './templateSlice';

interface BioPageProps {}
type BioParams = {
  storeId: string;
  templateId: string;
};

export default function BioPage(props: BioPageProps) {
  const { storeId, templateId } = useParams<BioParams>();
  const dispatch = useAppDispatch();
  const attrs = useAppSelector(selectAttrs);
  const params: FetchAttrs = {
    storeId: Number(storeId),
    typeId: 4,
  };
  useEffect(() => {
    dispatch(templateActions.fetchAttrs(params));
  });
  let template;
  if (Number(templateId) === 1) {
    template = (
      <Template1
        address={attrs.address}
        backgroundImage={attrs.backgroundImage}
        logoImage={attrs.logoImage}
        facebook={attrs.facebook}
        gmail={attrs.gmail}
        instagram={attrs.instagram}
        phone={attrs.phone}
        slogan={attrs.slogan}
        title={attrs.title}
        website={attrs.website}
        youtube={attrs.youtube}
        zalo={attrs.zalo}
      />
    );
  } else {
    template = (
      <Template2
        address={attrs.address}
        backgroundImage={attrs.backgroundImage}
        logoImage={attrs.logoImage}
        facebook={attrs.facebook}
        gmail={attrs.gmail}
        instagram={attrs.instagram}
        phone={attrs.phone}
        slogan={attrs.slogan}
        title={attrs.title}
        website={attrs.website}
        youtube={attrs.youtube}
        zalo={attrs.zalo}
      />
    );
  }
  return <div>{template}</div>;
}
