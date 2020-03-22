import React, { useEffect, useState } from "react";
import { readFromLS } from "../../utils/localStorage";
import TitleSection from "./OtherComponents/TitleSection";
import MakeRequest from "./OtherComponents/MakeRequest";
import ListTypeSelector from "./OtherComponents/ListTypeSelector";
import Loader from "./OtherComponents/Loader";
import RequestItem from "./OtherComponents/RequestItem";
import { BASE_URL, endpoints } from "../../utils/constants";
import { toast } from "react-toastify";
import { injectIntl } from "react-intl";

interface MainContentProps {
  updated: boolean;
  setUpdateStatus: any;
  intl: any;
}

const MainContent = ({ updated, setUpdateStatus, intl }: MainContentProps) => {
  const [userAllowed, setUserStatus] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({});
  const [requestType, setRequestType] = useState("requests");
  const [requestList, setRequestList] = useState<any>([]);
  const [showLoader, toggleLoader] = useState(true);

  useEffect(() => {
    const userDetails = readFromLS();
    if (userDetails && userDetails.pincode && userDetails.userId) {
      setUserStatus(true);
      setUserDetails(userDetails);
      setUpdateStatus(false);
    }
  }, [updated]);

  useEffect(() => {
    if (!userAllowed) return;
    toggleLoader(true);
    refreshList();
  }, [requestType, userAllowed, updated]);

  const refreshList = () => {
    const handleResponse = (res: any) => {
      if (!res) {
        toggleLoader(false);
        toast.error(
          intl.formatMessage({
            id: "failure",
            defaultMessage: "Something went wrong"
          })
        );
        return;
      }
      return res.json();
    };

    const extarctData = (data: any) => {
      if (!data) return;
      toggleLoader(false);
      setRequestList(data.requests || data.shared);
    };

    fetch(
      `${BASE_URL}${
        requestType === "requests"
          ? endpoints.getAllRequests
          : endpoints.getAllOffers
      }${userDetails.pincode}`
    )
      .then(handleResponse)
      .then(extarctData);
  };

  const { pincode, userId } = userDetails;

  return (
    <div className="w-full p-5">
      <TitleSection userAllowed={userAllowed} pincode={userDetails.pincode} />
      {userAllowed && (
        <>
          <MakeRequest pincode={pincode} userId={userId} refreshList={refreshList} />
          <ListTypeSelector
            requestType={requestType}
            setRequestType={setRequestType}
          />
          <div className="justify-around items-center flex p-5 flex-col">
            {showLoader ? (
              <Loader />
            ) : (
              <>
                {requestList && requestList.length > 0 ? (
                  requestList.map((requestItem: any) => {
                    return (
                      <RequestItem
                        userDetails={requestItem.user}
                        items={requestItem.items}
                        key={requestItem.id}
                        requestType={requestType}
                      />
                    );
                  })
                ) : (
                  <p className="flex justify-center w-full border shadow-xs py-10 text-link font-semibold">
                    No Results found
                  </p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default injectIntl(MainContent);
