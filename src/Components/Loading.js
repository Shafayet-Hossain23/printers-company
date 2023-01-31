import React from 'react';
import { Audio, RotatingLines } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='flex justify-center lg:my-44 mt-32 mb-32'>

            <div>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>

        </div>
    );
};

export default Loading;