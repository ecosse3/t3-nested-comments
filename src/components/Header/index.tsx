import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="px-4 lg:px-6 py-2.5 bg-purple-600 shadow-lg">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-2xl container">
          <Link href="/"><span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">T3 Nested Comments</span></Link>
          <div className="flex items-center lg:order-2">
            {!session ? (
              <button onClick={() => signIn()} className="bg-purple-500 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-purple-400 focus:outline-none dark:focus:ring-purple-400 transition-colors duration-100">Log in</button>
            ) : 
              <button onClick={() => signOut()} className="bg-purple-500 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-purple-400 focus:outline-none dark:focus:ring-purple-400 transition-colors duration-100">Log out</button>
          }
            {/* <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a> */}
          </div>
        </div>
      </nav>
    </header>
  );
};
