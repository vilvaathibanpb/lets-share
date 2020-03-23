import React from 'react';
import Loader from '../MainContent/OtherComponents/Loader';

const FullScreenLoader = () => {
    return (
        <div className="fixed flex justify-center items-center inset-0 h-screen w-screen opacity-75 bg-secondary-text">
            <div className="">
                <Loader />
            </div>
        </div>
    )
}

export default FullScreenLoader;