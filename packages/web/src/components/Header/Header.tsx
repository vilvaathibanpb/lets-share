import React from "react";
import { FormattedMessage } from "react-intl";

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
          <FormattedMessage id="Language" defaultMessage="Language" />
        </p>
        <select
          className="border rounded-lg text-sm border-gray-400 focus:outline-none active:outline-none bg-primary text-white p-1 lg:p-5 xl:p-5 ml-3 h-10 w-full lg:w-1/2 xl:w-1/2"
          placeholder="choose your language"
          value={language}
          onChange={e => setLanguage(e.target.value)}
        >
          <option value="bg">Bulgarian</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="de">German</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="hr">Croatian</option>
          <option value="hu">Hungarian</option>
          <option value="it">Italian</option>
          <option value="nb">Norwegian</option>
          <option value="nl">Dutch</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="uk">Ukrainian</option>
          <option value="zh">Chinese</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
