import Button from '@material-tailwind/react/Button';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import { Box, LinearProgress, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useTable } from 'components/Common';
import { GetStatusMap, PoiPagingRequest } from 'models';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PoiFilter from '../components/PoiFilter';
import { poiActions, selectFilter, selectLoading, selectPoiList } from '../poiSlice';
import './style.css';

interface PoiListProps {}

export default function PoiList(props: PoiListProps) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const loading = useAppSelector(selectLoading);
  const rs = useAppSelector(selectPoiList);
  const { statusMap } = GetStatusMap();

  //effect
  useEffect(() => {
    dispatch(poiActions.fetchPoiList(filter));
  }, [dispatch, filter]);
  //functions
  const onPageChange = (page: number) => {
    dispatch(
      poiActions.setFilter({
        ...filter,
        page: page + 1,
      })
    );
  };
  const onRowPerPageChange = (perPage: number) => {
    dispatch(
      poiActions.setFilter({
        ...filter,
        pageSize: perPage,
      })
    );
  };
  const onSortChange = (colName: string, sortType: number) => {
    dispatch(
      poiActions.setFilter({
        ...filter,
        colName: colName,
        sortType: sortType,
      })
    );
  };
  const handelFilterChange = (newFilter: PoiPagingRequest) => {
    dispatch(poiActions.setFilterWithDebounce(newFilter));
  };
  const handelSearchDebounce = (newFilter: PoiPagingRequest) => {
    dispatch(poiActions.setFilterWithDebounce(newFilter));
  };
  //header
  const { t } = useTranslation();
  const headCells = [
    { id: 'no', label: '#', disableSorting: true },
    { id: 'poiName', label: t('poi.poiName') },
    { id: 'poiCode', label: t('poi.poiCode'), disableSorting: true },
    { id: 'poiType', label: t('poi.poiType'), disableSorting: true },
    { id: 'brandPoi', label: t('poi.brandPois'), disableSorting: true },
    { id: 'status', label: t('common.status'), disableSorting: true },
    { id: 'action', label: t('common.actions'), disableSorting: true, align: 'center' },
  ];

  const { TblContainer, TblHead, TblPagination } = useTable({
    rs,
    headCells,
    filter,
    onPageChange,
    onRowPerPageChange,
    onSortChange,
  });

  return (
    <CardBody>
      <Box minHeight={450} className="overflow-x-auto">
        {loading && <LinearProgress color="primary" />}
        <PoiFilter
          filter={filter}
          onChange={handelFilterChange}
          onSearchChange={handelSearchDebounce}
        />
        <TblContainer>
          <TblHead />
          <TableBody>
            {rs.results.map((e, idx) => (
              <TableRow key={e.id}>
                <TableCell width={80}>{idx + 1}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.poiCode}</TableCell>
                <TableCell>{e.poiTypeName}</TableCell>
                <TableCell>{e.countPoiBrands}</TableCell>
                <TableCell>
                  <Box color={statusMap[e.status].color} fontWeight="bold">
                    {statusMap[e.status].name}
                  </Box>
                </TableCell>
                <TableCell width={250}>
                  <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      color="yellow"
                      buttonType="link"
                      size="small"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                    >
                      <Icon name="edit" size="sm" /> {t('common.details')}
                    </Button>
                    <Button
                      color="deepOrange"
                      buttonType="link"
                      size="small"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                    >
                      <Icon name="delete" size="sm" /> {t('common.remove')}
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Box>
    </CardBody>
  );
}
