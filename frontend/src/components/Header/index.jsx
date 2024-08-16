import { Img, Button } from "./..";
import React from "react";

export default function Header({ ...props }) {
  return (
    <header {...props} className={`${props.className} flex items-start py-3 bg-white shadow-xs`}>
      <div className="mb-2 flex w-full justify-end gap-[72px] pl-14 pr-20 lg:pr-8 md:flex-col md:px-5 sm:px-4">
        <div className="h-[56px] w-[50%] rounded-lg bg-gray-700_33" />
        <div className="flex w-[22%] justify-between gap-5 md:w-full">
          <Button variant="gradient" shape="round" color="rectangle_5_green_600" className="min-w-[188px] font-medium">
            Plant a Tree
          </Button>
          <div className="flex w-[36%] items-center justify-between gap-5">
            <a href="#">
              <Img src="images/img_thumbs_up.svg" alt="Thumbsup" className="h-[40px] w-[40px]" />
            </a>
            <Img
              src="images/img_frame_30139.png"
              alt="Image"
              className="h-[56px] w-[56px] rounded-[28px] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
