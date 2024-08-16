
export default function WaverxLeftBar() {
  return (
    <div className="self-stretch ">
      <div className="flex items-center justify-center bg-white px-8 py-9 shadow-xs sm:p-4 border-b-2 border-gray-300">
        <div className="flex flex-1 items-center gap-3.5 px-10 sm:px-4">
          <img src="../../../logodark.png" alt="Immutablex" className="h-[48px] object-cover" />
          <h1 size="headingxl" className="!font-semibold md:text-[26px] text-[#008080] sm:text-[24px]">
            WaverX
          </h1>
        </div>
        <img src="../../../img_plus_blue_gray_400.svg" alt="Plus" className="h-[32px] w-[32px]" />
      </div>
    </div>
  );
}
