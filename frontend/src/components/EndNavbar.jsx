import React from "react";

import UnstyledInputIntroduction from "../components/UnstyledInputIntroduction";
import UnstyledButtonsIntroduction from "../components/UnstyledButtonsIntroduction";
import RevievCard from "../components/RevievCard";

function EndNavbar() {
  return (
    <div className="bg-[#0d1521] min-h-[18rem] flex ">
      <div className="container mx-auto px-4 py-8 sm:py-10 ">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 lg:justify-between ">
          {/* Why EXOTICA Section */}
          <div className="w-full lg:w-1/3 me-20">
            <h1 className="text-[#f6ddce] text-xl mb-4 sm:mb-6">
              EXOTICA Blog
            </h1>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-[#f6ddce] text-sm sm:text-base">
                <span className="font-bold text-white block mb-1">14000+</span>
                Posts
              </div>
              <div className="text-[#f6ddce] text-sm sm:text-base text-right">
                <span className="font-bold text-white block mb-1">550</span>
                Road Events Completed
              </div>
              <div className="text-[#f6ddce] text-sm sm:text-base">
                <span className="font-bold text-white block mb-1">685k+</span>
                Registered members
              </div>
              <div className="text-[#f6ddce] text-sm sm:text-base text-right">
                <span className="font-bold text-white block mb-1">8+</span>
                Years of Car Comunity
              </div>
            </div>
          </div>

          {/* Review Card Section */}
          <div className="w-full lg:w-1/3 mt-8 me-20 lg:mt-0 bg-white rounded-lg p-4 flex items-center justify-center min-h-[200px]">
            <p className="text-center max-w-prose italic">
              Welcome to Exotica, your ultimate destination for automotive
              passion and innovation. We bring you engaging and insightful blog
              posts about the world's most unique vehicles, from exotic
              supercars to rugged SUVs and off-road jeeps. Our mission is to
              celebrate automotive excellence, explore cutting-edge designs,
            </p>
          </div>

          {/* Email Subscription Section */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <h1 className="text-[#f6ddce] text-xl mb-4">Get the daily Email</h1>
            <div className="space-y-3">
              <div className="w-full ">
                <UnstyledInputIntroduction />
              </div>
              <div className="w-full">
                <UnstyledButtonsIntroduction />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndNavbar;
