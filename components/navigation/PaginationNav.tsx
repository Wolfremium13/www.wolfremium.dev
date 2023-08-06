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
  const paginationNumbers = getPaginationNumbers(page, totalPages);

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
        {paginationNumbers.map((num) => (
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

const getPaginationNumbers = (currentPage: number, total: number) => {
  const MAX_PAGINATION_NUMBERS = 5;
  if (total <= MAX_PAGINATION_NUMBERS) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }
  if (currentPage >= total - 2) {
    return [total - 4, total - 3, total - 2, total - 1, total];
  }
  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
};
