import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { formatRecommendation } from "../utils/factory";

const AiReportAnalyse = ({isWaiting, recommendation}) => {
  const [status, setStatus] = useState("Thanks for submitting the report");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < 3) {
      const timer = setTimeout(() => {
        if(!isWaiting){
          clearTimeout(timer)
          setStatus("Your report has been received, please vheckout safety recommendations below")
          console.log({recommendation})
          return
        }
        if (step === 0) {
          setStatus("Getting your location");
        } else if (step === 1) {
          setStatus("Analyzing the image to confirm disaster type");
        } else if (step === 2) {
          setStatus("Analyzing your report. Please wait for a moment...");

          setTimeout(() => {}, 1000); // Close the modal after 1 second
        }
        setStep(step + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }

  }, [step, isWaiting, recommendation]);

  return (
    <div>
      <h1 className={`text-xl text-center font-semibold font-serif`}>{status}</h1>
      <div className={` flex items-end justify-center`}>
        <img src="/Group.png" alt="WaverX" className={` mt-8 h-48 ${isWaiting && "animate-rotate-smooth"}`} />
      </div>
      <Box textAlign={'left'} width={'100%'} p="12px" boxSizing={'border-box'} >
        {recommendation && <div dangerouslySetInnerHTML={{__html: formatRecommendation(recommendation)}} >
        </div>}
      </Box>
    </div>
  );
};
export default AiReportAnalyse;