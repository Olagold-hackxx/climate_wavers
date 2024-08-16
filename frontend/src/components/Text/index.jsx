const sizes = {
  textxs: "text-[16px] font-normal lg:text-[13px]",
  texts: "text-[24px] font-normal not-italic lg:text-[20px] md:text-[22px]",
  textmd: "text-[28px] font-normal not-italic lg:text-[23px] md:text-[26px] sm:text-[24px]",
  textlg: "text-[32px] font-normal not-italic lg:text-[27px] md:text-[30px] sm:text-[28px]",
  textxl: "text-[128px] font-normal not-italic lg:text-[128px] md:text-[48px]",
};

const Text = ({ children, className = "", as, size = "texts", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-colors font-montserrat ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
