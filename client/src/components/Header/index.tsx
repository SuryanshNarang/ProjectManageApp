import React from "react";

type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};
// we are going to have header title and header button. which will be consistent accross many pages.
const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${
          isSmallText ? "text-lg" : "text-2xl"
        } font-semibold dark:text-white`}
      >
        {name}
        {buttonComponent}
      </h1>
    </div>
  );
};

export default Header;
