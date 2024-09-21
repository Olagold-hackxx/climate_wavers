import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DonationTable = ({ currentData }) => {
    
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ borderBottom: '1px solid #dadada' }}>
            <TableCell>
              Details
            </TableCell>
            <TableCell>
              Sent
            </TableCell>
            <TableCell>
              Received
            </TableCell>
            <TableCell>
              Donations
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow sx={{ borderBottom: '1px solid #dadada'}}>
              <TableCell>
                <h3 className='text-[#008080] font-[700]'>Volcano disaster donation</h3>
                <p className='text-[#333333]/30 my-4'>Address: 0x45rgd.......3A</p>
                <p className='text-[#333333]/30'>04 Apr, 2024m- 03:47 pm</p>
              </TableCell>
              <TableCell>------------</TableCell>
              <TableCell>1000 <span className='text-[#008080] font-bold'>DSX</span></TableCell>
              <TableCell>
                Donated
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderBottom: '1px solid #dadada '}}>
              <TableCell>
                <h3 className='text-[#008080] font-[700]'>Hurricane Management</h3>
                <p className='text-[#333333]/50 my-4'>Address: 0x45rgd.......3A</p>
                <p className='text-[#333333]/50'>04 Apr, 2024m- 03:47 pm</p>
              </TableCell>
              <TableCell>------------</TableCell>
              <TableCell>20,000 <span className='text-[#008080] font-bold'>DSX</span></TableCell>
              <TableCell>
                Donated
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderBottom: '1px solid #dadada '}}>
              <TableCell>
                <h3 className='text-[#008080] font-[700]'>Fire Disasters</h3>
                <p className='text-[#333333]/30 my-4'>Address: 0x45rgd.......3A</p>
                <p className='text-[#333333]/30'>04 Apr, 2024m- 03:47 pm</p>
              </TableCell>
              <TableCell>------------</TableCell>
              <TableCell>50,000 <span className='text-[#008080] font-bold'>DSX</span></TableCell>
              <TableCell>
                Donated
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderBottom: '1px solid #dadada '}}>
              <TableCell>
                <h3 className='text-[#008080] font-[700]'>South Africa wild fire</h3>
                <p className='text-[#333333]/30 my-4'>Address: 0x45rgd.......3A</p>
                <p className='text-[#333333]/30'>04 Apr, 2024m- 03:47 pm</p>
              </TableCell>
              <TableCell>------------</TableCell>
              <TableCell>5,000 <span className='text-[#008080] font-bold'>DSX</span></TableCell>
              <TableCell>
                Donated
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DonationTable;