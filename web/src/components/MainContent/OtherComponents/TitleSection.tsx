import React from 'react';

interface TitleSectionProps {
    userAllowed: boolean;
    pincode: string;
}

const TitleSection = ({pincode, userAllowed}: TitleSectionProps) => {
    return (
        <div className="flex flex-col items-center justify-center  w-full">
        <p className="text-comp font-bold text-xl">
          Pin : {pincode ? pincode : '-'}
        </p>
        {!userAllowed && (
          <p className="mt-10 font-bold">Please Save your details to proceed</p>
        )}
      </div>
    )
}

export default TitleSection;