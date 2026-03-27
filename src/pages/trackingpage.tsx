import { useState } from "react";
import { useNavigate } from "react-router-dom";
import targetIcon from "../assets/target.png";
import questionIcon from "../assets/questionmark.png";
import rightIcon from "../assets/chevronright.png";
import pentagonLogo from "../assets/pentagonlogo.png";

const QuestionModal = () => {
  return (
    <dialog 
      className="modal" 
      id="question-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          (document.getElementById("question-modal") as HTMLDialogElement)?.close();
        }
      }}
    >
      <div className="modal-box p-0 overflow-hidden bg-white shadow-xl rounded-xl max-w-sm">
        {/* Title Bar with Cancel Button */}
        <div className="bg-gray-100 flex justify-between items-center px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-600">Tracking Number or Pickup Reference</h2>
          <form method="dialog">
            <button className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Tracking Number
The tracking number is a unique code assigned to a shipment for monitoring its journey.

If you shipped the package, you can find this number in the confirmation email you received when you scheduled the shipment.

If you are expecting a package, you will need to ask the sender for this number.

Pickup Reference
The pickup reference is assigned to a shipment once it has been successfully delivered to the pickup location. For in-person pickups, the recipient must have this reference to collect the package.

If you shipped the package, you can find this number in the email you received when the package arrived at the pickup location.

If you are expecting a package, you will need to ask the sender for this number.
          </p>
        </div>

        {/* Wide Rounded Close Button */}
        <div className="px-6 pb-6 mt-2 font-medium">
          <form method="dialog">
            <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-full transition-colors text-base font-semibold">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    const cleanedId = trackingId.replace(/\s+/g, '');

    if (!cleanedId) {
      setError("Please enter a tracking number.");
      return;
    }

    if (/[^0-9]/.test(cleanedId)) {
      setError("Wrong code: Tracking number should only contain digits.");
      return;
    }

    if (cleanedId.length < 9) {
      setError("Wrong code.");
      return;
    }

    if (cleanedId.length > 9) {
      setError("Wrong code: Tracking number cannot exceed 9 digits.");
      return;
    }

    // Parse the exactly 9 digits: MM(2) DD(2) YY(2) S(1) R(1) Echo(1)
    const month = parseInt(cleanedId.substring(0, 2), 10);
    const date = parseInt(cleanedId.substring(2, 4), 10);
    const year = parseInt(cleanedId.substring(4, 6), 10);
    const stageRaw = parseInt(cleanedId.substring(6, 7), 10);
    const random = cleanedId.substring(7, 8);
    
    if (month < 1 || month > 12) {
      setError("Wrong code.");
      return;
    }
    if (date < 1 || date > 31) {
      setError("Wrong code.");
      return;
    }

    if (!lastName.trim()) {
      setError("Incomplete: Please enter your last name.");
      return;
    }

    // Security Check: "Echo Rule"
    // The very last digit (9th digit) must precisely match the stage digit (6th digit)
    const secureEndDigit = parseInt(cleanedId.substring(8, 9), 10);
    if (secureEndDigit !== stageRaw) {
      setError("Wrong code.");
      return;
    }

    // Clamp stage between 1 and 4 for our progress UI
    const stage = Math.max(1, Math.min(4, stageRaw));

    // Validation passed, mock verification wait then navigate
    setIsLoading(true);
    setTimeout(() => {
      navigate("/details", {
        state: {
          trackingId: cleanedId,
          month,
          date,
          year: 2000 + year, 
          stage,
          random,
          lastName
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden w-full">
      <header className="shrink-0 relative z-10">
        <nav className="bg-white flex items-center justify-center md:justify-start px-6 h-16 shadow-sm md:shadow-none border-b border-gray-200 md:border-b-[3px] md:border-blue-600">
          <div className="flex flex-row items-center gap-1.5">
            <img
              className="w-16 h-16 object-contain"
              src={pentagonLogo}
              alt="Pentagon Securities Logo"
            />
            <span className="text-xl font-bold tracking-tight text-gray-800 uppercase">
              Pentagon Securities
            </span>
          </div>
        </nav>
      </header>

      <main className="bg-gray-100 flex-1 w-full overflow-y-auto">
        <form onSubmit={handleTrack} className="max-w-5xl mx-auto p-4 md:p-8">
          <div className="flex flex-row gap-2 items-center justify-start pb-4">
            <img className="w-6 h-6 object-contain" src={targetIcon} alt="target" />
            <p className="text-3xl font-medium text-gray-600">Track</p>
          </div>

          <hr className="border-gray-300 mb-8" />

          {/* White Card Container */}
          <div className="bg-white rounded-xl p-6 md:p-10 flex flex-col md:flex-row md:items-start gap-8">
            
            {/* Left side: Text */}
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-2xl font-semibold text-gray-900">
                Look up a shipment or a package:
              </p>
              <p className="text-[15px] font-normal text-gray-600 leading-relaxed mt-1">
                Find the status of any shipment or package by entering its tracking number or pickup reference, and your last name.
              </p>
            </div>

            {/* Right side: Input Boxes */}
            <div className="md:w-1/2 flex flex-col gap-5 w-full">
              <div className="relative">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full h-12 bg-white border border-gray-300 rounded-md p-3 pr-10 placeholder:text-gray-400 placeholder:text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-300 text-gray-800"
                  placeholder="Tracking Number or Pickup Reference #"
                />
                <button
                  type="button"
                  onClick={() =>
                    (
                      document.getElementById(
                        "question-modal",
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                  className="absolute right-3 top-3 focus:outline-none opacity-60 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={questionIcon}
                    alt="question"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-12 bg-white border border-gray-300 rounded-md p-3 placeholder:text-gray-400 placeholder:text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-300 text-gray-800"
                placeholder="Your last name"
              />
            </div>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex">
                <div className="shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-semibold">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Separate Track Button block down below with ReCaptcha */}
          <div className="mt-10 flex flex-col-reverse md:flex-row md:items-center justify-between gap-6">
            
            {/* ReCaptcha Block */}
            <div className="flex flex-col items-center md:items-start opacity-70 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-6 h-6 object-contain" alt="reCAPTCHA" />
                <p className="text-xs text-gray-500 font-medium tracking-wide">Protected by reCAPTCHA</p>
              </div>
              <div className="flex gap-2 text-[10px] text-gray-400 mt-1 pl-8">
                <a href="#" className="hover:underline">Privacy</a>
                <span>-</span>
                <a href="#" className="hover:underline">Terms</a>
              </div>
            </div>

            {/* Track Button */}
            <button disabled={isLoading} type="submit" className={`w-full md:w-auto md:min-w-[180px] h-12 py-3 px-8 text-white font-bold rounded-lg transition-colors text-[17px] shadow-md ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 cursor-pointer'}`}>
              <div className="flex flex-row gap-2 items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Verifying...</p>
                  </>
                ) : (
                  <>
                    <p>Track</p>
                    <img className="w-5 h-5 object-contain" src={rightIcon} alt="track" />
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      </main>

      <footer className="shrink-0 bg-gray-100 border-t border-gray-200 py-4 text-gray-600 text-sm flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row gap-4 font-medium">
          <a href="#" onClick={(e) => { e.preventDefault(); (document.getElementById('legal-modal') as HTMLDialogElement)?.showModal(); }} className="hover:text-blue-600 transition-colors">Privacy Statement</a>
          <span className="text-gray-300">|</span>
          <a href="#" onClick={(e) => { e.preventDefault(); (document.getElementById('legal-modal') as HTMLDialogElement)?.showModal(); }} className="hover:text-blue-600 transition-colors">Terms of Use</a>
          <span className="text-gray-300">|</span>
          <a href="#" onClick={(e) => { e.preventDefault(); (document.getElementById('legal-modal') as HTMLDialogElement)?.showModal(); }} className="hover:text-blue-600 transition-colors">Cookies</a>
        </div>
        <p>© 2026 Pentagon Securities. All rights reserved.</p>
      </footer>

      <QuestionModal />

      <dialog className="modal" id="legal-modal" onClick={(e) => { if (e.target === e.currentTarget) { (document.getElementById("legal-modal") as HTMLDialogElement)?.close(); } }}>
        <div className="modal-box p-6 bg-white shadow-xl rounded-xl max-w-sm">
          <h3 className="font-bold text-lg text-gray-800">Secure Document Access</h3>
          <p className="py-3 text-gray-600 text-sm">The requested legal document is currently encrypted for transmission.</p>
          <p className="pb-4 text-gray-600 text-sm">Please verify your identity at a local branch to review these terms.</p>
          <div className="modal-action mt-2">
            <form method="dialog">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Acknowledge</button>
            </form>
          </div>
        </div>
      </dialog>
    </div >
  );
};

export default TrackingPage;
