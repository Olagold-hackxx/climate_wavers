import { IoCloseSharp } from "react-icons/io5";
import PropTypes from "prop-types";

const Modal = ({ children, closeFn }) => {
  return (
    <button
      className="h-[100vh] overflow-auto min-w-[100vw] bg-white bg-opacity-20 backdrop-blur-xl fixed inset-0 z-50 flex justify-center items-center"
      onClick={closeFn}
      
    >
      <button
        className="bg-white border-2 rounded-lg px-2 pt-8 text-black max-w-[90vw] max-sm:w-[90rem] relative"
        onClick={(e) => e.stopPropagation()}
        
      >
        <span
          className="absolute top-1 p-4 right-1 hover:cursor-pointer"
          onClick={closeFn}
          
        >
          <IoCloseSharp size={25} />
        </span>
        <div>{children}</div>
      </button>
    </button>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func,
};
export default Modal;
