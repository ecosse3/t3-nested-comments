export const Footer = () => (
  <footer className="px-4 lg:px-6 py-2.5 bg-white dark:bg-purple-600">
    <div className="max-w-2xl mx-auto md:flex items-center md:justify-between">
      <span className="block text-sm text-white text-center sm:text-left">© 2022 <a href="https://github.com/ecosse3" className="hover:underline" target="_blank" rel="noreferrer">Ecosse</a>. <a href="http://www.wtfpl.net/" className="hover:underline" target="_blank" rel="noreferrer">WTFPL</a> License.</span>
      <a
        className="flex justify-center items-center hover:underline mt-3 text-sm text-white sm:mt-0"
        href="https://github.com/ecosse3/t3-nested-comments"
        rel="noreferrer"
        target="_blank">
        <svg
          width="24"
          height="24"
          fill="currentColor"
          className="text-white mr-1 text-opacity-80 transform">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z">
          </path>
        </svg>
        GitHub
      </a>
    </div>
  </footer>
);
