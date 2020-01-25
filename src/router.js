import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
	Route,
	Link
} from 'react-router-dom';
import HomePage from './Home/HomePage';

const AppRouter = ({user}) => (
	<Router>
		<div>
			<Link to='/'>Home</Link>
			{user && <Link to='/my-logs'>My Logs</Link>}
		</div>

		<Switch>
			<Route path='/'>
				<HomePage />
			</Route>
		</Switch>
	</Router>
)

export default AppRouter;