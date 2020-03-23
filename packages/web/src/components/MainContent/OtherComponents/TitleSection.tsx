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
      <p className="text-comp font-bold text-xl flex justify-between lg:justify-center xl:justify-center  w-full">
        <span>
        <FormattedMessage id="ZIP_CODE" defaultMessage="Zip Code" /> :{" "}
        {pincode ? pincode : "-"}
        </span>
        {dataUpdated && <span onClick={() => setDataStatus(false)} className="text-base flex items-center cursor-pointer block lg:hidden xl:hidden bg-link text-white px-5">Edit</span>}
      </p>
      {!userAllowed && (
        <p className="mt-10 font-bold"><FormattedMessage id="please_save_your_details_to_proceed" defaultMessage="Please Save your Details to Proceed" /></p>
      )}
    </div>
  );
};

export default TitleSection;
