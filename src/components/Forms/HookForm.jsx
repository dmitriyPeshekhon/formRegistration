import './Forms.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { regexpEmail } from '../../constants/index';
import { useState } from 'react';

import eyeIcon from '../../assets/eye.png';
import closeEyeIcon from '../../assets/closeEye.png';

const schemaYup = yup.object({
	email: yup
		.string()
		.matches(regexpEmail, 'Некорректный формат электронной почты.')
		.max(40, 'Email не должен превышать 40 символов.')
		.required('Email обязателен'),
	password: yup
		.string()
		.max(25, 'Пароль должен быть менее 25 символов.')
		.min(5, 'Пароль должен быть не менее 5 символов.')
		.required('Пароль обязателен'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.required('Поле обязательно.'),
});

export const HookForm = () => {
	const [togglePassword, setTogglePassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(schemaYup),
	});

	const {
		email: emailError,
		password: passwordError,
		confirmPassword: confirmPasswordError,
	} = errors;

	const onSubmit = (formData) => {
		console.log(`HookForm: ${formData}`);
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>React Hook Form and Yup</label>
				{emailError && <p>{emailError.message}</p>}
				<input
					className={emailError ? 'error' : ''}
					name="email"
					placeholder="Введите Email"
					{...register('email')}
				/>

				{passwordError && <p>{passwordError.message}</p>}
				<div className="input-container">
					<input
						className={passwordError ? 'error' : ''}
						type={togglePassword ? 'text' : 'password'}
						name="password"
						placeholder="Введите пароль"
						{...register('password')}
					/>
					<img
						src={togglePassword ? closeEyeIcon : eyeIcon}
						alt="eye"
						onClick={() => setTogglePassword(!togglePassword)}
					/>
				</div>

				{confirmPasswordError && <p>{confirmPasswordError.message}</p>}
				<input
					className={confirmPasswordError ? 'error' : ''}
					type={togglePassword ? 'text' : 'password'}
					name="confirmPassword"
					placeholder="Повторите пароль"
					{...register('confirmPassword')}
				/>

				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
