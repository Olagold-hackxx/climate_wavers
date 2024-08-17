import QuestionContainer from "./QuestionContainer";

const data = [
  {
    questionText: "What’s the current global average temperature?",
    imageSrc: "../../globe.png",
    color: "bg-[#008080]"
  },
  {
    questionText: "How can I reduce my carbon footprint?",
    imageSrc: "../../foot.png",
    color: "bg-[#004040]"
  },
  {
    questionText:
      "Tell me about the impact of deforestation on climate change.",
    imageSrc: "../../tree.png",
    color: "bg-[#126180]"
  },
  {
    questionText:
      "What are the most common natural disasters and their causes?",
    imageSrc: "../../leaf.png",
    color: "bg-[#0093AF]"
  },
];

export default function NewChat() {
  return (
    <div className="h-[90vh] px-8 grid gap-y-4 place-content-center">
      <div className="flex flex-row">
        <h1 className="text-[#047857] font-serif font-[300px]  md:text-[65px]">
          Waver
        </h1>
        <div>
        <img
          src="../../img_immutable_x.png"
          alt="Immutablex"
          className="h-[98px] w-[60%] object-contain"
        />
        </div>
      </div>
      <div>
      <p className="relative mt-[-20px] md:text-[22px] ">
        Hello Abdul, How can I help you today
      </p>
      </div>
      <div className=" flex flex-row self-center gap-[40px]">
        {data.map((d, index) => (
          <QuestionContainer {...d} key={"waverxchat" + index} />
        ))}
      </div>
    </div>
  );
}
