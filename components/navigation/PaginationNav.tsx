import Link from "next/link";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

type PaginationNavProps = {
  page: number;
  totalPages: number;
};

const PaginationNav: React.FC<PaginationNavProps> = ({ page, totalPages }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      {/* Ir a la primera página */}
      {page > 1 && (
        <Link href={`/blog/page/1`}>
          <p className="text-darkGreen hover:text-lightGreen cursor-pointer">
            <FaAngleDoubleLeft size={35} />
          </p>
        </Link>
      )}

      {/* Ir a la página anterior */}
      {page > 1 && (
        <Link href={`/blog/page/${page - 1}`}>
          <p className="text-darkGreen hover:text-lightGreen cursor-pointer">
            <FaAngleLeft size={35} />
          </p>
        </Link>
      )}

      <div className="hidden sm:flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Link key={num} href={`/blog/page/${num}`}>
            <p
              className={`px-4 py-2 text-lg rounded-full cursor-pointer ${
                page === num
                  ? "bg-lightGreen text-darkViolet"
                  : "bg-darkViolet text-darkGreen hover:text-lightGreen"
              }`}
            >
              {num}
            </p>
          </Link>
        ))}
      </div>

      {/* Ir a la página siguiente */}
      {page < totalPages && (
        <Link href={`/blog/page/${page + 1}`}>
          <p className="text-darkGreen hover:text-lightGreen cursor-pointer">
            <FaAngleRight size={35} />
          </p>
        </Link>
      )}

      {/* Ir a la última página */}
      {page < totalPages && (
        <Link href={`/blog/page/${totalPages}`}>
          <p className="text-darkGreen hover:text-lightGreen cursor-pointer">
            <FaAngleDoubleRight size={35} />
          </p>
        </Link>
      )}
    </div>
  );
};
export { PaginationNav };
