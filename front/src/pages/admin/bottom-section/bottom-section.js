import React from 'react';
import { selectAdmin } from '../../../app/admin';
import { useSelector } from 'react-redux';

export const BottomSection = () => {
  const { clientList, managers } = useSelector(selectAdmin) || {};


  return (
    <section class="all" style={{ marginBottom: 150 }}>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-6">
                <h2 class="all_title_alt">Список мастеров</h2>

                <div class="table-responsive">
                    <table class="table table-bordered"> 
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Имя</th>
                                <th>Email</th>
                                <th>Активных задач</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            managers.map((client, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td> 
                                  <td>{client.name}</td> 
                                  <td>{client.email}</td> 
                                  <td>{client.countActive || 0}</td> 
                                </tr>
                              )
                            })
                          }
                        </tbody>

                    </table>
                </div>
            </div>
            <div class="col-lg-6">
                <h2 class="all_title_alt">Список клиентов</h2>

                <div class="table-responsive">
                    <table class="table table-bordered"> 
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Имя</th>
                                <th>Email</th>
                                <th>Телефон</th>
                                <th>Адрес</th>
                                <th>Обращений</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            clientList.map((client, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td> 
                                  <td>{client.name}</td> 
                                  <td>{client.email}</td> 
                                  <td>{client.phone}</td> 
                                  <td>{client.address}</td> 
                                  <td>{client.count || 0}</td> 
                                </tr>
                              )
                            })
                          }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
                
          
        
    </div>
</section>
  )
}