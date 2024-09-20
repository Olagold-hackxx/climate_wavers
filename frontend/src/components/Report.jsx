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
        <div className="h-[40vh] w-[40vw]">
            <AiReportAnalyse  isWaiting={isWaiting} recommendation={recommendation}/>
        </div>
      )}
    </div>
  );
};

export default Report;
