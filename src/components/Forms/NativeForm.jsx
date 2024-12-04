import { useState } from 'react';
import { regexpEmail } from '../../constants/index';

import eyeIcon from '../../assets/eye.png';
import closeEyeIcon from '../../assets/closeEye.png';

export const NativeForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');

	const [togglePassword, setTogglePassword] = useState(false);

	const onSubmitForm = (event) => {
		event.preventDefault();
		if (
			!!emailError ||
			!!passwordError ||
			!!confirmPasswordError ||
			!email.length > 0 ||
			!password.length > 0 ||
			!confirmPassword.length > 0
		) {
			onEmailChange({ target: { value: email } });
			onPasswordChange({ target: { value: password } });
			onConfirmPasswordChange({ target: { value: confirmPassword } });
		} else {
			console.log({ email, password, confirmPassword });
			setEmail('');
			setPassword('');
			setConfirmPassword('');
		}
	};

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		if (!regexpEmail.test(target.value)) {
			if (target.value.length > 0) {
				setEmailError('Некорректный формат электронной почты.');
			} else {
				setEmailError('Email обязателен.');
			}
		} else {
			setEmailError('');
		}

		if (target.value.length > 40) {
			setEmailError('Email не должен превышать 40 символов.');
		}
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		if (target.value.length < 5) {
			setPasswordError('Пароль должен быть не менее 5 символов.');
		} else if (target.value.length > 25) {
			setPasswordError('Пароль должен быть менее 25 символов.');
		} else {
			setPasswordError('');
		}

		if (target.value.length === 0) {
			setPasswordError('Пароль обязателен.');
		}

		if (target.value === confirmPassword && target.value.length > 0) {
			setConfirmPasswordError('');
		}

		if (target.value !== confirmPassword && confirmPassword.length > 0) {
			setConfirmPasswordError('Пароли не совпадают.');
		}
	};

	const onConfirmPasswordChange = ({ target }) => {
		setConfirmPassword(target.value);

		if (password !== target.value) {
			setConfirmPasswordError('Пароли не совпадают.');
		}

		if (target.value.length === 0) {
			setConfirmPasswordError('Поле обязательно.');
		}

		if (target.value.length > 0 && target.value === password) {
			setConfirmPasswordError('');
		}
	};

	return (
		<div className="container">
			<form onSubmit={onSubmitForm}>
				<label>Native Form</label>

				{emailError && <p>{emailError}</p>}

				<input
					className={emailError ? 'error' : ''}
					name="email"
					value={email}
					placeholder="Введите Email"
					onChange={onEmailChange}
				/>

				{passwordError && <p>{passwordError}</p>}
				<div className="input-container">
					<input
						className={passwordError ? 'error' : ''}
						name="password"
						type={togglePassword ? 'text' : 'password'}
						placeholder="Введите пароль"
						value={password}
						onChange={onPasswordChange}
					/>
					<img
						src={togglePassword ? closeEyeIcon : eyeIcon}
						alt="eye"
						onClick={() => setTogglePassword(!togglePassword)}
					/>
				</div>

				{confirmPasswordError && <p>{confirmPasswordError}</p>}
				<input
					className={confirmPasswordError ? 'error' : ''}
					name="confirmPassword"
					type={togglePassword ? 'text' : 'password'}
					placeholder="Повторите пароль"
					value={confirmPassword}
					onChange={onConfirmPasswordChange}
				/>

				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
