import Button from '@material-tailwind/react/Button';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { Rowing } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StoreTable from '../components/StoreTable';
import UseTable from '../components/useTable';
import { selectFilter, selectStoresResponse, storeActions } from '../storeSlice';

interface ListStoreProps {
  TblContainer: any;
}

export default function ListStore(props: ListStoreProps) {
  //declare
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const rs = useAppSelector(selectStoresResponse);

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
  //header
  const { t } = useTranslation();
  const headCells = [
    { id: 'no', label: '#' },
    { id: 'name', label: t('store.storeName') },
    { id: 'address', label: t('store.address') },
    { id: 'storeTypeName', label: t('store.storeTypeName') },
    { id: 'status', label: t('store.status') },
    { id: 'actions', label: t('store.actions'), disableSorting: true },
  ];

  const { TblContainer, TblHead, TblPagination } = StoreTable({
    rs,
    headCells,
    onPageChange,
    onRowPerPageChange,
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
            <TblContainer>
              <TblHead />
              <TableBody>
                {rs.results.map((e, idx) => (
                  <TableRow key={e.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{e.address}</TableCell>
                    <TableCell>{e.storeTypeName}</TableCell>
                    <TableCell>{e.status}</TableCell>
                    <TableCell>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                      <Button size="small" color="secondary">
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </div>
        </div>
      </div>
      <Button color="lightBlue" type="button" onClick={() => handleClick(true)} ripple="light">
        Open regular Modal
      </Button>
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
