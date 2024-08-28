import { IoCloseSharp } from "react-icons/io5";
import PropTypes from "prop-types";

const Modal = ({ children, closeFn }) => {
  return (
    <div
      className="h-[100vh] overflow-auto w-full bg-white bg-opacity-10 backdrop-blur-xl fixed inset-0 grid place-content-center z-10 shadow-none"
      onClick={closeFn}
    >
      <div
        className="bg-white border-2 rounded-lg px-2 pt-8 text-black relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute top-1 p-4 right-1 hover:cursor-pointer "
          onClick={closeFn}
        >
          <IoCloseSharp size={25} />
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func,
};
export default Modal;
