import { useLocation, useNavigate } from "react-router-dom";
import targetIcon from "../assets/target.png";
import pentagonLogo from "../assets/pentagonlogo.png";

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const { trackingId, month, date, year, stage, random } = state;

  const displayId = trackingId || "123456789";
  const displayMonth = month || 3;
  const displayDate = date || 27;
  const displayYear = year || 2026;
  const displayStage = stage || 4;
  
  const parsedRandom = parseInt(random, 10);
  const displayRandom = isNaN(parsedRandom) ? 6 : (parsedRandom === 0 ? 1 : parsedRandom);
  const locationIndex = Math.max(0, Math.min(5, displayRandom - 1));

  const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formattedDate = `${monthNames[displayMonth as number] || "Month"} ${displayDate}, ${displayYear}`;

  const getStageClass = (step: number) => {
    return displayStage >= step ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-200";
  };

  const getBarClass = (step: number) => {
    return displayStage > step ? "bg-green-500" : "bg-gray-200";
  };

  const getStageLabelClass = (step: number) => {
    return displayStage >= step ? "text-green-700" : "text-gray-400";
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden w-full">
      <header className="shrink-0 relative z-10">
        <nav className="bg-white flex items-center justify-center md:justify-start px-6 h-16 shadow-sm md:shadow-none border-b border-gray-200 md:border-b-[3px] md:border-blue-600">
          <div className="flex flex-row items-center gap-2">
            <img
              className="w-8 h-8 object-contain"
              src={pentagonLogo}
              alt="Pentagon Securities Logo"
            />
            <span className="text-xl font-bold tracking-tight text-gray-800 uppercase">
              Pentagon Securities
            </span>
          </div>
        </nav>
      </header>

      <main className="bg-gray-100 flex-1 w-full overflow-auto pb-10">
        <div className="max-w-3xl mx-auto pt-6 px-4">
          <div className="flex flex-row gap-2 items-center justify-start pb-4">
            <img className="w-6" src={targetIcon} alt="target" />
            <p className="text-3xl font-base text-gray-600">Tracking Details</p>
          </div>
          
          <hr className="border-gray-300 mb-6" />

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                   <h2 className="text-xl font-bold text-gray-800">Reference #{displayId}</h2>
                   <p className="text-sm text-gray-500">Sent on {formattedDate}</p>
                </div>
                <div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${displayStage === 4 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                      {displayStage === 4 ? "Completed" : "In Progress"}
                    </span>
                </div>
            </div>

                        <div className="py-8 px-2 md:px-8">
               <div className="relative flex justify-between items-center">
                                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded"></div>
                   
                                                         <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded transition-all duration-500 ${getBarClass(1)}`} style={{ width: '33.33%' }}></div>
                                      <div className={`absolute left-[33.33%] top-1/2 -translate-y-1/2 h-1 rounded transition-all duration-500 ${getBarClass(2)}`} style={{ width: '33.33%' }}></div>
                                      <div className={`absolute left-[66.66%] top-1/2 -translate-y-1/2 h-1 rounded transition-all duration-500 ${getBarClass(3)}`} style={{ width: '33.33%' }}></div>
                   
                   <div className="relative flex flex-col items-center z-10">
                       <div className={`w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow transition-all duration-500 ${getStageClass(1)}`}></div>
                       <p className={`text-xs font-semibold mt-2 absolute top-8 whitespace-nowrap transition-colors duration-500 ${getStageLabelClass(1)}`}>Started</p>
                   </div>
                   <div className="relative flex flex-col items-center z-10">
                       <div className={`w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow transition-all duration-500 ${getStageClass(2)}`}></div>
                       <p className={`text-xs font-semibold mt-2 absolute top-8 whitespace-nowrap transition-colors duration-500 ${getStageLabelClass(2)}`}>In Transit</p>
                   </div>
                   <div className="relative flex flex-col items-center z-10">
                       <div className={`w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow transition-all duration-500 ${getStageClass(3)}`}></div>
                       <p className={`text-xs font-semibold mt-2 absolute top-8 whitespace-nowrap transition-colors duration-500 ${getStageLabelClass(3)}`}>Available</p>
                   </div>
                   <div className="relative flex flex-col items-center z-10">
                       <div className={`w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow transition-all duration-500 ${getStageClass(4)}`}></div>
                       <p className={`text-xs font-semibold mt-2 absolute top-8 whitespace-nowrap transition-colors duration-500 ${getStageLabelClass(4)}`}>Received</p>
                   </div>
               </div>
            </div>

                        <div className="mt-12 border-t border-gray-100 pt-8">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Shipment Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Sender
                    </h3>
                    <p className="text-base text-gray-900 font-semibold">Pentagon Securities</p>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Client Name
                    </h3>
                    <p className="text-base text-gray-900 font-semibold">Dolly L Oktollik</p>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Package Contents
                    </h3>
                    <p className="text-base text-gray-900 font-semibold">Family Treasure (Secure Box)</p>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Shipping Service
                    </h3>
                    <p className="text-base text-gray-900 font-semibold">Priority Vault Transport</p>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      Weight & Dimensions
                    </h3>
                    <p className="text-base text-gray-900 font-semibold">24.5 kg / 18" x 12" x 10"</p>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Clearance Status
                    </h3>
                    <p className="text-base text-green-600 font-semibold">Customs Cleared</p>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Insured Value
                    </h3>
                    <p className="text-base text-gray-900 font-semibold">Undisclosed (Class A)</p>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Handling
                    </h3>
                    <p className="text-base text-gray-900 font-semibold">Highly Fragile / Armed Escort</p>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Destination Address
                    </h3>
                    <p className="text-base text-gray-900 font-semibold">Pending Local Facility</p>
                 </div>
              </div>
            </div>

            <div className="mt-12 border-t border-gray-100 pt-8">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Transit Route</h2>
              <div className="relative border-l-2 border-gray-200 ml-3 md:ml-4 space-y-6 mb-2">
                {[
                  { title: "Origin Port", location: "Jakarta" },
                  { title: "Regional Hub", location: "Singapore" },
                  { title: "Major Trans-Pacific Hub", location: "South Korea" },
                  { title: "North America West Coast", location: "Tacoma" },
                  { title: "Transit Port", location: "Port of Alaska" },
                  { title: "Destination Airport", location: "Point Hope Airport" }
                ].map((stop, index) => {
                  let dotColor = "bg-gray-300 ring-white";
                  let textColorTitle = "text-gray-400 font-medium";
                  let textColorLoc = "text-gray-400";
                  let ping = null;

                  if (index < locationIndex) {
                    dotColor = "bg-green-500 ring-white";
                    textColorTitle = "text-green-600 font-medium";
                    textColorLoc = "text-gray-900";
                  } else if (index === locationIndex) {
                    dotColor = "bg-blue-500 ring-blue-50 relative z-10";
                    textColorTitle = "text-blue-600 font-bold";
                    textColorLoc = "text-gray-900";
                    ping = <div className="absolute w-3 h-3 bg-blue-500 rounded-full animate-ping -left-[5px] top-1.5"></div>;
                  }

                  return (
                    <div key={index} className="relative pl-6">
                      {ping}
                      <div className={`absolute w-3 h-3 rounded-full -left-[5px] top-1.5 ring-4 ${dotColor}`}></div>
                      <p className={`text-xs uppercase tracking-wide mb-0.5 ${textColorTitle}`}>{stop.title}</p>
                      <p className={`text-base font-semibold ${textColorLoc}`}>{stop.location}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
          
          <button onClick={() => navigate(-1)} className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm">
             Back to Tracking
          </button>
        </div>
      </main>

      <footer className="shrink-0 bg-gray-100 border-t border-gray-200 py-4 text-gray-600 text-sm flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row gap-4 font-medium">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Statement</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Use</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
        </div>
        <p>© 2026 Pentagon Securities. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DetailsPage;