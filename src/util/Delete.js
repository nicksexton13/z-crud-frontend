import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { AppContext } from '../App';

const Delete = () => {
	const { triggerRerender, setTriggerRerender, apiServer } =
		useContext(AppContext);
	const handleDelete = (event) => {
		// event.preventDefault();
		fetch(`${apiServer}/items`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(() => setTriggerRerender(!triggerRerender))
			.then(() => {
				alert(`All items have been deleted.`);
			})
			.catch((error) => alert(error, 'Cannot delete item'));
	};

	return (
		<Button
			onClick={(e) => handleDelete(e)}
			variant='outlined'
			color='warning'
			type='submit'
		>
			Delete All Items
		</Button>
	);
};

export default Delete;
