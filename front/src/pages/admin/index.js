import React, { useEffect, useMemo } from 'react';
import { Header } from './header';
import { AdminTable } from './admin-table';
import { fetchData, getListByManagerAsync } from '../../app/admin';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSection } from './bottom-section/bottom-section';
import { selectUi } from '../../app/ui.reducer';
import { ManagerTable } from './manager-table';
import { AppChart } from './app-chart';


const isManager = (role) => role === 'MANAGER';

export const AdminPage = () => {
  const dispatch = useDispatch();
  const { role } = useSelector(selectUi).user

  const manager = useMemo(() => {
    return isManager(role);
  }, [role]);

  useEffect(() => {
    if(manager) {
      dispatch(getListByManagerAsync());
    } else {
      dispatch(fetchData());
    }
  }, [manager, dispatch]);

  return <div>
    <Header />
    <div class="container-fluid">
      <AppChart />
      <div class="row">
                  <div class="col-12" style={{ textAlign: 'center' }}>
                      <h2 class="all_title">{!manager ? 'Проекты в системе' : 'Активные задачи'}</h2>
                  </div>
              </div>
      {!manager ? <AdminTable /> : <ManagerTable /> }
      {!manager ? <BottomSection /> : null }
    </div>
  </div>;
}