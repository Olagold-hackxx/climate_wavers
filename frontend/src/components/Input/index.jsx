import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[32px]",
};

const variants = {
  fill: {
    white: "bg-white shadow-xl text-gray-400",
  },
};

const sizes = {
  sm: "h-[64px] px-7 text-[24px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "sm",
      color = "",
      ...restProps
    },
    ref,
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center cursor-text text-gray-400 text-[24px] border-gray-400_01 border-[0.5px] border-solid bg-white shadow-xl rounded-[32px]  ${shape && shapes[shape]} ${variant && (variants[variant]?.[color] || variants[variant])} ${size && sizes[size]}`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange} {...restProps} />
        {!!suffix && suffix}
      </label>
    );
  },
);
Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["white"]),
};

export { Input };
