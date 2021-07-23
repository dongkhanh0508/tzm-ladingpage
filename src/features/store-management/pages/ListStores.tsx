import Button from '@material-tailwind/react/Button';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardHeader from '@material-tailwind/react/CardHeader';
import Icon from '@material-tailwind/react/Icon';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import { Box, LinearProgress, makeStyles, TableBody, TableCell, TableRow } from '@material-ui/core';
import storeApi from 'api/storeApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useTable } from 'components/Common';
import { GetStatusMap, PaginationRequest, Store } from 'models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Swal from 'sweetalert2';
import StoreFilter from '../components/StoreFilter';
import { selectFilter, selectLoading, selectStoresResponse, storeActions } from '../storeSlice';
import './style.css';

const useStyle = makeStyles((theme) => ({
  header: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  title: {
    width: '90%',
  },
}));
export default function ListStore() {
  //declare
  //const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [storeSelected, setStoreSelected] = useState<Store>();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const rs = useAppSelector(selectStoresResponse);
  const loading = useAppSelector(selectLoading);
  //const storeType = useAppSelector(selectStoreType);
  const { statusMap } = GetStatusMap();
  const classes = useStyle();
  const match = useRouteMatch();
  const history = useHistory();

  //effect
  useEffect(() => {
    dispatch(storeActions.fetchStores(filter));
  }, [dispatch, filter]);

  //functions
  // const handleClick = (action) => {
  //   setShowModal(action);
  // };
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

  const handelRemoveClick = (store: Store) => {
    setStoreSelected(store);
    setConfirmDelete(true);
  };
  const handelConfirmRemoveClick = async () => {
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
    try {
      await storeApi.remove(storeSelected?.id || 0);
      const newFilter = { ...filter };
      dispatch(storeActions.setFilter(newFilter));

      Toast.fire({
        icon: 'success',
        title: storeSelected?.name + ' ' + t('store.deleteSuccess'),
      });
      setStoreSelected(undefined);
      setConfirmDelete(false);
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: storeSelected?.name + ' ' + t('common.errorText'),
      });
    }
  };

  //header
  const { t } = useTranslation();
  const headCells = [
    { id: 'no', label: '#' },
    { id: 'name', label: t('store.storeName') },
    { id: 'address', label: t('store.address') },
    { id: 'storeTypeName', label: t('store.storeTypeName') },
    { id: 'status', label: t('common.status') },
    { id: 'actions', label: t('common.actions'), disableSorting: true, align: 'center' },
  ];

  const { TblContainer, TblHead, TblPagination } = useTable({
    rs,
    headCells,
    filter,
    onPageChange,
    onRowPerPageChange,
    onSortChange,
  });
  const handelDetailsClick = (store: Store) => {
    history.push(`${match.url}/${store.id}`);
  };

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
              <CardHeader color="purple" contentPosition="left" className={classes.header}>
                <Box className={classes.title}>
                  <h2 className="text-white text-2xl">{t('store.title')}</h2>
                </Box>
                <Box>
                  <Link to={`${match.url}/add`}>
                    <Button color="green" type="button" ripple="light" iconOnly={false}>
                      <Icon name="add_circle" size="2xl" />
                      {t('store.btnAdd')}
                    </Button>
                  </Link>
                </Box>
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
                                onClick={() => handelDetailsClick(e)}
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
                                onClick={() => handelRemoveClick(e)}
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
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      {/* {model add} */}
      {/* <Modal size="lg" active={showModal} toggler={() => handleClick(false)}>
        <ModalHeader toggler={() => handleClick(false)}>Modal Title</ModalHeader>
        <ModalBody>
          <StoreForm storeTypes={storeType} />
        </ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={() => handleClick(false)} ripple="dark">
            Close
          </Button>

          <Button color="green" onClick={() => handleClick(false)} ripple="light">
            Save Changes
          </Button>
        </ModalFooter>
      </Modal> */}
      {/* {model confirm delete} */}
      <Modal size="sm" active={confirmDelete} toggler={() => setConfirmDelete(false)}>
        <ModalHeader toggler={() => setConfirmDelete(false)}>
          {t('common.titleConfirm')}
        </ModalHeader>
        <ModalBody>
          <p className="text-base leading-relaxed text-gray-600 font-normal">
            {t('store.removeTitleStart') + storeSelected?.name + ' ' + t('store.removeTitleEnd')}
            <br />
            {t('common.canRevert')}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setConfirmDelete(false)} ripple="dark">
            {t('content.btnClose')}
          </Button>

          <Button color="green" onClick={handelConfirmRemoveClick} ripple="light">
            {t('common.confirmBtn')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
