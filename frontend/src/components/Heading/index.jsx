import React from "react";

const sizes = {
  headingmd: "text-[24px] font-bold lg:text-[20px] md:text-[22px]",
  headinglg: "text-[28px] font-bold lg:text-[23px] md:text-[26px] sm:text-[24px]",
  headingxl: "text-[32px] font-bold lg:text-[27px] md:text-[30px] sm:text-[28px]",
};

const Heading = ({ children, className = "", size = "headingmd", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-colors font-montserrat ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
