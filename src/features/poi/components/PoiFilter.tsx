import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import InputIcon from '@material-tailwind/react/InputIcon';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import { Box, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import SelectMUI from 'components/Common/SelectMUI';
import {
  adminLevelActions,
  selectDistrictOptions,
  selectProvinceOptions,
  selectWardOptions,
} from 'features/admin-level/adminLevelSlice';
import { GetStatusMap, PoiPagingRequest } from 'models';
import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { selectPoiTypeList } from '../poiSlice';

interface PoiFilterProps {
  filter: PoiPagingRequest;

  onChange?: (newFilter: PoiPagingRequest) => void;
  onSearchChange?: (newFilter: PoiPagingRequest) => void;
}

export default function PoiFilter({ filter, onChange, onSearchChange }: PoiFilterProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const poiTypes = useAppSelector(selectPoiTypeList);
  const { statusFilter } = GetStatusMap();
  const provinceOptions = useAppSelector(selectProvinceOptions);
  const districtOptions = useAppSelector(selectDistrictOptions);
  const wardOptions = useAppSelector(selectWardOptions);
  const [showModal, setShowModal] = React.useState(false);

  const handelSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      keySearch: e.target.value === '' ? undefined : e.target.value,
    };
    onSearchChange(newFilter);
  };
  const handleProvinceChange = (selectedId: number) => {
    dispatch(adminLevelActions.provinceChange(selectedId));
    if (!onChange) return;
    const newFilter: PoiPagingRequest = {
      ...filter,
      provinceId: selectedId,
    };
    onChange(newFilter);
  };
  const handleDistrictChange = (selectedId: number) => {
    dispatch(adminLevelActions.districtChange(selectedId));
    if (!onChange) return;
    const newFilter: PoiPagingRequest = {
      ...filter,
      districtId: selectedId,
    };
    onChange(newFilter);
  };
  const handelPoiTypeChange = (selectedId: number) => {
    if (!onChange) return;
    const newFilter: PoiPagingRequest = {
      ...filter,
      poiTypeId: selectedId,
    };
    onChange(newFilter);
  };
  const handelStatusChange = (selectedId: number) => {
    if (!onChange) return;
    const newFilter: PoiPagingRequest = {
      ...filter,
      status: selectedId,
    };
    onChange(newFilter);
  };
  const handelWardChange = (selectedId: number) => {
    if (!onChange) return;
    const newFilter: PoiPagingRequest = {
      ...filter,
      wardId: selectedId,
    };
    onChange(newFilter);
  };
  return (
    <>
      <Box mt={1} mb={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputIcon
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder={t('poi.search')}
                iconFamily="material-icons"
                iconName="search"
                onChange={handelSearchChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <SelectMUI
              isAll={true}
              label={t('poi.poiType')}
              labelId="filterByPoiType"
              options={poiTypes}
              onChange={handelPoiTypeChange}
              selected={filter.poiTypeId}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <SelectMUI
              isAll={true}
              label={t('common.status')}
              labelId="filterByPoiStatus"
              options={statusFilter}
              onChange={handelStatusChange}
              selected={filter.status}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              color="lightBlue"
              buttonType="link"
              size="small"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="light"
              onClick={(e) => setShowModal(true)}
            >
              <Icon name="filter_list" size="sm" /> {t('poi.filter')}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
        <ModalHeader toggler={() => setShowModal(false)}>{t('poi.titleFilter')}</ModalHeader>
        <ModalBody>
          <Box
            style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}
            width={400}
          >
            <Box>
              <SelectMUI
                isAll={true}
                label={t('adminLevel.province')}
                labelId="filterByProvince"
                options={provinceOptions}
                onChange={handleProvinceChange}
                selected={filter.provinceId}
              />
            </Box>
            <Box mt={1}>
              <SelectMUI
                isAll={true}
                label={t('adminLevel.district')}
                labelId="filterByDistrict"
                options={districtOptions}
                onChange={handleDistrictChange}
                selected={filter.districtId}
              />
            </Box>
            <Box mt={1}>
              <SelectMUI
                isAll={true}
                label={t('adminLevel.ward')}
                labelId="filterByWard"
                onChange={handelWardChange}
                selected={filter.wardId}
                options={wardOptions}
              />
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={() => setShowModal(false)} ripple="dark">
            {t('content.btnClose')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
