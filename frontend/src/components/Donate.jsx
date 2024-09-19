import {
  // useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getClimateContract, getTokenContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  color: "white",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: 10,
  boxShadow: 24,
  border: "1px solid #42714262",
  backgroundColor: "#1E1D34",
  p: 4,
};

const Donate = ({ id }) => {
  console.log(id)
  // const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [eventId, setEventId] = useState();
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // setEventId(`${import.meta.env.VITE_CAMPAIGNS}=${id}`);
    setEventId(id)
  }, [id]);

  async function handleDonate() {
    // if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = getClimateContract(signer);
    const tokenContract = getTokenContract(signer);

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
      setAmount("");
      setEventId("");
    }
  }

  async function handleMint() {
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const tokenContract = getTokenContract(signer);

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
      toast.error(`Claim failed`, {
        position: "top-center",
      });
      console.log(error);
    }
  }

  console.log(amount)
  return (
    <div>
      <div>
        <button
          className="rounded-full w-[100%] px-8 py-2 [18px] lg:text-[24px] md:text-[24px] text-white self-center bg-[#008080]"
          onClick={handleOpen}
        >
          Donate
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <div className="flex flex-col w-[100%]">
        <div className="flex justify-between items-center mb-4">
          <p>Need DSX token</p>
         <button
            onClick={handleMint}
            className="bg-linear py-2  justify-end items-center mb-2 px-8 rounded-lg"
          >
            Claim
          </button>
        </div>
        <div className="flex justify-between text-white">
          <div className="border-[1.5px] border-gray-400 px-4 py-1 ">
            {""}50 DSX
          </div>
          {/* <div className="border-[1.5px] mx-2 border-gray-400 px-3 py-1">{""}$100</div> */}
          <div className="border-[1.5px] border-gray-400 px-3 py-1">
            {""}100 DSX
          </div>
          <div className="border-[1.5px]  border-gray-400 px-3 py-1">
            {""}500 DSX
          </div>
        </div>
        <div className="my-5">
          <input type="text" placeholder="Incident Id" value={eventId} readOnly className="border-[1.5px] text-black border-gray-400 py-4 rounded-lg w-[100%] px-2 focus:outline outline-1 outline-gray-400 mb-4" />
          <input
            id="amount"
            onChange={(e) => setAmount(e.target.value)}
            placeholder=" Enter amount"
            type="number"
            className="border-[1.5px] text-black border-gray-400 py-4 rounded-lg w-[100%] px-2 focus:outline outline-1 outline-gray-400"
          />
        </div>
        <button
          className="w-[100%] py-4 bg-linear text-white rounded-lg cursor-pointer"
          type="submit"
          onClick={handleDonate}
        >
          Donate
        </button>
      </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Donate;
