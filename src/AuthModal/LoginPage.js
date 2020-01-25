  import React from 'react';

const LoginPage = (props) => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleUsernameChange = (e) => {
		console.warn('yeet e', e);
		setUsername(e);
		console.warn('yeet username', username);
	}

	const handlePasswordChange = (e) => {
		setPassword(e);
	}

	const handleSignIn = () => {
		const { signIn } = props;
		signIn(username, password).then((resp) => console.warn(resp));
	}

	const handleSignOut = () => {
		const { signOut } = props;
		signOut();
	}

	return (
		<div>
			<input type="text" value={username} onChange={e => handleUsernameChange(e.target.value)}/>
			<input type="text" value={password} onChange={e => handlePasswordChange(e.target.value)} />
			<button onClick={handleSignIn}>login</button>
			<button onClick={handleSignOut}>logout</button>
		</div>
	)
};

export default LoginPage;