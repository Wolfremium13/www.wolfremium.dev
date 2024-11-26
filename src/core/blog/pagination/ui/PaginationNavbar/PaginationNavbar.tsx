import React from "react";
import Link from "next/link";
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight,
} from "react-icons/fa";
import {PaginationNumbers} from "@/core/blog/pagination/domain/pagination-numbers";

type PaginationNavProps = {
    currentPage: number;
    totalPages: number;
};

const PaginationNavbar: React.FC<PaginationNavProps> = ({currentPage, totalPages}) => {
    const paginationNumbersToShow = new PaginationNumbers(currentPage, totalPages).calculate();

    return (
        <div className="flex justify-center items-center space-x-4 mt-12">
            {currentPage > 1 && (
                <Link href={`/blog/page/1`}>
                    <p className="text-darkGreen hover:text-lightGreen cursor-pointer">
                        <FaAngleDoubleLeft size={35} aria-label="First Page"/>
                    </p>
                </Link>
            )}

            {currentPage > 1 && (
                <Link href={`/blog/page/${currentPage - 1}`}>
                    <p className="text-darkGreen hover:text-lightGreen cursor-pointer">
                        <FaAngleLeft size={35} aria-label="Previous Page"/>
                    </p>
                </Link>
            )}

            <div className="hidden sm:flex space-x-2">
                {paginationNumbersToShow.value.map((pageNumber) => (
                    <Link key={pageNumber} href={`/blog/page/${pageNumber}`} aria-label={`Go to page ${pageNumber}`}>
                        <p
                            className={`px-4 py-2 text-lg rounded-full cursor-pointer ${
                                currentPage === pageNumber
                                    ? "bg-lightGreen text-darkViolet"
                                    : "bg-darkViolet text-darkGreen hover:text-lightGreen"
                            }`}
                        >
                            {pageNumber}
                        </p>
                    </Link>
                ))}
            </div>

            {currentPage < totalPages && (
                <Link href={`/blog/page/${currentPage + 1}`}>
                    <p className="text-darkGreen hover:text-lightGreen cursor-pointer">
                        <FaAngleRight size={35} aria-label="Next Page"/>
                    </p>
                </Link>
            )}

            {currentPage < totalPages && (
                <Link href={`/blog/page/${totalPages}`}>
                    <p className="text-darkGreen hover:text-lightGreen cursor-pointer">
                        <FaAngleDoubleRight size={35} aria-label="Last Page"/>
                    </p>
                </Link>
            )}
        </div>
    );
};
export default PaginationNavbar;