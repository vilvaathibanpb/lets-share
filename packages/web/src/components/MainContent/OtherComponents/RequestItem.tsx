import React from "react";
import { FormattedMessage } from "react-intl";

const RequestItem = ({ userDetails }: any) => {
  const { name, contact, address, items, message } = userDetails;
  return (
    <div className="w-full border rounded-sm p-5 text-primary-text shadow-xs mb-5">
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
      {message && (
        <p className="mt-2 font-bold">
          <span className="text-sm font-normal text-secondary-text">
            <FormattedMessage id="I_need" defaultMessage="I need" />
          </span>
          : {message}
        </p>
      )}
      {items && items.length > 0 && (
        <p className="mt-2 font-bold">
          <span className="text-sm font-normal text-secondary-text">
            <FormattedMessage id="I_can_share" defaultMessage="I can share" />
          </span>
          : {items.join(", ")}
        </p>
      )}
    </div>
  );
};

export default RequestItem;