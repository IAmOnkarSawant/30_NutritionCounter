import React from 'react';

const TeamSpace = () => {
    return (
        <div className="h-70vh bg-white flex flex-col justify-center items-center">
        <section >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                    Our Investors & Board of Directors
                </h2>
            </div>

            <div className="flex justify-center items-center space-x-8">
                {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img
                            className="object-cover w-44 h-44 mx-auto rounded-full lg:w-52 lg:h-52 grayscale filter"
                            src={`https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-${index}.png`}
                            alt={`Team Member ${index}`}
                        />
                        <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">Jerome Bell</p>
                        <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                            Co-founder, Chairman, Executive Director
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-12">
                <svg
                    className="w-auto h-4 mx-auto text-gray-300"
                    viewBox="0 0 172 16"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Your lines SVG code */}
                </svg>
            </div>

            <div className="flex justify-center items-center space-x-16 mt-8">
                {[
                    'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/logo-waverio.svg',
                    'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/logo-squarestone.svg',
                    'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/logo-creaty.svg',
                ].map((logoSrc, index) => (
                    <div key={index}>
                        <img className="w-auto h-11" src={logoSrc} alt={`Logo ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>
        </div>
    );
};

export default TeamSpace;
