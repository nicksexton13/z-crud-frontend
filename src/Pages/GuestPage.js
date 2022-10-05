import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppContext } from '../App';
import { Button } from '@mui/material';

const GuestPage = () => {
	const {
		triggerRerender,
		setTriggerRerender,
		tableData,
		setTableData,
		navigate,
		apiServer,
	} = useContext(AppContext);

	useEffect(() => {
		fetch(`${apiServer}/items`)
			.then((res) => res.json())
			.then((data) => setTableData(data));
	}, [triggerRerender]);

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		'&:last-child td, &:last-child th': {
			border: 0,
		},
	}));

	// function createData(id, user_id, itemName, quantity, description) {
	// 	return { id, user_id, itemName, quantity, description };
	// }

	return (
		<>
			<Button onClick={() => navigate('/')}>Logout</Button>
			<TableContainer component={Paper}>
				<Table
					sx={{ height: '100vh', minWidth: 700 }}
					aria-label='customized table'
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Item Number</StyledTableCell>
							<StyledTableCell align='right'>User ID</StyledTableCell>
							<StyledTableCell align='right'>Item Name</StyledTableCell>
							<StyledTableCell align='right'>Quantity</StyledTableCell>
							<StyledTableCell align='right'>Description</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((item) => (
							<StyledTableRow key={item.id}>
								<StyledTableCell component='th' scope='row'>
									{item.id}
								</StyledTableCell>
								<StyledTableCell align='right'>{item.user_id}</StyledTableCell>
								<StyledTableCell align='right'>{item.itemName}</StyledTableCell>
								<StyledTableCell align='right'>{item.quantity}</StyledTableCell>
								<StyledTableCell align='right'>
									{item.description}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
//will need onclick for the button above to be able to pop up a modal form for a patch
export default GuestPage;
