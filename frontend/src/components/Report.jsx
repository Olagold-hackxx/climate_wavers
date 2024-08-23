import { useState } from "react";
import CreateReport from "./CreateReport";
import AiReportAnalyse from "./AiReportAnalyse";

const Report = () => {
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = () => {
    setIsCreateReportOpen(false);

    setTimeout(() => {
      setIsModalOpen(true);
    }, 300);
  };

  return (
    <div className="">
      {isCreateReportOpen && <CreateReport closeModal={handleFormSubmit} />}
      {isModalOpen && (
        <div className="h-[40vh] w-[40vw]">
            <AiReportAnalyse />
        </div>
      )}
    </div>
  );
};

export default Report;
