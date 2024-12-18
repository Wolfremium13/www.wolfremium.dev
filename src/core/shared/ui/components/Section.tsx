import React from "react";

const Section = ({children}: { children: React.ReactNode}) => {
    return (
        <section className="flex justify-center items-center min-h-screen">
            <section className={`m-0 md:m-8 bg-gray-950/75 p-4 rounded-xl w-full max-w-7xl`}>
                {children}
            </section>
        </section>
    );
};

export default Section;
