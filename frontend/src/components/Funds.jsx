import  { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '../constants/providers';
import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import DonationTable from './DonationTable';
import { IoEye, IoCopyOutline } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Deposit from './Deposit';
import Wallet from "./Wallet";

const Funds = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const { isConnected } = useWeb3ModalAccount();


  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const readWriteProvider = getProvider(walletProvider);
        const walletBalance = await readWriteProvider.getBalance(address);
        const formattedBalance = ethers.formatEther(walletBalance);
        const roundedBalance = parseFloat(formattedBalance).toFixed(2);
        setBalance(roundedBalance);
      } catch (error) {
        console.error('Error fetching wallet details:', error);
      }
    };

    if (walletProvider) {
      fetchWalletDetails();
    }
  }, [walletProvider, address]);

  const shortenAddress = address ? `${address?.slice(0, 7)}.........${address?.slice(-2)}` : "Connect your wallet"

  const toggleBalanceVisibility = () => {
    setOpen(!open);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className='my-8 px-2'>
            {!isConnected && <Wallet />}

      <h2 className='text-[20px] lg:text-[28px] md:text-[28px] my-4 font-[700]'>Your Wallet</h2>
      <div className='flex items-center'>
      <p className='text-[18px] lg:text-[24px] md:text-[24px] truncate'>{shortenAddress}</p>
      <IoCopyOutline 
          className='text-2xl'
          onClick={copyToClipboard} 
          style={{ cursor: 'pointer', marginLeft: '8px' }} 
          title={copied ? "Copied!" : "Copy Address"} 
        />
        {copied && <span className="text-green-500 ml-2 text-sm">Copied!</span>}
        </div>
      <div className='flex items-center my-6'>
        <h2 className='lg:text-[56px] md:text-[56px] text-[36px]'>{open ? `${balance} Eth` : "***********"} </h2>
        {open ? (
          <IoMdEyeOff onClick={toggleBalanceVisibility} className='text-4xl mx-8' style={{ cursor: 'pointer' }} />
        ) : (
          <IoEye onClick={toggleBalanceVisibility} className='text-4xl mx-8' style={{ cursor: 'pointer' }} />
        )}
        <p className='bg-[#008080]/25 rounded-lg text-[#008080] py-2 px-4'>$30.00</p>
      </div>
      <section className='flex items-center gap-x-4 lg:flex-row md:flex-row mb-8'>
       <Deposit address={address} />
        {/* <Donate /> */}
      </section>
      <section>
        <h2 className='text-[18px] lg:text-[24px] md:text-[24px] my-4'>All Transaction details</h2>
        
        <DonationTable />
      </section>
    </main>
  );
};

export default Funds;