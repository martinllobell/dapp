import React from "react";

const CardSkeleton = () => {
    return (
        <div className="font-semibold mb-8 lg:w-[22%] lg:h-[22rem] h-[25rem] backdrop-blur-xl bg-gray-700 animate-pulse shadow-xl shadow-sm shadow-black/10 rounded-lg transition-colors">
            <div className="h-full flex flex-col justify-between">

                <div className='h-[20%] mb-3 flex flex-row items-center justify-between'>
                    <div className="flex flex-row px-2 gap-2 items-center">
                        <div className='w-8 h-8 bg-gray-600 rounded-full'></div>
                        <div className='w-40 h-4 bg-gray-600 rounded'></div>
                    </div>
                    <div className="flex flex-col items-center rounded-full w-12">
                        <div className="w-8 h-4 bg-gray-600 rounded"></div>
                        <div className="w-8 h-4 bg-gray-600 rounded"></div>
                    </div>
                </div>

                <div className="h-[20%] px-4 mb-2 flex flex-row items-center justify-between text-sm bg-gray-600 rounded-lg">
                    <div className="flex flex-col w-full justify-center">
                        <div className='w-40 h-4 bg-gray-600 rounded mb-2'></div>
                        <div className="w-32 h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className="flex flex-col h-full items-center justify-center w-auto whitespace-nowrap">
                        <div className="w-16 h-4 bg-gray-600 rounded"></div>
                    </div>
                </div>

                <div className='h-[35%] flex flex-row justify-between items-center'>
                    <div className='px-2 flex flex-col h-full items-center justify-center rounded-full z-10'>
                        <div className='w-16 h-16 bg-gray-600 rounded-full'></div>
                    </div>
                    <div className='text-xs font-medium text-center w-20 bg-gray-600 h-4 rounded'></div>
                    <div className='font-medium flex items-center flex-col h-full justify-start text-[10px] md:text-xs'>
                        <div className="w-40 h-8 bg-gray-600 rounded-t-full"></div>
                        <div className="items-center w-full flex flex-col w-full">
                            <div className='w-16 h-4 bg-gray-600 rounded mb-2'></div>
                            <div className='w-16 h-4 bg-gray-600 rounded'></div>
                        </div>
                        <div className="mt-5 w-8 h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className='text-xs font-medium text-center w-20 bg-gray-600 h-4 rounded'></div>
                    <div className='px-2 flex flex-col h-full items-center overflow-hidden justify-center rounded-full z-10'>
                        <div className='w-16 h-16 bg-gray-600 rounded-full'></div>
                    </div>
                </div>

                <div className="h-[25%] h-16">
                    <div className="flex justify-center items-center mt-4">
                        <div className="bg-gray-600 text-sm text-white rounded-lg px-4 py-2 flex items-center justify-center mb-4 w-full h-10"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CardSkeleton;
