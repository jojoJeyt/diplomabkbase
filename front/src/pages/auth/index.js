import React, { useState } from 'react';
import { login } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiReducer } from '../../app/ui.reducer';



export const Auth = () => {

  const dispatch = useDispatch();
  const [loginForm, setValue ] = useState({ email: '', password: '' });
  const navigation = useNavigate();


  const handleChange = (field) => ({ target: { value }}) => {
    setValue((state) => ({...state, [field]: value }));
  }


  const handleSubmit = async () => {
    console.log(loginForm, 'loginForm');

    const res = await login(loginForm);

    if(res.data.success) {
			console.log(res.data.user, 'res.data.user');
			sessionStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(uiReducer.actions.setUser(res.data.user));
      navigation('/admin');
    }
  };


  return (
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-26" style={{ marginBottom: 20 } }>
						BK Base Admin
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Email формата: a@b.c">
						<input class="input100" type="text" name="email" require onChange={handleChange('email')}></input>
						<span class="focus-input100" data-placeholder="Email"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Введите пароль">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="password" require onChange={handleChange('password')}></input>
						<span class="focus-input100" data-placeholder="Пароль"></span>
					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" type='button' name="login" onClick={handleSubmit}>
								Вход
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
  )
}