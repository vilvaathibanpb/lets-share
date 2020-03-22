import React from "react";
import { FormattedMessage } from "react-intl";

interface TitleSectionProps {
  userAllowed: boolean;
  pincode: string;
}

const TitleSection = ({ pincode, userAllowed }: TitleSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center  w-full">
      <p className="text-comp font-bold text-xl">
        <FormattedMessage id="ZIP_CODE" defaultMessage="Zip Code" /> :{" "}
        {pincode ? pincode : "-"}
      </p>
      {!userAllowed && (
        <p className="mt-10 font-bold"><FormattedMessage id="please_save_your_details_to_proceed" defaultMessage="Please Save your Details to Proceed" /></p>
      )}
    </div>
  );
};

export default TitleSection;
