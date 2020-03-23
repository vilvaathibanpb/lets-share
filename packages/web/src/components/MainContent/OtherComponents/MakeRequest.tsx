import React, { useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { BASE_URL, endpoints } from "../../../utils/constants";
import { toast } from "react-toastify";

interface MakeRequestProps {
  pincode: string;
  userId: string;
  intl: any;
  refreshList: any;
}

const MakeRequest = ({ pincode, userId, intl, refreshList }: MakeRequestProps) => {
  const [message, setRequest] = useState("");

  const saveRequest = () => {
    const body = {
      text: message,
      pincode,
      userId
    };
    fetch(`${BASE_URL}${endpoints.createRequest}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response) {
          toast.error(
            intl.formatMessage({
              id: "failure",
              defaultMessage: "Something went wrong"
            })
          );
          return;
        }
        return response.json();
      })
      .then(data => {
        setRequest("");
        refreshList();
        toast.success(
          intl.formatMessage({
            id: "success",
            defaultMessage: "Success!"
          })
        );
      });
  };

  return (
    <div className="flex flex-col lg:flex-row xl:flex-row my-8 justify-start items-start">
      <textarea
        // @ts-ignore
        placeholder={intl.formatMessage({
          id: "enter_what_you_need",
          defaultMessage: "Enter your request"
        })}
        value={message}
        onChange={e => setRequest(e.target.value)}
        className="p-3 w-full lg:w-1/2 xl:w-1/2 rounded-lg border-gray-400 border focus:outline-none"
      />

      <button
        onClick={saveRequest}
        className="lg:ml-8 xl:ml-8 p-2 text-sm lg:text-lg xl:text:lg font-semibold bg-primary text-white mt-5 rounded-lg"
      >
        <FormattedMessage id="make_a_request" defaultMessage="Make a Request" />{" "}
        >
      </button>
    </div>
  );
};

export default injectIntl(MakeRequest);
