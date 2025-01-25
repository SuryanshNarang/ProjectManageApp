import React from "react";

type Props = { 
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};
// we are going to have header title and header button. which will be consistent accross many pages.

const Header = ({ name, buttonComponent, isSmallText }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className={`text-lg font-semibold dark:text-white ${isSmallText ? "text-sm" : ""}`}>
        {name}
      </h2>
      {buttonComponent && <div>{buttonComponent}</div>}
    </div>
  );
};

export default Header;
