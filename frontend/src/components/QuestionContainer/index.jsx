import PropTypes from "prop-types";

export default function QuestionContainer({
  questionText = "What’s the current global average temperature?",
  imageSrc="../../../tree.png",
  color="bg-[#008080]"
}) {
  return (
    <div
      className={` text-black  flex flex-col ${color} items-end w-[20%] min-h-[25%] gap-[62px] p-4 rounded-[24px]`}
    >
      <p className="mt-5 w-[98%] leading-8 text-white">{questionText}</p>
      <div className="grid rounded-[16px] px-1.5 place-content-end h-[100%]">
        <div>
        <img
          src={imageSrc}
          alt="Image"
          className="h-[52px] w-[98%] object-contain"
        />
        </div>
      </div>
    </div>
  );
}

QuestionContainer.propTypes = {
  questionText: PropTypes.string,
  imageSrc: PropTypes.string,
  color: PropTypes.string

}