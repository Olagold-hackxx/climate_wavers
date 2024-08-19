import { IoCloseSharp } from "react-icons/io5";
import PropTypes from "prop-types";

const Modal = ({ children, closeFn }) => {
  return (
    <div
      className="h-screen  w-screen bg-white bg-opacity-20 backdrop-blur-md absolute top-0 left-0 grid place-content-center z-30 shadow-none"
      onClick={closeFn}
    >
      <div
        className="bg-white border-2 rounded-lg p-10 text-black relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute top-1 right-1 hover:cursor-pointer "
          onClick={closeFn}
        >
          <IoCloseSharp size={22} />
        </span>
        <div >{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func,
};
export default Modal;
