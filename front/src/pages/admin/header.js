import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUi, uiReducer } from '../../app/ui.reducer';
import { Link, useNavigate } from "react-router-dom";



export const Header = () => {
  const user = useSelector(selectUi).user;
  const navigation = useNavigate();
  const dispatch = useDispatch();


  const logOut = () => {
    navigation('/login');
    sessionStorage.clear();
    dispatch(uiReducer.actions.setUser({}));
  };

  return (
    <header>
    <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd'}}>
        <Link className="navbar-brand" to="/">BK Base | Admin</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    Добро пожаловать <strong>{user?.name}</strong>! Ваш статус в системе: <strong>{user?.role === 'ADMIN' ? 'Администратор' : 'Менеджер'}</strong>.
                </li>
                <li class="nav-item">
                    <form action="panel.php" method="post" class="logout"><button type="submit" name="logout" class="form-control logout_button" onClick={logOut}>Выход</button></form>
                </li>
            </ul>
        </div>
    </nav>
</header>
  );
}