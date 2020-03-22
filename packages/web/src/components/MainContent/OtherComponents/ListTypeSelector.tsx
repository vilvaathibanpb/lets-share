import React from 'react';
import { FormattedMessage } from 'react-intl';

interface ListTypeSelectorProps {
    setRequestType: any;
    requestType: string;
}

const ListTypeSelector = ({ setRequestType, requestType}: ListTypeSelectorProps) => {
    return (
        <div className="justify-around flex p-2">
        <div onClick={() => setRequestType('requests')} className={`p-3 text-sm lg:text-base xl:text-base cursor-pointer w-full  flex items-center justify-center ${requestType === 'requests' ?  'bg-primary text-white font-semibold' : 'border border-primary' }`}>
          <FormattedMessage id="requests" defaultMessage="Requests" /> - <FormattedMessage id="nearbyLocations" defaultMessage="Near by Locations" />
        </div>
        <div onClick={() => setRequestType('responds')} className={`p-3 text-sm lg:text-base xl:text-base w-full cursor-pointer flex items-center justify-center ${requestType === 'requests' ?  'border border-primary' : 'bg-primary text-white font-semibold' }`}>
          <FormattedMessage id="need_help.title" defaultMessage="Need Help?" />
        </div>
      </div>
    )
}

export default ListTypeSelector