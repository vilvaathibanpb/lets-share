import React, { useState } from "react";

interface MakeRequestProps {
  pincode: string;
  userId: string;
}

const MakeRequest = ({ pincode, userId }: MakeRequestProps) => {
  const [message, setRequest] = useState("");

  const saveRequest = () => {
      const body = {
          message,
          pincode,
          userId
      }

      console.log(body);
      
  }

  return (
    <div className="flex flex-col lg:flex-row xl:flex-row my-8 justify-center items-center">
      <textarea
        placeholder="Enter your request"
        value={message}
        onChange={e => setRequest(e.target.value)}
        className="p-3 w-full lg:w-1/2 xl:w-1/2 rounded-lg border-gray-400 border focus:outline-none"
      />

      <button onClick={saveRequest} className="lg:ml-8 xl:ml-8 p-2 text-sm lg:text-lg xl:text:lg font-semibold bg-primary text-white mt-5 rounded-lg">
        Make a Request >
      </button>
    </div>
  );
};

export default MakeRequest;
