import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import useGlobals from '../../../hooks/useGlobals';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function DeleteModal({ orderId, handleOrderDelete }) {

    const { SERVER_URL } = useGlobals();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function handleDelete() {
        console.log(orderId);
        setOpen(false);

        fetch(`${SERVER_URL}/orders`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId })
        })
            .then(resp => {
                handleOrderDelete(orderId);
                console.log(resp);
            })
            .catch(err => console.log(err.message));
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="error"
                sx={{ marginTop: 3 }}
                onClick={handleOpen}
            >Cancel Order</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 300 }}>
                    <h2>Deleting an order</h2>
                    <p>Do you really want to delete this order?</p>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >Delete</Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginLeft: 3 }}
                        onClick={handleClose}
                    >Cancel</Button>
                </Box>
            </Modal>
        </div>
    );
}