import React from "react";

const Main = ({children}: { children: React.ReactNode; }) => {

    return (
        <main className="min-h-screen pt-20 md:p-20 bg-darkViolet text-cyan-50 bg-confetti bg-fixed">
            {children}
        </main>
    );
}

export default Main;