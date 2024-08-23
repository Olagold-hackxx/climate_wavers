import { useEffect, useState } from "react";

const AiReportAnalyse = () => {
  const [status, setStatus] = useState("Thanks for submitting the report");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < 3) {
      const timer = setTimeout(() => {
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
  }, [step]);

  return (
    <div>
      <h1 className="text-xl text-center font-semibold font-serif">{status}</h1>
      <div className=" flex justify-center">
        <img src="/Group.png" alt="WaverX" className="animate-rotate-smooth" />
      </div>
    </div>
  );
};
export default AiReportAnalyse;
