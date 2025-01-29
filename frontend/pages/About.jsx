import React from 'react';
import image from "../src/assets/images/XHxdE.jpg";

export function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left half */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img
            src={image}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
            alt="About Us"
          />
        </div>

        {/* Right half */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center edu-au-vic-wa-nt-guides tracking-tight text-gray-900">
              About Us
            </h1>
            
            <div className="space-y-6 text-lg text-gray-600">
              <p className="font-medium text-xl text-[#1c2938]">
                Welcome to Exotica Blog!
              </p>
              
              <p>
                At Exotica, we believe in the power of words to inspire, educate, and connect. 
                Our platform is more than just a blog – it's a community where passionate writers 
                come together to share their unique perspectives and experiences.
              </p>

              <p>
                Whether you're here to learn something new, share your thoughts, or find 
                inspiration, our diverse collection of articles covers everything from technology 
                and culture to lifestyle and beyond.
              </p>

              <p>
                Join our growing community of writers and readers, and be part of a space where 
                ideas flourish and stories come to life. Your voice matters here at Exotica.
              </p>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h2 className="text-2xl font-semibold mb-4 text-[#1c2938]">
                  Our Mission
                </h2>
                <p className="text-gray-700">
                  To create a vibrant platform where diverse voices can be heard, 
                  where knowledge is shared freely, and where connections are made 
                  through the power of written word.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Exotica. All rights reserved.</p>
      </footer>
    </div>
  );
}