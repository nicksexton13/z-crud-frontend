import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';
import { AppContext } from '../App';
import { useContext } from 'react';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function BasicModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const {
		triggerRerender,
		setTriggerRerender,
		tableData,
		setTableData,
		navigate,
		cookies,
		apiServer,
	} = useContext(AppContext);

	const handleAdd = (event) => {
		// event.preventDefault();
		const data = new FormData(event.currentTarget);
		let itemData = {
			//WILL NEED TO GO BACK AND REMOVE THE STATIC IMPLEMENTATION OF USERid AND MAKE IT TO WHERE COOKIES ASSIGNS THE USERID
			user_id: data.get('user_id'),
			itemName: data.get('itemName'),
			description: data.get('description'),
			quantity: data.get('quantity'),
		};
		fetch(`${apiServer}/items`, {
			method: 'POST',
			credentials: 'include',

			body: JSON.stringify({
				user_id: cookies.get('user_id'),
				itemName: itemData.itemName,
				description: itemData.description,
				quantity: itemData.quantity,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then(() => {
				console.log('Data', itemData);
				alert(
					`Thanks for adding ${itemData.itemName} to the inventory tracker!`
				);
				// navigate('signin');
			})
			.catch((error) => alert(error, 'Cannot add item'));
	};

	return (
		<div>
			<Button onClick={handleOpen}>Add Item</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Box component='form' noValidate onSubmit={handleAdd} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							{/* <Grid item xs={12} sm={6}>
								<TextField
									name='user_id'
									required
									fullWidth
									id='user_id'
									label='User ID'
									autoFocus
								/>
							</Grid> */}
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='itemName'
									label='Item Name'
									name='itemName'
									// autoComplete='family-name'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='description'
									label='Description'
									name='description'
									// autoComplete='username'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='quantity'
									label='Quantity'
									type='quantity'
									id='quantity'
									// autoComplete='new-password'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Add Item
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
