import * as React from 'react';
import Tab from '@material-tailwind/react/Tab';
import TabList from '@material-tailwind/react/TabList';
import TabItem from '@material-tailwind/react/TabItem';
import TabContent from '@material-tailwind/react/TabContent';
import TabPane from '@material-tailwind/react/TabPane';
import Icon from '@material-tailwind/react/Icon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PoiList from './PoiList';
import PoiBrandList from './PoiBrandList';
import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import { poiActions } from '../poiSlice';
import { adminLevelActions } from 'features/admin-level/adminLevelSlice';

interface PoiIndexProps {}

export default function PoiIndex(props: PoiIndexProps) {
  const [openTab, setOpenTab] = useState(1);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(poiActions.fetchPoiTypeList());
    dispatch(adminLevelActions.fetchAdminLevelData());
  }, [dispatch]);
  const handelChangeTab = (tab: number) => {
    setOpenTab(tab);
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
            <Tab>
              <TabList color="purple">
                <TabItem
                  onClick={(e) => {
                    e.preventDefault();
                    handelChangeTab(1);
                  }}
                  ripple="light"
                  active={openTab === 1 ? true : false}
                  href="tabItem"
                >
                  <Icon name="edit_location" size="lg" />
                  {t('poi.tabPoiBrand')}
                </TabItem>
                <TabItem
                  onClick={(e) => {
                    e.preventDefault();
                    handelChangeTab(2);
                  }}
                  ripple="light"
                  active={openTab === 2 ? true : false}
                  href="tabItem"
                >
                  <Icon name="location_on" size="lg" />
                  {t('poi.tabPoi')}
                </TabItem>
              </TabList>

              <TabContent>
                <TabPane active={openTab === 1 ? true : false}>
                  {openTab === 1 ? <PoiBrandList /> : ''}
                </TabPane>
                <TabPane active={openTab === 2 ? true : false}>
                  {openTab === 2 ? <PoiList /> : ''}
                </TabPane>
              </TabContent>
            </Tab>
          </div>
        </div>
      </div>
    </>
  );
}
