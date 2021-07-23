import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-tailwind/react/Button';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import CardHeader from '@material-tailwind/react/CardHeader';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import storeApi from 'api/storeApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useDebouncedCallback } from 'components/Common';
import { SearchAddress } from 'components/Common/SearchAddress';
import MapWithMarker from 'components/map/MapWithMarker';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Address, PostStore, Store } from 'models';
import * as React from 'react';
import { forwardRef } from 'react';
import { useEffect, useState } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCurrentUser } from 'utils/common';
import * as yup from 'yup';
import { selectFilter, selectStoreType, storeActions } from '../storeSlice';

const AddEditStorePage = (props, ref) => {
  //get params
  const { storeId } = useParams<{ storeId: string }>();
  const dispatch = useAppDispatch();
  const isEdit = Boolean(storeId);
  const [store, setStore] = useState<Store>();
  const [selectedStoreType, setSelectedStoreType] = useState<string>('');
  const { t } = useTranslation();
  const history = useHistory();
  const [location, setLocation] = useState<LatLngExpression>();
  const storeTypes = useAppSelector(selectStoreType);
  const filter = useAppSelector(selectFilter);
  const [imgLink, setImglink] = useState<string>(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/1024px-Circle-icons-image.svg.png'
  );
  const user = getCurrentUser();

  //schema
  const schema = yup.object().shape({
    name: yup.string().required(t('store.errorStoreName')),
    imageUrl: yup.string().notRequired(),
    coordinateString: yup.string().required(t('store.errorLocation')),
    address: yup.string().required(t('store.errorAddress')),
    storeCode: yup.string().required(t('store.errorStoreCode')),
    storeTypeId: yup.number().required(t('store.errorStoreType')),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
    getValues,
  } = useForm<PostStore>({
    resolver: yupResolver(schema),
  });
  const { isDirty } = useFormState({ control });
  useEffect(() => {
    if (!storeId) return;

    //IFFE
    (async () => {
      try {
        const data: Store = await storeApi.getStoreById(storeId);
        setStore(data);
        setSelectedStoreType(
          data?.storeTypeId !== undefined && data?.storeTypeId !== 0
            ? data?.storeTypeId.toString()
            : ''
        );
        setImglink(data?.imageUrl || '');
        let postLocation: string = '';
        if (data?.geom?.coordinates) {
          const detailsLocation: LatLngExpression = [
            data?.geom?.coordinates[1],
            data?.geom?.coordinates[0],
          ];

          postLocation = data?.geom?.coordinates[0] + ' ' + data?.geom?.coordinates[1];
          setLocation(detailsLocation);
        }
        const newValue: PostStore = {
          address: data?.address || '',
          name: data?.name || '',
          //imageUrl: data?.imageUrl || '',
          coordinateString: postLocation,
          storeCode: data?.storeCode || '',
          storeTypeId: data?.storeTypeId || 0,
        };
        setValue('imageUrl', data?.imageUrl || '', {
          shouldDirty: false,
        });
        console.log('kkkkk: ' + getValues('imageUrl'));
        reset(newValue);
      } catch (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title: t('common.errorText'),
        });
      }
    })();
  }, [storeId]);

  const submitForm = async (data: PostStore) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    if (!isEdit) {
      try {
        if (!user) return;
        data.brandId = user.brandId;
        data.imageUrl = imgLink;
        await storeApi.add(data);

        Toast.fire({
          icon: 'success',
          title: t('store.addSuccess'),
        });
        history.push('/dashboard/manage-stores');
        const newFilter = { ...filter };
        dispatch(storeActions.setFilter(newFilter));
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: data?.name + ' ' + t('common.errorText') + ' ,' + t('store.storeCodeIsExisted'),
        });
      }
    } else {
      try {
        if (!user) return;
        data.brandId = user.brandId;
        data.imageUrl = imgLink;
        await storeApi.update(Number(storeId), data);
        Toast.fire({
          icon: 'success',
          title: t('store.updateSuccessStart') + data.name + ' ' + t('store.updateSuccessEnd'),
        });
        history.push('/dashboard/manage-stores');
        const newFilter = { ...filter };
        dispatch(storeActions.setFilter(newFilter));
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: data?.name + ' ' + t('common.errorText') + ' ,' + t('store.storeCodeIsExisted'),
        });
      }
    }
  };
  const handelSelectLocation = (address: Address) => {
    setLocation(address?.latlng);
    setValue('coordinateString', address?.postLatLng, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const handelStoreTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedStoreType(event.target.value as string);
  };

  const handelInputFieldImgChange = useDebouncedCallback((e) => {
    console.log(getValues('imageUrl'));
    setImglink(e.target.value);
  }, 800);
  return (
    <>
      <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4"></div>
        </div>
      </div>

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <Card>
              <CardHeader color="purple" contentPosition="left">
                <h2 className="text-white text-2xl">
                  {isEdit ? t('store.detailsStore') : t('store.formAdd')}
                </h2>
              </CardHeader>
              <CardBody>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Box
                          borderRadius={5}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            border: '2px solid purple',
                          }}
                        >
                          <Image
                            style={{ height: '35vh' }}
                            src={imgLink}
                            rounded={false}
                            raised={false}
                            alt="Image"
                            onError={() =>
                              setImglink(
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/1024px-Circle-icons-image.svg.png'
                              )
                            }
                          />
                        </Box>
                        <Box mt={1}>
                          <MapWithMarker position={location} />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <form onSubmit={handleSubmit(submitForm)}>
                        <CardBody>
                          <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                            {t('store.infoStore')}
                          </h6>
                          <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                              <Controller
                                name="name"
                                control={control}
                                render={({ field }) => {
                                  return (
                                    <Input
                                      type="text"
                                      color="purple"
                                      placeholder={t('store.storeName') + ' *'}
                                      error={errors?.name?.message}
                                      {...field}
                                    />
                                  ); // ✅
                                }}
                              />
                            </div>

                            <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                              <Controller
                                name="storeCode"
                                control={control}
                                render={({ field }) => {
                                  return (
                                    <Input
                                      type="text"
                                      color="purple"
                                      placeholder={t('store.storeCode') + ' *'}
                                      error={errors?.storeCode?.message}
                                      {...field}
                                    />
                                  ); // ✅
                                }}
                              />
                            </div>
                            <div className="w-full lg:w-12/12 mb-10 font-light">
                              <Controller
                                name="imageUrl"
                                control={control}
                                render={({ field }) => {
                                  return (
                                    <Input
                                      type="text"
                                      color="purple"
                                      placeholder={t('store.img')}
                                      {...field}
                                      //onChange={(e) => setImglink(e.target.value)}
                                      onChange={handelInputFieldImgChange}
                                    />
                                  ); // ✅
                                }}
                              />
                            </div>
                            <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                              <Input
                                type="text"
                                disabled
                                color="purple"
                                {...register('coordinateString')}
                                placeholder={t('store.location') + ' *'}
                                error={errors?.coordinateString?.message}
                                value={location}
                              />
                            </div>
                            <Controller
                              name="address"
                              control={control}
                              render={({ field }) => {
                                return (
                                  <Textarea
                                    type="text"
                                    color="purple"
                                    placeholder={t('store.address') + ' *'}
                                    error={errors?.address?.message}
                                    {...field}
                                  />
                                ); // ✅
                              }}
                            />
                            <Box className="w-full lg:w-12/12 mb-10 font-light" mt={2}>
                              <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel id="selectStoreType">
                                  {t('store.storeTypeName') + '*'}
                                </InputLabel>
                                <Select
                                  {...register('storeTypeId')}
                                  value={selectedStoreType}
                                  labelId="selectStoreType"
                                  onChange={handelStoreTypeChange}
                                  label={t('store.storeTypeName') + '*'}
                                >
                                  <MenuItem value="">
                                    <em>{t('common.all')}</em>
                                  </MenuItem>

                                  {storeTypes.map((e) => (
                                    <MenuItem key={e.id} value={e.id}>
                                      {e.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <p
                                style={{
                                  color: 'red',
                                  fontSize: '0.75rem',
                                  lineHeight: '1rem',
                                  marginTop: '5px',
                                }}
                              >
                                {' '}
                                {errors.storeTypeId?.message}{' '}
                              </p>
                            </Box>
                            <Box className="w-full lg:w-12/12 mb-10 font-light">
                              <SearchAddress onChangeAddress={handelSelectLocation} />
                            </Box>
                          </div>
                        </CardBody>
                        <CardFooter>
                          <Box
                            style={{
                              display: 'flex',
                              flexFlow: 'row nowrap',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <Box>
                              <Link to="/dashboard/manage-stores">
                                <Button
                                  color="lightBlue"
                                  buttonType="link"
                                  size="lg"
                                  rounded={false}
                                  block={false}
                                  iconOnly={false}
                                  ripple="light"
                                >
                                  <Icon name="arrow_back_ios" size="sm" /> {t('common.btnBack')}
                                </Button>
                              </Link>
                            </Box>
                            <Box>
                              <Button
                                disabled={!isDirty}
                                type="submit"
                                color="green"
                                buttonType="link"
                                size="lg"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                              >
                                <Icon name="save" size="sm" />{' '}
                                {isEdit ? t('common.btnUpdate') : t('common.btnSubmit')}
                              </Button>
                            </Box>
                          </Box>
                        </CardFooter>
                      </form>
                    </Grid>
                  </Grid>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default forwardRef(AddEditStorePage);
