import { useState } from "react";
import CreateReport from "./CreateReport";
import AiReportAnalyse from "./AiReportAnalyse";

const Report = () => {
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true)
  const [recommendation, setRecommendation] = useState("")

  const handleFormSubmit = () =>{
    setIsCreateReportOpen(false);

    setTimeout(() => {
      setIsModalOpen(true);
    }, 300);
    showRecommendation(recommendation)
    }





  const showRecommendation = (text)=>{
    setIsWaiting(false)
    console.log({text})
    setRecommendation(text)
  }

  return (
    <div className="relative">
      {isCreateReportOpen && <CreateReport closeModal={handleFormSubmit} showRecommendation={showRecommendation}  />}
      {isModalOpen && (
<<<<<<< HEAD
        <div className="h-[40vh] md:w-[40vw] w-[90vw]">
            <AiReportAnalyse />
=======
        <div className="h-[40vh] w-[40vw]">
            <AiReportAnalyse  isWaiting={isWaiting} recommendation={recommendation}/>
>>>>>>> c7ab72ba6b2ce5b2f73c16025af32443c97b5cc5
        </div>
      )}
    </div>
  );
};

export default Report;
