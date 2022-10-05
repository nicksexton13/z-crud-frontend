import { Button } from '@mui/material';
import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import HomePage from './Pages/HomePage';
import GuestPage from './Pages/GuestPage';
import Cookies from 'universal-cookie';
import ProfileSpecific from './Pages/ProfileSpecific';

export const AppContext = createContext();

function App() {
	const cookies = new Cookies();
	const apiServer = 'http://localhost:8080';
	const [tableData, setTableData] = useState([]);
	const [userData, setUserData] = useState([]);
	const [triggerRerender, setTriggerRerender] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [open, setOpen] = useState(false);
	let navigate = useNavigate();
	const setContext = {
		tableData,
		setTableData,
		triggerRerender,
		setTriggerRerender,
		navigate,
		apiServer,
		cookies,
		userData,
		setUserData,
		filteredData,
		setFilteredData,
		open,
		setOpen,
	};

	useEffect(() => {
		fetch(`${apiServer}/items`)
			.then((res) => res.json())
			.then((data) => setTableData(data))
			.catch((error) => `We have encountered an error: ${error}`);
	}, []);
	useEffect(() => {
		fetch(`${apiServer}/users`)
			.then((res) => res.json())
			.then((data) => setUserData(data))
			.catch((error) => `We have encountered an error: ${error}`);
	}, []);

	return (
		<>
			<AppContext.Provider value={setContext}>
				<Routes>
					<Route path='/' element={<SignUp />}></Route>
					<Route path='signin' element={<SignIn />}></Route>
					<Route path='home' element={<HomePage />}></Route>
					<Route path='guest' element={<GuestPage />}></Route>
					<Route path='/home/:user_i' element={<ProfileSpecific />}></Route>
				</Routes>
			</AppContext.Provider>
		</>
	);
}

export default App;
