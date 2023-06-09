import PropTypes from "prop-types";

const Pagination = (props) => {
  const amount = props.amount.split(",").map(Number);
  const pages = Array.from({ length: amount }, (_, i) => i + 1);
  const handleClick = (element) => {
    props.handleClick(element);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            className="block px-3 py-2 ml-0 leading-tight text-orange-500 bg-white border border-orange-600 rounded-l-lg hover:bg-orange-600 hover:text-orange-600 dark:bg-orange-400 dark:border-orange-600 dark:text-orange-500 dark:hover:bg-orange-600 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        {pages.map((element, index) => {
          return (
            <li key={element}>
              <button
                type="button"
                data-cy="pagination"
                class="rounded-lg bg-white-100 focus:bg-orange-600 px-3 py-2 leading-tight text-orange-500 bg-white border border-orange-500 hover:bg-orange-600 hover:text-orange-600 dark:bg-orange-400 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white active:bg-orange-600"
                onClick={() => handleClick((index + 1) * 12)}
              >
                {" "}
                {index + 1}
              </button>
            </li>
          );
        })}

        <li>
          <a
            href="#"
            className="block px-3 py-2 leading-tight text-orange-500 bg-white border border-orange-600 rounded-r-lg hover:bg-orange-600 hover:text-orange-600 dark:bg-orange-400 dark:border-orange-600 dark:text-orange-500 dark:hover:bg-orange-600 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  amount: PropTypes.string.isRequired,
  important: PropTypes.number,
};

export default Pagination;
