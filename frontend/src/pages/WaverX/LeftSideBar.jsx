import { GoSidebarExpand } from "react-icons/go";

export default function WaverxLeftBar({ handleCreateChat,  }) {

  // function handleBarToggle(){

  // }




  return (
    <div >
      <div className="flex items-center justify-between bg-white px-4 py-4 shadow-xs  border-b-2 border-gray-300">
        <div>
          <GoSidebarExpand size={32}  color={"#008080"}/>
        </div>
        <div className="flex flex-2 gap-3.5">
          <img
            src="../../../logodark.png"
            alt="Immutablex"
            className="h-[40px] object-cover"
          />
          <h1
            size="headingxl"
            className="!font-semibold md:text-[26px] text-[#008080] sm:text-[24px]"
          >
            WaverX
          </h1>
        </div>
        <div className="flex self-end" onClick={handleCreateChat} >
          <img
            src="../../../img_plus_blue_gray_400.svg"
            alt="Plus"
            className="h-[32px] w-[32px] "
          />
        </div>
      </div>
    </div>
  );
}
