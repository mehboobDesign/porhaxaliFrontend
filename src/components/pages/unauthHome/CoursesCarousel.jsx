import React, {useState,useRef, useEffect} from "react";
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';
import Axios from "../../../api/Axios";
import { GET_SUBJECTS } from "../../../api/Urls";
const CoursesCarousel = () => {
    const carouselRef = useRef(null);
    const topCourses = [
        {
          id: 1,
          title: "Class 10 Advanced Math Masterclass",
          category: "Board Exams",
          rating: 4.9,
          reviews: 1240,
          price: "₹1,499",
          badge: "Bestseller",
          badgeColor: "bg-pink-100 text-pink-700"
        },
        {
          id: 2,
          title: "Regional & National Math Olympiad Prep",
          category: "Competitive",
          rating: 5.0,
          reviews: 480,
          price: "₹2,499",
          badge: "Elite Elite",
          badgeColor: "bg-indigo-100 text-indigo-700"
        },
        {
          id: 3,
          title: "HS Science (Physics & Chemistry) Foundation",
          category: "Class 11-12",
          rating: 4.8,
          reviews: 850,
          price: "₹1,999",
          badge: "Popular",
          badgeColor: "bg-emerald-100 text-emerald-700"
        },
        {
            id: 4,
            title: "HS Science (Physics & Chemistry) Foundation",
            category: "Class 11-12",
            rating: 4.8,
            reviews: 850,
            price: "₹1,999",
            badge: "Popular",
            badgeColor: "bg-emerald-100 text-emerald-700"
          }
      ];
      
      const [canScrollLeft, setCanScrollLeft] = useState(false);
      const [canScrollRight, setCanScrollRight] = useState(true);
      const [courses, setCourses] = useState([]);
      // 2. Function to check scroll position
  const checkForScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      // If scrollLeft is greater than 0, we can scroll left
      setCanScrollLeft(scrollLeft > 0);
      
      // If scrollLeft + visible width is less than total width, we can scroll right
      // (Subtracting 1px as a safety buffer for browser rounding decimals)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };
  // useEffect(() => {
  //   checkForScrollPosition();
  // }, []);
      const scroll = (direction) => {
        if (carouselRef.current) {
          // Scrolls by the width of one card + gap (adjust multiplier as needed)
          const scrollAmount = carouselRef.current.offsetWidth / 3; 
          carouselRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
          });
        }
      };
     
      useEffect(()=>{
            const getSubjects = async () => {
                try {
                    await Axios.get(GET_SUBJECTS)
                        .then(function (response) {
                            setCourses(response.data.data);
                            // setFetchDataSuccess(true);
                            console.log(response.data.data);
                        })
                } catch (err) {
                    console.log(err);
                }
            };
            getSubjects();
      },[]);
      useEffect(() => {
        if (courses.length > 0) {
          // requestAnimationFrame ensures DOM layout calculations are finalized
          requestAnimationFrame(() => {
            checkForScrollPosition();
          });
        }
      }, [courses]);
    return(<>
        <section id="courses" className="bg-white border-y border-slate-200 py-20 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Curated Best-Sellers</h2>
              <p className="text-slate-500 mt-1">Structured comprehensive learning blueprints built by curriculum experts.</p>
            </div>
            <div className="gap-2 hidden md:flex">
          <button 
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-all shadow-sm
              ${canScrollLeft 
                ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:scale-95 hover:cursor-pointer" 
                : "text-gray-300 opacity-50 cursor-not-allowed"}`}
          >
            <ArrowLeft/>
          </button>
          <button 
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-all shadow-sm
              ${canScrollRight 
                ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:scale-95 hover:cursor-pointer" 
                : "text-gray-300 opacity-50 cursor-not-allowed"}`}
            //className="flex h-10 w-10 items-center hover:cursor-pointer justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-95 shadow-sm"
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg> */}
            <ArrowRight/>
          </button>
        </div>
          </div>

          {/* <div ref={carouselRef} className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
          <div ref={carouselRef}
          onScroll={checkForScrollPosition}
           className="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4">
            {/* {topCourses.map((course) => (
              <div key={course.id} className="w-full shrink-0 snap-start md:w-[calc(33.333%-16px)] bg-slate-50 bg-linear-to-r from-violet-200 to-pink-200 border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:border-pink-300 hover:shadow-xl transition-all duration-300">
                <div>
                  <span className={`inline-block px-3 py-1 text-violet-900 rounded-full text-xs font-bold tracking-wide mb-4 ${course.badgeColor}`}>
                    {course.badge}
                  </span>
                  <p className="text-xs text-violet-900 font-bold uppercase tracking-widest">{course.category}</p>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-4 leading-snug">{course.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <Star className="text-amber-600 fill-amber-400" size={16} /> {course.rating} 
                    <span className="text-pink-900 font-normal">({course.reviews} learners)</span>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-amber-700 font-medium">Full Course Value</p>
                    <p className="text-2xl font-black text-slate-900">{course.price}</p>
                  </div>
                  <button className="bg-pink-900 hover:cursor-pointer hover:bg-pink-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))} */}
            {courses.map((course) => (
              <div key={course.id} className="w-full shrink-0 snap-start md:w-[calc(33.333%-16px)] bg-slate-50 bg-linear-to-r from-violet-200 to-pink-200 border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:border-pink-300 hover:shadow-xl transition-all duration-300">
                <div>
                  <span className={`inline-block px-3 py-1 text-violet-900 rounded-full text-xs font-bold tracking-wide mb-4`}>
                    
                  </span>
                  <p className="text-xs text-violet-900 font-bold uppercase tracking-widest">{course.code}</p>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-4 leading-snug">{course.name}</h3>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <Star className="text-amber-600 fill-amber-400" size={16} />  
                    <span className="text-pink-900 font-normal">({course.description} learners)</span>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-amber-700 font-medium">Full Course Value</p>
                    <p className="text-2xl font-black text-slate-900"></p>
                  </div>
                  <button className="bg-pink-900 hover:cursor-pointer hover:bg-pink-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
    );
}

export default CoursesCarousel;