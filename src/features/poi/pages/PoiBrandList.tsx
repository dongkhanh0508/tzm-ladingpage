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
import PoiBrandFilter from '../components/PoiBrandFilter';
import { poiBrandActions, selectFilter, selectLoading, selectPoiBrandList } from '../poiBrandSlice';
import './style.css';

interface PoiListProps {}

export default function PoiBrandList(props: PoiListProps) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const loading = useAppSelector(selectLoading);
  const rs = useAppSelector(selectPoiBrandList);
  const { statusMap } = GetStatusMap();

  //effect
  useEffect(() => {
    dispatch(poiBrandActions.fetchPoiBrandList(filter));
  }, [dispatch, filter]);
  //functions
  const onPageChange = (page: number) => {
    dispatch(
      poiBrandActions.setFilter({
        ...filter,
        page: page + 1,
      })
    );
  };
  const onRowPerPageChange = (perPage: number) => {
    dispatch(
      poiBrandActions.setFilter({
        ...filter,
        pageSize: perPage,
      })
    );
  };
  const onSortChange = (colName: string, sortType: number) => {
    dispatch(
      poiBrandActions.setFilter({
        ...filter,
        colName: colName,
        sortType: sortType,
      })
    );
  };
  const handelSearchDebounce = (newFilter: PoiPagingRequest) => {
    dispatch(poiBrandActions.setFilterWithDebounce(newFilter));
  };
  const handelFilterChange = (newFilter: PoiPagingRequest) => {
    dispatch(poiBrandActions.setFilterWithDebounce(newFilter));
  };
  //header
  const { t } = useTranslation();

  const headCells = [
    { id: 'no', label: '#', disableSorting: true },
    { id: 'poiName', label: t('poi.poiName'), disableSorting: true },
    { id: 'brandPoiCode', label: t('poi.brandPoiCode'), disableSorting: true },
    { id: 'alias', label: t('poi.alias'), disableSorting: true },
    { id: 'poiType', label: t('poi.poiType'), disableSorting: true },
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
        <PoiBrandFilter
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
                <TableCell>{e.brandPoiCode}</TableCell>
                <TableCell>{e.alias}</TableCell>
                <TableCell>{e.poiTypeName}</TableCell>
                <TableCell>
                  <Box color={statusMap[e.statusPoiBrand].color} fontWeight="bold">
                    {statusMap[e.statusPoiBrand].name}
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
