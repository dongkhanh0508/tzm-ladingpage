import Button from '@material-tailwind/react/Button';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import CardHeader from '@material-tailwind/react/CardHeader';
import H5 from '@material-tailwind/react/Heading5';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import { Box, List, Typography, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Template1 from 'components/templates/template1/Template1';
import Template2 from 'components/templates/template2/Template2';
import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import './template.css';
import { FetchAttrs, selectAttrs, selectStore, templateActions } from './templateSlice';

//style
const useStyles = makeStyles((theme) => ({
  divTemplates: {
    height: 'auto',
  },
  divPreview: {
    height: '85vh',
    overflow: 'scroll',
  },
  cardHeader: {
    marginTop: '5px',
  },
  cardBody: {
    height: '60vh',
  },
}));
const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: '#42adf5',
      borderRadius: '8px',
    },
  },
  selected: {},
})(MuiListItem);
//class option
export interface Option {
  value: number;
  label: string;
}

export default function TemplatesPage() {
  //languages
  const { t } = useTranslation();
  //style
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [storeSelected, setStoreSelected] = useState(0);
  const [valueQrCode, setValueQrCode] = useState('empty value');

  const dispatch = useAppDispatch();
  const stores = useAppSelector(selectStore);
  const attrs = useAppSelector(selectAttrs);
  const options: Array<Option> = stores.map((x) => ({
    value: x.id,
    label: x.name,
  }));
  useEffect(() => {
    dispatch(templateActions.fetchStores());
  }, [dispatch]);

  //function
  const handleSelectedOptionChange = (selectedOption) => {
    setStoreSelected(selectedOption.value);
    const params: FetchAttrs = {
      storeId: selectedOption.value,
      typeId: 4,
    };

    dispatch(templateActions.fetchAttrs(params));
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleQrCodeClick = (action: boolean) => {
    if (action) {
      const valueQrCode =
        'https://' +
        window.location.host +
        '/profile-store/' +
        storeSelected +
        '/template/' +
        selectedIndex;
      setValueQrCode(valueQrCode);
    }
    setShowModal(action);
  };
  const downloadQR = () => {
    const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      console.log('pngUrl', pngUrl);
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'test.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else return;
  };

  let template;
  if (selectedIndex === 1) {
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
  return (
    <>
      <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4"></div>
        </div>
      </div>
      <div className="px-3 md:px-8 h-auto -mt-24" style={{ marginTop: '-140px' }}>
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4} className={classes.divTemplates}>
                  <Box>
                    <Card>
                      <CardHeader color="amber" size="lg" className={classes.cardHeader}>
                        <H5 color="white">{t('content.listTemplate')}</H5>
                      </CardHeader>

                      <CardBody className={classes.cardBody}>
                        <Box>
                          <List component="nav" aria-label="main mailbox folders">
                            <ListItem
                              button
                              selected={selectedIndex === 1}
                              onClick={(event) => handleListItemClick(event, 1)}
                            >
                              <ListItemIcon>
                                <BookmarksIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={<Typography variant="h5">{t('content.tem1')}</Typography>}
                              />
                            </ListItem>
                            <ListItem
                              button
                              selected={selectedIndex === 2}
                              onClick={(event) => handleListItemClick(event, 2)}
                            >
                              <ListItemIcon>
                                <BookmarksIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={<Typography variant="h5">{t('content.tem2')}</Typography>}
                              />
                            </ListItem>
                          </List>
                        </Box>
                      </CardBody>
                      <CardFooter>
                        <Grid container>
                          <Grid item xs={4}>
                            <Button
                              color="lightBlue"
                              buttonType="outline"
                              size="regular"
                              rounded={false}
                              block={false}
                              iconOnly={false}
                              ripple="dark"
                              onClick={(e) => handleQrCodeClick(true)}
                            >
                              QR CODE
                            </Button>
                          </Grid>
                          <Grid item xs={8}>
                            <Select
                              placeholder={t('content.selectStore')}
                              options={options}
                              onChange={handleSelectedOptionChange}
                            />
                          </Grid>
                        </Grid>
                      </CardFooter>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <Box className={classes.divPreview}>
                    <Card>
                      <CardHeader color="purple" size="lg" className={classes.cardHeader}>
                        <H5 color="white">{t('content.preview')}</H5>
                      </CardHeader>

                      <CardBody>
                        <Box>{template}</Box>
                      </CardBody>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
      <Modal size="sm" active={showModal} toggler={() => handleQrCodeClick(false)}>
        <ModalHeader toggler={() => handleQrCodeClick(false)}>QR CODE</ModalHeader>
        <ModalBody>
          <QRCode id="qrcode" value={valueQrCode} size={290} level={'H'} includeMargin={true} />
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="filled"
            onClick={() => handleQrCodeClick(false)}
            ripple="dark"
          >
            {t('content.btnClose')}
          </Button>
          <Button color="green" onClick={downloadQR} ripple="light">
            {t('content.btnDownloadQR')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
