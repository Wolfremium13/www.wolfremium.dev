import React from "react";

export const Main = ({children}: { children: React.ReactNode; }) => {

    return (
        <main className="min-h-screen bg-darkViolet text-cyan-50 bg-confetti bg-fixed">
            {children}
        </main>
    );
}