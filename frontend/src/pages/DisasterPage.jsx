import { useParams } from "react-router-dom";
import Topbar from "../components/Topbar";
import Menu from "../components/Menu";
import Createcomment from "../components/Createcomment";
import Postcomponent from "../components/Postcomponent";
import { useEffect, useState } from "react";
import axios from 'axios'


const apiUrl = import.meta.env.VITE_APP_CHATBOT_URL + '/api/v1/disasters'

const DisasterPage = () => {
  const { disasterId } = useParams();

  const [disaster, setDisaster] = useState()
  useEffect(()=>{
    axios.get(apiUrl+"/" + disasterId)
    .then((res)=>{
      const {data} = res
      setDisaster(data)
    })
    .catch((err)=>console.log({err}))
  }, [ disasterId])


  return (
    <div className="w-full overflow-hidden">
    <div className="md:pb-20 pb-10">
      <Topbar />
    </div>

    <div className="flex w-full md:py-0 py-8">
      <div className="w-[20%] fixed border-r-2 h-full hidden md:flex ">
        <Menu/>
      </div>
      <div className="px-4 py-4 md:pl-[21%] grid gap-y-4">
      
      <h2 className="capitalize font-bold  md:text-2xl text-xl">
                {disaster?.region}, {disaster?.country}: {disaster?.disasterType} - {disaster?.startDate && formatDate(disaster.startDate)}
              </h2>
              <h3 className="capitalize text-[#047857] md:text-xl font-semibold">Description</h3>
      <div className="md:text-xl text-md font-serif">{disaster?.details}</div>
      <img alt="disaster_image" className="border-2 shadow-md rounded-md" src={
              disaster?.images?.length ? disaster.images[0] : '/placeholde-disaster-img.jpg'
            } />
      <h4 className="py-2 font-semibold text-[#047857] text-xl">Comments</h4>

      <div className=" md:border-2 border-b-2 border-t-0 rounded-lg shadow-xl shadow-white h-40 py-4 ">
        <Createcomment type={"comments"} postId={1} parentId={1} button={"comment"}/>
      </div>
      <div className="">
        <Postcomponent type={"comments"} postId={1} comment={1} />
      </div>
      </div>
     
      </div>

    </div>
  );
};

function formatDate(d){
  const date = new Date(d);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return formattedDate
}

export default DisasterPage;
