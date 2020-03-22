import React from "react";

interface HeaderProps {
  language: string;
  setLanguage: any;
}

const Header = ({ language, setLanguage }: HeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center px-5 py-5 shadow-md sticky fixed inset-0 bg-white">
      <p className="text-lg text-green-700 text-semibold text-primary font-bold">
        Helper Human
      </p>
      <div className="flex items-center w-1/2 lg:w-1/4 xl:w-1/4 justify-end">
        <p className="hidden lg:block xl:block  text-sm text-primary-text">
          Select Language:
        </p>
        <select
          className="border rounded-lg text-sm border-gray-400 focus:outline-none active:outline-none bg-primary text-white p-5 ml-3 h-10 w-full lg:w-1/2 xl:w-1/2"
          placeholder="choose your language"
          value={language}
          onChange={e => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="sp">spanish</option>
          <option value="de">German</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
