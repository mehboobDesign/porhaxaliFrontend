import React from "react";

const SearchBox = () => {
    return(
        <div className="w-[80%]">
  {/* <label for="search" class="sr-only">Search</label> */}
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.601 10.601z" />
      </svg>
    </div>
    <input 
      type="text" 
      name="search" 
      id="search" 
      className="block w-full rounded-[5px] border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset outline-0 ring-gray-200 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 transition-all duration-200 bg-gray-50/50 focus:bg-white" 
      placeholder="Search books, articles, or video..."
    />
  </div>
</div>
    );
}

export default SearchBox;