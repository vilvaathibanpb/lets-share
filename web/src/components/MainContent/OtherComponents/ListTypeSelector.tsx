import React from 'react';
import { FormattedMessage } from 'react-intl';

interface ListTypeSelectorProps {
    setRequestType: any;
    requestType: string;
}

const ListTypeSelector = ({ setRequestType, requestType}: ListTypeSelectorProps) => {
    return (
        <div className="justify-around flex border p-2 shadow-md">
        <div onClick={() => setRequestType('requests')} className={`p-3 text-sm lg:text-base xl:text-base border-r cursor-pointer border-gray-900 w-full  flex items-center justify-center ${requestType === 'requests' ?  'text-primary font-semibold' : '' }`}>
          <FormattedMessage id="requests" defaultMessage="Requests" /> - <FormattedMessage id="nearbyLocations" defaultMessage="Near by Locations" />
        </div>
        <div onClick={() => setRequestType('responds')} className={`p-3 text-sm lg:text-base xl:text-base w-full cursor-pointer flex items-center justify-center ${requestType === 'requests' ?  '' : 'text-primary font-semibold' }`}>
          <FormattedMessage id="need_help.title" defaultMessage="Need Help?" />
        </div>
      </div>
    )
}

export default ListTypeSelector