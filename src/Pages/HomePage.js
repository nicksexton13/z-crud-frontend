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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from '../util/Modal';
import Delete from '../util/Delete';
import { Button } from '@mui/material';
import EditModal from '../util/EditModal';
import { Box } from '@mui/material';

const HomePage = () => {
	const {
		triggerRerender,
		setTriggerRerender,
		tableData,
		setTableData,
		navigate,
		cookies,
		open,
		setOpen,
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

	const handleDelete = (item) => {
		// event.preventDefault();
		console.log(item);
		fetch(`${apiServer}/items/${item.id}`, {
			method: 'DELETE',
			credentials: 'include',
		})
			.then(() => setTriggerRerender(!triggerRerender))
			.then(() => {
				alert(`The item has been deleted.`);
			})
			.catch((error) => alert(error, 'Cannot delete item'));
	};
	const handleEdit = (item) => {
		// event.preventDefault();
		console.log(item);
		fetch(`${apiServer}/items/${item.id}`, {
			method: 'PATCH',
			credentials: 'include',
		})
			.then(() => setTriggerRerender(!triggerRerender))
			.then(() => {
				alert(`The item has been deleted.`);
			})
			.catch((error) => alert(error, 'Cannot delete item'));
	};

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button
					onClick={() => {
						navigate(`/home/${cookies.get('user_id')}`);
						setTriggerRerender(!triggerRerender);
					}}
				>
					My Profile
				</Button>
				<Button
					onClick={() => {
						cookies.remove('user_id');
						cookies.remove('user');
						navigate('/');
					}}
				>
					Logout
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table
					sx={{ height: '80vh', minWidth: 700 }}
					aria-label='customized table'
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Item Number</StyledTableCell>
							<StyledTableCell align='right'>User ID</StyledTableCell>
							<StyledTableCell align='right'>Item Name</StyledTableCell>
							<StyledTableCell align='right'>Quantity</StyledTableCell>
							<StyledTableCell align='right'>Description</StyledTableCell>
							<StyledTableCell align='right'>Delete</StyledTableCell>
							<StyledTableCell align='right'>Edit</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((item) => (
							<StyledTableRow key={item.id}>
								<StyledTableCell component='th' scope='row'>
									{item.id}
								</StyledTableCell>
								<StyledTableCell align='right'>
									{item.user_id || cookies.get('user_id')}
								</StyledTableCell>
								<StyledTableCell align='right'>{item.itemName}</StyledTableCell>
								<StyledTableCell align='right'>{item.quantity}</StyledTableCell>
								<StyledTableCell align='right'>
									{item.description}
								</StyledTableCell>
								<StyledTableCell align='right'>
									<DeleteIcon
										onClick={() => handleDelete(item)}
										sx={{ cursor: 'pointer' }}
									/>
								</StyledTableCell>
								<StyledTableCell align='right'>
									<EditModal
										onClick={() => {
											setOpen(!open);
										}}
										sx={{ cursor: 'pointer' }}
									/>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<BasicModal> Add Item </BasicModal>
			<Delete onClick={() => setTriggerRerender(!triggerRerender)}>
				Delete All Items
			</Delete>
		</>
	);
};
//will need onclick for the button above to be able to pop up a modal form for a patch
//mui modal
export default HomePage;
