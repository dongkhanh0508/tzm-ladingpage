import Button from '@material-tailwind/react/Button';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import { TableBody, TableCell, TableRow, LinearProgress, Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useTable } from 'components/Common';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectFilter, selectLoading, selectStoresResponse, storeActions } from '../storeSlice';

import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import StoreFilter from '../components/StoreFilter';
import './style.css';
import { GetStatusMap, PaginationRequest } from 'models';
import Icon from '@material-tailwind/react/Icon';

export default function ListStore() {
  //declare
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const rs = useAppSelector(selectStoresResponse);
  const loading = useAppSelector(selectLoading);
  const statusMap = GetStatusMap();

  //effect
  useEffect(() => {
    dispatch(storeActions.fetchStoreType());
  }, [dispatch]);
  useEffect(() => {
    dispatch(storeActions.fetchStoreType());
    dispatch(storeActions.fetchStores(filter));
  }, [dispatch, filter]);

  //functions
  const handleClick = (action) => {
    setShowModal(action);
  };
  const onPageChange = (page: number) => {
    console.log(page);
    dispatch(
      storeActions.setFilter({
        ...filter,
        page: page + 1,
      })
    );
  };
  const onRowPerPageChange = (perPage: number) => {
    dispatch(
      storeActions.setFilter({
        ...filter,
        pageSize: perPage,
      })
    );
  };
  const onSortChange = (colName: string, sortType: number) => {
    dispatch(
      storeActions.setFilter({
        ...filter,
        colName: colName,
        sortType: sortType,
      })
    );
  };
  const handelSearchDebounce = (newFilter: PaginationRequest) => {
    dispatch(storeActions.setFilterWithDebounce(newFilter));
  };
  //header
  const { t } = useTranslation();
  const headCells = [
    { id: 'no', label: '#' },
    { id: 'name', label: t('store.storeName') },
    { id: 'address', label: t('store.address') },
    { id: 'storeTypeName', label: t('store.storeTypeName') },
    { id: 'status', label: t('store.status') },
    { id: 'actions', label: t('store.actions'), disableSorting: true, align: 'center' },
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
                <h2 className="text-white text-2xl">{t('store.title')}</h2>
              </CardHeader>
              {loading && <LinearProgress color="primary" />}
              <Box mr={1}>
                <StoreFilter filter={filter} onSearchChange={handelSearchDebounce} />
              </Box>

              <CardBody>
                <div className="overflow-x-auto">
                  <TblContainer>
                    <TblHead />
                    <TableBody>
                      {rs.results.map((e, idx) => (
                        <TableRow key={e.id}>
                          <TableCell
                            width={80}
                            className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-0 py-0 text-left"
                          >
                            {idx + 1}
                          </TableCell>
                          <TableCell className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-0 py-0 text-left">
                            {e.name}
                          </TableCell>
                          <TableCell className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-0 py-0 text-left">
                            {e.address}
                          </TableCell>
                          <TableCell className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-0 py-0 text-left">
                            {e.storeTypeName === '' ? t('store.none') : e.storeTypeName}
                          </TableCell>
                          <TableCell className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-0 py-0 text-left">
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
                                <Icon name="edit" size="sm" /> {t('store.details')}
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
                                <Icon name="delete" size="sm" /> {t('store.remove')}
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TblContainer>
                  <TblPagination />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      {/* <Button color="lightBlue" type="button" onClick={() => handleClick(true)} ripple="light">
        Open regular Modal
      </Button> */}
      <Modal size="regular" active={showModal} toggler={() => handleClick(false)}>
        <ModalHeader toggler={() => handleClick(false)}>Modal Title</ModalHeader>
        <ModalBody>test</ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={() => handleClick(false)} ripple="dark">
            Close
          </Button>

          <Button color="green" onClick={() => handleClick(false)} ripple="light">
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
