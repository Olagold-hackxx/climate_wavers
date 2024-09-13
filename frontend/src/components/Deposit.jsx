import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoCopyOutline } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#001F3F',
  color: 'white',
  textAlign: 'center',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

const Deposit = ({ address }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shortenAddress = `${address?.slice(0, 15)}.........${address?.slice(-2)}`;

  return (
    <div>
      <button className='bg-[#008080] py-2 px-12 lg:mr-6 md:mr-6 rounded-full text-white text-[18px] lg:text-[24px] md:text-[24px]' onClick={handleOpen}>Deposit</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <h2 className='text-[18px] lg:text-[24px] md:text-[24px] font-[700] my-6'>Deposit Crypto</h2>
        <p>Only deposit BNB to this address</p>
        <img src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_640.png" alt="" className='my-8'/>
        <p>{shortenAddress}</p>
        <div className='flex items-center text-2xl justify-center my-8'>
            <IoCopyOutline className='mr-6 ' />
        <TfiReload />
        </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Deposit;