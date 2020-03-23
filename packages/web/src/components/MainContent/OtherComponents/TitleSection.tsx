import React from "react";
import { FormattedMessage } from "react-intl";

interface TitleSectionProps {
  userAllowed: boolean;
  pincode: string;
  setDataStatus: any;
   dataUpdated: boolean;
}

const TitleSection = ({ pincode, userAllowed, setDataStatus, dataUpdated }: TitleSectionProps) => {
  return (
    <div className="flex flex-col items-start lg:items-center xl:items-center justify-center  w-full">
      <p className="text-secondary-text font-bold text-xl flex justify-between lg:justify-center xl:justify-center  w-full">
        <span>
        <FormattedMessage id="ZIP_CODE" defaultMessage="Zip Code" /> :{" "}
        {pincode ? pincode : "-"}
        </span>
        {dataUpdated && <span onClick={() => setDataStatus(false)} className="text-base flex items-center cursor-pointer block lg:hidden xl:hidden bg-link text-white px-5">Edit</span>}
      </p>
      {!userAllowed && (
        <>
          <h1 className="my-5 font-semibold">What is Helper Human?</h1>
          <h4>A platform to connect Volunteers willing to help/donate and people seeking help during times of Corona/Quarantine </h4>
          <h1 className="my-5 font-semibold">How does it works?</h1>
          <h4 className="mb-2">1) Enter you name, zip code / pin code, contact details and Save your details </h4>
          <h4 className="mb-2">2) You can see the list of Requests for help in your Zip code.  </h4>
          <h4 className="mb-2">3) There will also be a list of people in your zip code who are willing to help / share things</h4>
          <h4 className="mb-2">4) You may also request for help / things</h4>
          <p className="mt-10 font-bold text-link"><FormattedMessage id="please_save_your_details_to_proceed" defaultMessage="Please Save your Details to Proceed" /></p>
        </>
      )}
    </div>
  );
};

export default TitleSection;
