import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- SVG Icon Component ---
// This is used for the upload icon.
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

const ICONS = {
  upload:
    "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5A2.25 2.25 0 008.25 22.5h7.5A2.25 2.25 0 0018 20.25V8.25L10.5 1.5zM12 12.75a.75.75 0 01.75.75v3.19l1.47-1.47a.75.75 0 111.06 1.06l-2.75 2.75a.75.75 0 01-1.06 0l-2.75-2.75a.75.75 0 111.06-1.06l1.47 1.47v-3.19a.75.75 0 01.75-.75z",
};

// --- The Input Screen Component ---
// This is the main component for the box you highlighted.
// It takes one prop: `onAnalyze`, a function to call when the button is clicked.
export const GetStarted = () => {
  const [activeTab, setActiveTab] = useState("paste"); // Changed default to "paste"
  const [textContent, setTextContent] = useState(""); // Track textarea content
  const [selectedSample, setSelectedSample] = useState(null); // Track selected sample
  const navigate = useNavigate();

  // Predefined text options
  const predefinedTexts = [
    {
      id: 1,
      title: "Employment Contract",
      type: "employment",
      content: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on [DATE] between TechCorp Industries Inc. ("Company") and [EMPLOYEE NAME] ("Employee").

1. COMPENSATION AND BENEFITS STRUCTURE
Employee shall receive an annual base salary of $85,000, payable in bi-weekly installments, subject to applicable withholdings and deductions. In addition to base compensation, Employee shall be eligible for performance-based bonuses not exceeding 20% of annual salary, contingent upon achievement of predetermined quarterly objectives and overall company profitability metrics as determined by the Board of Directors.

2. CONFIDENTIALITY AND NON-DISCLOSURE OBLIGATIONS  
Employee acknowledges that during the course of employment, they will have access to confidential information, trade secrets, proprietary methodologies, client databases, financial records, and strategic business plans ("Confidential Information"). Employee agrees to maintain strict confidentiality regarding all such information both during employment and for a period of five (5) years following termination, regardless of the reason for separation.

3. NON-COMPETE AND NON-SOLICITATION RESTRICTIONS
For a period of eighteen (18) months following termination of employment, Employee shall not directly or indirectly engage in, own, manage, operate, control, be employed by, participate in, or be connected with any business that competes with Company's core services within a 50-mile radius of Company's primary office locations. Additionally, Employee shall not solicit, recruit, or hire any current Company employees or attempt to divert Company clients for personal or third-party benefit.

4. INTELLECTUAL PROPERTY ASSIGNMENT AND WORK-FOR-HIRE
All inventions, discoveries, improvements, processes, techniques, know-how, and intellectual property created, conceived, or developed by Employee during employment, whether during regular business hours or otherwise, that relate to Company's business or result from access to Company resources, shall be deemed "work made for hire" and shall be the exclusive property of Company. Employee agrees to execute all documents necessary to perfect Company's ownership rights.

5. TERMINATION CONDITIONS AND SEVERANCE PROVISIONS
Either party may terminate this Agreement with thirty (30) days written notice. In cases of termination without cause by Company, Employee shall receive severance pay equal to three (3) months base salary, continuation of health benefits for ninety (90) days, and reasonable outplacement services. Termination for cause, including but not limited to breach of confidentiality, insubordination, or criminal conviction, shall result in immediate termination without severance compensation.

This Agreement shall be governed by the laws of [STATE] and any disputes shall be resolved through binding arbitration.

Signed: ____________________
Employee                Date

Signed: ____________________  
Company Representative    Date`
    },
    {
      id: 2,
      title: "Rental Lease Agreement",
      type: "rental",
      content: `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement ("Lease") is executed on [DATE] between Metropolitan Properties LLC ("Landlord") and [TENANT NAME] ("Tenant") for the rental property located at 1247 Maple Street, Apt 3B, Springfield, [STATE] ("Premises").

1. RENT PAYMENT AND LATE FEE STRUCTURE
Monthly rent of $2,850 is due on the first day of each month, with a grace period until the 5th day. Late payments shall incur a fee of $150 plus 1.5% monthly interest on the outstanding balance. Rent payments must be made via electronic transfer, certified check, or money order. Personal checks will not be accepted after any instance of insufficient funds. Security deposit of $4,275 (equivalent to 1.5 months rent) is required upon lease execution and shall be held in an interest-bearing escrow account.

2. PROPERTY MAINTENANCE AND REPAIR RESPONSIBILITIES
Landlord shall maintain structural integrity, plumbing, electrical systems, heating/cooling systems, and exterior maintenance. Tenant is responsible for interior maintenance, including but not limited to: cleaning, minor repairs under $100, light fixture bulb replacement, air filter changes, and maintaining smoke detector batteries. Tenant must report maintenance issues within 48 hours of discovery. Failure to report issues promptly may result in Tenant liability for consequential damages.

3. OCCUPANCY LIMITATIONS AND GUEST RESTRICTIONS
Premises shall be occupied solely by Tenant and approved household members listed in this agreement, not to exceed four (4) persons total. Guests may stay for a maximum of fourteen (14) consecutive days or thirty (30) cumulative days per calendar year. Extended guest stays require written Landlord approval and may be subject to additional fees. Unauthorized occupancy constitutes a material breach of lease terms and may result in immediate eviction proceedings.

4. PET POLICY AND ASSOCIATED FEES
No pets are permitted on the Premises without prior written consent from Landlord. If approved, Tenant shall pay a non-refundable pet fee of $500 per animal, plus monthly pet rent of $75 per animal. Tenant shall provide proof of renter's insurance with minimum $100,000 liability coverage naming Landlord as additional insured. Any pet-related damage beyond normal wear and tear shall be Tenant's responsibility and may exceed security deposit amount.

5. LEASE TERMINATION AND EARLY DEPARTURE CONDITIONS
This lease term is for twelve (12) months beginning [START DATE] and ending [END DATE]. Early termination by Tenant requires ninety (90) days written notice and payment of early termination fee equal to two (2) months rent. Landlord may terminate lease immediately for non-payment of rent, material lease violations, illegal activities, or property damage. Upon termination, Tenant must return Premises in original condition, reasonable wear and tear excepted, and provide forwarding address for security deposit disposition within thirty (30) days.

This Agreement is governed by [STATE] residential landlord-tenant laws.

Signed: ____________________
Tenant                   Date

Signed: ____________________
Landlord                 Date`
    },
    {
      id: 3,
      title: "Asset Purchase Agreement",
      type: "asset",
      content: `ASSET PURCHASE AGREEMENT

This Asset Purchase Agreement ("Agreement") is made on [DATE] between Digital Solutions Enterprise Corp. ("Seller") and Innovative Tech Holdings LLC ("Buyer") regarding the purchase of specified business assets.

1. PURCHASE PRICE AND PAYMENT TERMS STRUCTURE
The total purchase price for all assets described herein is $750,000 ("Purchase Price"), payable as follows: (a) $150,000 earnest money deposit upon execution of this Agreement, held in escrow by [ESCROW AGENT]; (b) $300,000 at closing via wire transfer or certified funds; and (c) $300,000 in seller financing over thirty-six (36) months at 6.5% annual interest, secured by the purchased assets and personal guarantees from Buyer's principals.

2. ASSET IDENTIFICATION AND CONDITION WARRANTIES
Assets included in this sale comprise: customer databases and contact lists, proprietary software applications, trademark registrations, domain names, equipment inventory, vendor contracts, and goodwill associated with the business operations. Seller warrants that all assets are free from liens, encumbrances, and third-party claims, and that software assets do not infringe upon existing intellectual property rights. Buyer shall have thirty (30) days for due diligence inspection and may terminate this Agreement with cause during such period.

3. REPRESENTATIONS, WARRANTIES AND INDEMNIFICATION
Seller represents that it has full legal authority to sell the assets, that all financial statements provided are accurate and complete, and that there are no pending legal proceedings affecting the assets. Seller warrants that customer relationships are transferable and that no key customers have indicated intent to terminate relationships. Seller agrees to indemnify Buyer against losses arising from pre-closing liabilities, misrepresentations, or undisclosed obligations for a period of twenty-four (24) months post-closing, with maximum liability not to exceed the Purchase Price.

4. NON-COMPETE AND TRANSITION ASSISTANCE PROVISIONS
Seller agrees not to compete directly or indirectly with the purchased business operations within a 100-mile radius for a period of five (5) years following closing. Seller shall provide reasonable transition assistance for ninety (90) days post-closing, including customer introductions, operational training, and system familiarization. Key Seller personnel shall be available for consulting services at standard industry rates during the transition period.

5. CLOSING CONDITIONS AND RISK ALLOCATION
Closing shall occur within sixty (60) days of Agreement execution, contingent upon: (a) satisfactory completion of due diligence; (b) receipt of necessary third-party consents; (c) delivery of clear title to all assets; and (d) execution of all ancillary documents. Risk of loss for physical assets transfers to Buyer upon closing. Any material adverse changes to the business between Agreement execution and closing shall provide Buyer with termination rights and full refund of earnest money deposit.

This Agreement shall be governed by [STATE] commercial law and disputes resolved through binding arbitration.

Signed: ____________________
Seller Representative    Date

Signed: ____________________  
Buyer Representative     Date`
    }
  ];

  // Function to handle sample text selection
  const handleSampleClick = (content, sample) => {
    setTextContent(content);
    setSelectedSample(sample);
  };

  // Function to handle analyze button click
  const handleAnalyzeClick = () => {
    if (selectedSample) {
      navigate('/Chat', { 
        state: { 
          selectedSample: selectedSample,
          content: textContent 
        } 
      });
    } else {
      // If no sample selected, just navigate normally
      navigate('/Chat');
    }
  };

return (
    // Wrapper to center the component on the page with a white background
    <div className="h-screen bg-white flex items-center justify-center p-6 pt-24 pb-6 font-sans">
        {/* The main container card */}
        <div className="w-full max-w-3xl bg-white text-gray-800 p-8 rounded-2xl border border-gray-300 shadow-2xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] animate-[fadeInScale_0.8s_ease-out]">
            {/* Tab buttons for Upload File / Paste Text */}
            <div className="flex border-b border-gray-300 mb-6 animate-[slideInLeft_0.6s_ease-out_0.2s_both]">
                <button
                    onClick={() => setActiveTab("upload")}
                    className={`px-6 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 ${
                        activeTab === "upload"
                            ? "text-gray-900 border-b-2 border-blue-500"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    Upload File
                </button>
                <button
                    onClick={() => setActiveTab("paste")}
                    className={`px-6 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 ${
                        activeTab === "paste"
                            ? "text-gray-900 border-b-2 border-blue-500"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    Paste Text
                </button>
            </div>

            {/* Conditional rendering based on the active tab */}
            {activeTab === "upload" ? (
                // File Upload Area
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
                    <Icon
                        path={ICONS.upload}
                        className="w-16 h-16 mx-auto text-gray-400 animate-bounce"
                    />
                    <p className="mt-4 text-gray-700 font-semibold">
                        Drag & drop your PDF, DOCX, or TXT file here
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        or <span className="text-blue-500 font-medium">browse files</span>
                    </p>
                </div>
            ) : (
                // Text Paste Area with Sample Options
                <div className="animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
                    {/* Read-only Textarea with instruction */}
                    <textarea
                        value={textContent || "Please choose from the sample documents below for the time being"}
                        readOnly
                        className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed focus:outline-none resize-none transition-all duration-300"
                        placeholder="Please choose from the sample documents below..."
                    ></textarea>
                    
                    {/* Sample Text Options */}
                    <div className="mt-6 animate-[slideInRight_0.8s_ease-out_0.6s_both]">
                        <p className="text-gray-700 font-semibold mb-4">
                            Choose from these sample documents:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {predefinedTexts.map((textOption, index) => (
                                <button
                                    key={textOption.id}
                                    onClick={() => handleSampleClick(textOption.content, textOption)}
                                    className={`p-4 border border-gray-300 bg-white rounded-lg text-left hover:border-blue-400 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:scale-[1.02] hover:shadow-md animate-[fadeInUp_0.6s_ease-out_${0.8 + index * 0.1}s_both]`}
                                >
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                                        {textOption.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Click to use this sample
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Analyze Button */}
            <button
                onClick={handleAnalyzeClick}
                className="mt-8 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-800 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-[fadeInBounce_0.8s_ease-out_1.2s_both]"
            >
                Summarise
            </button>
        </div>
    </div>
);
};

