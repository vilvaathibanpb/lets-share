import React from "react";
import { FormattedMessage } from "react-intl";

const RequestItem = ({ userDetails, items, requestType }: any) => {
  const { name, contact, address } = userDetails;
  return (
    <div className="bg-white w-full border rounded-sm p-5 text-primary-text shadow-xs mb-5">
      <div className="flex flex-col lg:flex-row xl:flex-row justify-between  lg:items-center xl:items-center">
        <p className="text-xs lg:text-lg xl:text-lg font-semibold text-link">
          {name}
        </p>
        <p className="text-xs lg:text-base xl:text-base font-semibold text-primary-text">
          <span className="text-sm font-semibold text-secondary-text">
            <FormattedMessage
              id="contact_details"
              defaultMessage="Contact Details"
            />
          </span>
          : {contact}
        </p>
      </div>
      {address && (
        <p className="mt-2">
          <span className="text-sm text-secondary-text"><FormattedMessage
            id="address"
            defaultMessage="Address" /> : </span>
          {address}
        </p>
      )}
      {items && items.length > 0 && (
        <p className="mt-2">
          <span className="text-sm font-normal text-secondary-text">
          {requestType === "requests" ? <FormattedMessage id="I_need" defaultMessage="I need" /> : <FormattedMessage id="I_can_share" defaultMessage="I can share" />} : 
          </span>
           <span className="ml-2">{items.map(((item: any) => item.text)).join(", ")}</span>
        </p>
      )}
    </div>
  );
};

export default RequestItem;
