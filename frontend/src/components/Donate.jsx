import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getClimateContract, getTokenContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import { ethers } from 'ethers'
import { useState } from "react";

const Donate = (post) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [eventId, setEventId] = useState()
  const [amount, setAmount] = useState(0)

  async function handleDonate() {
    // if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = getClimateContract(signer);
    const tokenContract = getTokenContract(signer)

    try {
      const approveTx = await tokenContract.approve(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        ethers.parseUnits(amount, 18)
      );
      const approveReceipt = await approveTx.wait();

      if (approveReceipt.status) {
        toast.success("Approval successful!", {
          position: "top-center",
        });
      } else {
        toast.error("Approval failed!", {
          position: "top-center",
        });
        throw new Error("Approval failed");
      }

      const transaction = await contract.donateToIncident(
        eventId,
        ethers.parseUnits(amount, 18)
      );
      const receipt = await transaction.wait();

      if (receipt.status) {
        return toast.success("Donation successful!", {
          position: "top-center",
        });
        
      } else {
        toast.error("Donation  failed!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Donation failed", {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setAmount('')
      setEventId('')
    }
  }

  async function handleMint() {
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const tokenContract = getTokenContract(signer)

    try {
      const transaction = await tokenContract.claimDSX();
      const receipt = await transaction.wait();

      if (receipt.status) {
        return toast.success("Claim successful!", {
          position: "top-center",
        });
        
      } else {
        toast.error("Claim  failed!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Claim failed", {
        position: "top-center",
      });
      console.log(error);
    } 
  }


  return (
    <>
    <div className="flex flex-col max-md:w-[70vw]">

    <div className="flex "> 
    <p>Need DSX token</p>
      <button onClick={handleMint} className="bg-linear py-2  justify-end items-center mb-2 px-4 ml-[100px] rounded-lg">Claim</button>
      </div>
      <div className="flex flex-row text-[#340178]">
        <div className="border-[1.5px] mx-2 border-gray-400 px-4 py-.1 ">{""}50 DSX</div>
        {/* <div className="border-[1.5px] mx-2 border-gray-400 px-3 py-1">{""}$100</div> */}
        <div className="border-[1.5px] mx-2 border-gray-400 px-3 py-1">{""}100 DSX</div>
        <div className="border-[1.5px] mx-2 border-gray-400 px-3 py-1">{""}500 DSX</div>
      </div>
      <div className="my-5">
      {/* <input type="text" placeholder="Incident Id" onChange={(e) => setEventId(e.target.value)}/> */}
        <input
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
          placeholder=" Enter amount"
          type="number"
          className="border-[1.5px] text-black border-gray-400 h-[55px]  px-2 focus:outline outline-1 outline-gray-400"
        />
      </div>
      <button
        className="w-[] py-2 bg-linear text-white rounded-lg cursor-pointer z-10"
        type="submit"
      >
        Donate
      </button>
    </div>
    </>
  );
};

export default Donate;
