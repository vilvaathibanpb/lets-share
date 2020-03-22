import React, { useEffect, useState } from "react";
import { readFromLS } from "../../utils/localStorage";
import TitleSection from "./OtherComponents/TitleSection";
import MakeRequest from "./OtherComponents/MakeRequest";
import ListTypeSelector from "./OtherComponents/ListTypeSelector";
import Loader from "./OtherComponents/Loader";
import RequestItem from "./OtherComponents/RequestItem";

interface MainContentProps {
  updated: boolean;
  setUpdateStatus: any;
}

const MainContent = ({ updated, setUpdateStatus }: MainContentProps) => {
  const [userAllowed, setUserStatus] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({});
  const [requestType, setRequestType] = useState("requests");
  const [requestList, setRequestList] = useState<any>([]);
  const [showLoader, toggleLoader] = useState(true);

  useEffect(() => {
    const userDetails = readFromLS();
    //ToDo if (userDetails.pincode && userDetails.userId){
    if (userDetails && userDetails.pincode) {
      setUserStatus(true);
      setUserDetails(userDetails);
      setUpdateStatus(false);
    }
  }, [updated]);

  useEffect(() => {
    console.log("Refresh");
  }, [requestType]);

  const { pincode, userId } = userDetails;

  return (
    <div className="w-full p-5">
      <TitleSection userAllowed={userAllowed} pincode={userDetails.pincode} />
      {userAllowed && (
        <>
          <MakeRequest pincode={pincode} userId={userId} />
          <ListTypeSelector
            requestType={requestType}
            setRequestType={setRequestType}
          />
          <div className="justify-around items-center flex p-5 flex-col">
            {showLoader ? (
              <Loader />
            ) : (
              <>
                <RequestItem userDetails={userDetails} />
                <RequestItem userDetails={userDetails} />
                {requestList &&
                  requestList.length > 0 &&
                  requestList.map((requestItem: any) => {
                    return (
                      <RequestItem
                        userDetails={requestItem.userDetails}
                        key={requestItem.id}
                      />
                    );
                  })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MainContent;
