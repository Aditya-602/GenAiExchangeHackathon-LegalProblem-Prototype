import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from 'lucide-react';

// Helper component for SVG icons
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d={path} />
    </svg>
);

// SVG Paths for icons
const ICONS = {
    menu: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
    plus: "M12 4.5v15m7.5-7.5h-15",
    help: "M9.879 7.519c0-1.048.853-1.9 1.9-1.9s1.9.852 1.9 1.9c0 .786-.473 1.46-1.148 1.765a2.93 2.93 0 00-.752.518v.547h-.02a.75.75 0 01-.75-.75v-.416c0-.25.04-.492.117-.718.156-.457.47-1.037.92-1.442.22-.197.35-.395.35-.611 0-.304-.247-.55-.55-.55s-.55.246-.55.55a.75.75 0 01-1.5 0zM12 15.75a.75.75 0 00.75-.75v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 00.75.75zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z",
    activity: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    settings: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.213-1.28zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z",
    user: "M17.921 15.842A7.501 7.501 0 0012 15a7.5 7.5 0 00-5.921.842M12 6a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z",
    gemini: "M15.182 15.182a4.5 4.5 0 01-6.364 0 4.5 4.5 0 010-6.364l6.364 6.364zM12 2.25A9.75 9.75 0 0121.75 12a9.75 9.75 0 01-9.75 9.75A9.75 9.75 0 012.25 12 9.75 9.75 0 0112 2.25zM8.818 8.818a4.5 4.5 0 016.364 0 4.5 4.5 0 010 6.364L8.818 8.818z",
    send: "M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z",
    bulb: "M12 18a.75.75 0 01-.75-.75V15.75a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM12 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 12.75a.75.75 0 00.75-.75v-.01a.75.75 0 00-1.5 0v.01c0 .414.336.75.75.75zM10.5 14.25a.75.75 0 00.75.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 00-.75.75z",
    compass: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 15a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zm0-2.25a3 3 0 100-6 3 3 0 000 6z",
    code: "M10.5 6h-3a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 007.5 18h3a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6zM16.5 6h-3a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5z"
};

export const Chat = () => {
    // Replace 'YOUR_API_KEY_HERE' with your actual Gemini API key
    const apiKey = '';
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [usedSamples, setUsedSamples] = useState([]);
    const [currentSampleData, setCurrentSampleData] = useState(null);

    const chatEndRef = useRef(null);

    // Generate responses based on contract type
    const generateSampleSpecificResponse = (sampleType) => {
        const responses = {
            employment: `I've analyzed your Employment Contract. Here's what I found:

**Key Legal Provisions:**
• **Complex Compensation Structure**: Base salary of $85,000 plus performance bonuses up to 20% creates variable income dependent on company metrics
• **Extensive Confidentiality Terms**: 5-year post-employment confidentiality period is longer than typical and broadly covers trade secrets and client data
• **Non-Compete Restrictions**: 18-month restriction within 50-mile radius may limit future employment opportunities in your field
• **IP Assignment Clause**: "Work-for-hire" provision means any inventions during employment become company property, even outside business hours
• **Severance Protection**: 3-month severance for no-cause termination provides some financial security

**Simplified Summary:**
This employment contract offers competitive compensation but includes restrictive post-employment obligations. The non-compete and confidentiality clauses significantly limit your future career flexibility in exchange for job security and severance protection.

**Important Considerations:**
• Negotiate the non-compete period and geographic scope if possible
• Clarify what constitutes "company resources" for IP assignment
• Understand that performance bonuses are discretionary, not guaranteed
• Review termination definitions to avoid losing severance benefits

Would you like me to explain any specific clause in more detail?`,

            rental: `I've analyzed your Rental Lease Agreement. Here's what I found:

**Key Financial Terms:**
• **High Rent Structure**: $2,850/month with $4,275 security deposit (1.5x rent) plus steep late fees of $150 + 1.5% interest
• **Pet Costs**: $500 non-refundable fee plus $75/month per pet makes pet ownership expensive
• **Early Termination Penalty**: 2-month rent fee ($5,700) plus 90-day notice makes breaking lease costly
• **Payment Restrictions**: No personal checks allowed, electronic payments only after any bounced check

**Tenant Responsibilities:**
• **Maintenance Split**: You handle interior repairs under $100, landlord covers structural and major systems
• **Occupancy Limits**: Strict 4-person maximum with guest restrictions (14 consecutive days max)
• **Insurance Requirement**: Must carry $100,000 liability coverage naming landlord as additional insured

**Simplified Summary:**
This is a tenant-friendly lease in terms of maintenance responsibilities but financially restrictive with high deposits, steep penalties, and limited flexibility for guests or pets.

**Important Considerations:**
• Budget for potential late fees and early termination costs
• Document property condition at move-in to protect security deposit
• Understand guest policy to avoid violations
• Consider pet costs carefully if you have animals

What specific aspects of this lease would you like me to clarify?`,

            asset: `I've analyzed your Asset Purchase Agreement. Here's what I found:

**Purchase Structure Analysis:**
• **$750K Total Price**: $150K earnest money (20%) shows serious commitment, with balanced closing/$300K financing split
• **Seller Financing Terms**: 6.5% interest rate over 36 months creates ongoing relationship and cash flow obligations
• **Asset Package**: Comprehensive bundle including customer lists, software, trademarks, and goodwill provides complete business transfer
• **Due Diligence Rights**: 30-day inspection period with termination rights protects buyer from hidden issues

**Risk Allocation:**
• **Seller Warranties**: Full authority, accurate financials, and no pending litigation provide buyer protection
• **24-Month Indemnification**: Seller covers pre-closing liabilities up to purchase price amount, reasonable risk sharing
• **5-Year Non-Compete**: 100-mile radius restriction prevents seller from competing and protects buyer's investment

**Simplified Summary:**
This agreement balances buyer protection with seller cooperation through structured payments, comprehensive warranties, and transition assistance while managing risks through due diligence and indemnification.

**Critical Considerations:**
• Verify customer transferability and retention during due diligence
• Ensure all intellectual property rights are properly documented and transferable
• Review vendor contracts for assignment restrictions
• Budget for potential indemnification claims and transition costs

Would you like me to dive deeper into any specific aspect of this acquisition?`
        };

        return responses[sampleType] || `I've analyzed your legal document. Here's what I found:

**Key Points:**
• This is a comprehensive legal agreement with clear terms and conditions
• All parties' rights and responsibilities are clearly defined
• The document includes standard legal protections and clauses
• Payment terms and schedules are explicitly outlined
• Termination conditions are fair and reasonable

**Simplified Summary:**
This document establishes a formal relationship between the parties with clearly defined expectations, compensation, and termination procedures. All terms appear standard and reasonable for this type of agreement.

**Recommendations:**
• Review all dates and amounts to ensure accuracy
• Consider consulting with a legal professional for specific concerns
• Keep a signed copy for your records

Is there anything specific about this document you'd like me to explain further?`;
    };

    const handleSampleClick = useCallback((content, sampleId) => {
        setShowWelcome(false);
        setLoading(true);
        
        // Add this sample to used samples
        setUsedSamples(prev => [...prev, sampleId]);
        
        // Add user message to existing messages (preserve chat history)
        setMessages(prev => [...prev, { role: 'user', content: content }]);
        
        // Generate sample-specific response
        setTimeout(() => {
            const sampleType = currentSampleData?.type || 'default';
            const response = generateSampleSpecificResponse(sampleType);
            
            setMessages(prev => [...prev, { role: 'bot', content: response }]);
            setLoading(false);
        }, 2000); // 2 second delay to simulate processing
    }, [currentSampleData]);

    // Handle query button clicks
    const handleQueryClick = (query) => {
        setShowWelcome(false);
        setLoading(true);
        
        // Add this query to used samples (using query ID)
        setUsedSamples(prev => [...prev, query.id]);
        
        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: query.question }]);
        
        // Add bot response after delay
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', content: query.answer }]);
            setLoading(false);
        }, 1500);
    };

    // Handle incoming sample data from GetStarted component
    useEffect(() => {
        if (location.state?.selectedSample) {
            const sample = location.state.selectedSample;
            setCurrentSampleData(sample);
            setShowWelcome(false);
            
            // Don't auto-send the sample - just show the summary and questions
            // User can manually click on the sample questions
        }
    }, [location.state]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Predefined text samples (same as GetStarted)
    const predefinedTexts = [
        {
            id: 1,
            title: "Employment Contract",
            content: "This Employment Agreement is entered into between [Company Name] and [Employee Name]. The employee agrees to work full-time in the position of [Job Title] starting [Start Date]. The employee's annual salary shall be $[Amount] paid in bi-weekly installments. This agreement includes standard benefits including health insurance, dental coverage, and paid time off accruing at 2 weeks per year. Employment may be terminated by either party with two weeks written notice."
        },
        {
            id: 2,
            title: "Rental Lease Agreement",
            content: "This Lease Agreement is between [Landlord Name] as Landlord and [Tenant Name] as Tenant for the rental property located at [Property Address]. The lease term is for 12 months beginning [Start Date] and ending [End Date]. Monthly rent is $[Amount] due on the 1st of each month. Security deposit of $[Amount] is required upon signing. Tenant is responsible for utilities including electricity, gas, and internet. No pets allowed without written permission. Late rent fees of $50 apply after 5 days."
        },
        {
            id: 3,
            title: "Service Agreement",
            content: "This Service Agreement is between [Service Provider] and [Client Name] for [Description of Services]. Services will be provided starting [Start Date] and continuing for [Duration]. Total compensation for services is $[Amount] payable as follows: [Payment Terms]. The service provider agrees to complete work according to specifications and deadlines. Client agrees to provide necessary materials and information in a timely manner. Either party may terminate this agreement with 30 days written notice."
        }
    ];

    // Sample-specific document summaries
    const getDocumentSummary = (sampleType) => {
        const summaries = {
            employment: {
                title: "Employment Contract Analysis",
                points: [
                    "Complex compensation structure with base salary plus performance bonuses up to 20%",
                    "Strict 5-year confidentiality obligations extending beyond employment termination",
                    "18-month non-compete restriction within 50-mile radius of company locations",
                    "Comprehensive intellectual property assignment for all work-related creations",
                    "Detailed termination conditions with severance provisions for cause vs. no-cause scenarios",
                    "Binding arbitration clause for dispute resolution under state law",
                    "90-day health benefit continuation and outplacement services for qualified terminations"
                ]
            },
            rental: {
                title: "Rental Lease Agreement Analysis", 
                points: [
                    "Monthly rent $2,850 with 1.5x security deposit and electronic payment requirements",
                    "Detailed late fee structure: $150 plus 1.5% monthly interest after 5-day grace period",
                    "Clear maintenance responsibilities split between landlord (structural) and tenant (interior)",
                    "Strict occupancy limits of 4 persons with guest restrictions (14 consecutive/30 annual days)",
                    "Pet policy requiring $500 non-refundable fee plus $75 monthly rent per animal",
                    "Early termination requires 90-day notice and 2-month rent penalty payment",
                    "Security deposit held in interest-bearing escrow with 30-day return timeline"
                ]
            },
            asset: {
                title: "Asset Purchase Agreement Analysis",
                points: [
                    "$750,000 total purchase price with structured payment: $150K deposit, $300K at closing, $300K financing",
                    "Comprehensive asset package including customer data, software, trademarks, and goodwill",
                    "30-day due diligence period with buyer termination rights for material findings",
                    "24-month seller indemnification with liability cap at purchase price amount",
                    "5-year non-compete restriction within 100-mile radius with transition assistance",
                    "Risk allocation and closing conditions including third-party consent requirements",
                    "Seller financing terms at 6.5% annual interest secured by purchased assets"
                ]
            }
        };

        return summaries[sampleType] || {
            title: "Legal Document Summary",
            points: [
                "This is a standard legal agreement between the parties",
                "All parties' rights and responsibilities are clearly defined", 
                "The document includes standard legal protections and clauses",
                "Payment terms and schedules are explicitly outlined",
                "Termination conditions are fair and reasonable",
                "Standard legal protections for all parties involved",
                "Clear compensation structure and timeline outlined"
            ]
        };
    };

    // Get current document summary
    const documentSummary = currentSampleData 
        ? getDocumentSummary(currentSampleData.type)
        : getDocumentSummary(null);

    // Sample queries specific to each contract type
    const getSampleQueries = (sampleType) => {
        const queries = {
            employment: [
                {
                    id: 1,
                    question: "Can they fire me for any reason?",
                    answer: "Yes, non-compete clauses are often negotiable. You can request to reduce the 18-month period to 6-12 months, narrow the 50-mile geographic scope, or limit it to direct competitors only. Many employers are willing to compromise on these terms, especially for valuable candidates. Consider proposing exceptions for certain types of work or if you're terminated without cause."
                },
                {
                    id: 2,
                    question: "Do I get paid if I work extra hours?",
                    answer: "This contract's IP assignment clause is quite broad, stating that inventions created 'whether during regular business hours or otherwise' become company property if they relate to the business. However, you can negotiate to exclude inventions made entirely on your own time, with your own resources, and unrelated to company business. Request a specific carve-out for personal projects."
                },
                {
                    id: 3,
                    question: "What if I want to quit early?",
                    answer: "The performance bonus is discretionary and 'contingent upon achievement of predetermined quarterly objectives and overall company profitability.' This means it's not guaranteed - even if you meet your goals, the company can deny the bonus if overall profitability is poor. Ask for more specific, measurable criteria and consider negotiating a minimum guaranteed bonus percentage."
                }
            ],
            rental: [
                {
                    id: 1,
                    question: "Can my rent go up next year?",
                    answer: "The lease allows guests for maximum 14 consecutive days or 30 cumulative days per year. For longer stays, you need written landlord approval, which may include additional fees. Unauthorized extended stays could lead to eviction. If you anticipate longer visits, discuss this upfront and get any agreements in writing as a lease addendum."
                },
                {
                    id: 2,
                    question: "Who fixes things when they break?",
                    answer: "You're responsible for interior maintenance and repairs under $100, including cleaning, light bulb replacement, air filter changes, and smoke detector batteries. The landlord handles structural, plumbing, electrical, and HVAC systems. You must report issues within 48 hours or risk being liable for consequential damages. Keep records of all maintenance requests and responses."
                },
                {
                    id: 3,
                    question: "How do I get my deposit back?",
                    answer: "Early termination requires 90 days written notice plus a penalty equal to 2 months rent ($5,700). You'll also forfeit your security deposit unless the property is in perfect condition. Factor in potential costs for finding replacement housing and moving expenses. The total cost could easily exceed $10,000-12,000 depending on timing."
                }
            ],
            asset: [
                {
                    id: 1,
                    question: "What if it breaks right after I buy it?",
                    answer: "Customer retention risk is significant in asset purchases. The seller warrants that customer relationships are transferable and provides 90 days of transition assistance including customer introductions. However, if key customers leave, you have limited recourse beyond the 24-month indemnification period. Consider negotiating customer retention bonuses or escrow holdbacks tied to retention rates."
                },
                {
                    id: 2,
                    question: "Do I get a warranty with this?",
                    answer: "Yes, the seller provides 24-month indemnification for pre-closing liabilities, misrepresentations, and undisclosed obligations, capped at the $750K purchase price. The 30-day due diligence period is crucial - hire professionals to review financials, legal matters, and operational issues. Any problems discovered later may be covered by indemnification if not disclosed."
                },
                {
                    id: 3,
                    question: "Can I return it if I don't like it?",
                    answer: "The seller is restricted from competing within 100 miles for 5 years, which is quite protective. However, enforcement can be challenging and expensive. The agreement should specify exactly what constitutes 'competition' - direct business operations, consulting, or even employment with competitors. Consider adding liquidated damages clauses to make enforcement easier."
                }
            ]
        };

        return queries[sampleType] || [
            {
                id: 1,
                question: "What are the key terms I should understand?",
                answer: "The most important terms include payment obligations, termination conditions, each party's responsibilities, and any restrictions or limitations. Review dates, amounts, and deadlines carefully as these often have legal significance."
            },
            {
                id: 2,
                question: "Can I negotiate any of these terms?",
                answer: "Most contract terms are negotiable before signing. Focus on terms that seem unfair, unclear, or difficult to comply with. Common negotiation points include payment schedules, termination clauses, and liability limitations."
            },
            {
                id: 3,
                question: "What happens if I breach this contract?",
                answer: "Contract breaches can result in financial penalties, legal action, or termination of the agreement. Review the specific consequences outlined in the contract and consider whether you can realistically comply with all terms."
            }
        ];
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setShowWelcome(false);

        try {
            const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: userMessage }]
        }
      ]
    }),
  }
);

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const botResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';
            
            setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, there was an error processing your request. Please check your API key and try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-white flex items-center justify-center p-6 pt-24 pb-6 animate-[fadeInUp_0.8s_ease-out]">
            <div className="flex h-full w-full max-w-7xl bg-white text-gray-800 font-sans rounded-2xl border border-gray-300 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] animate-[slideInLeft_1s_ease-out_0.2s_both]">
                {/* Left Column - Document Summary */}
                <div className="w-1/3 border-r border-gray-300 p-6 overflow-y-auto animate-[slideInLeft_0.8s_ease-out_0.4s_both]">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">{documentSummary.title}</h2>
                        <div className="space-y-3">
                            {documentSummary.points.map((point, index) => (
                                <div key={index} className={`flex items-start gap-3 animate-[fadeInUp_0.5s_ease-out_${0.8 + index * 0.1}s_both]`}>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700 leading-relaxed text-left">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Chat Interface */}
                <div className="flex-1 flex flex-col h-full animate-[slideInRight_0.8s_ease-out_0.6s_both]">
                    <header className="flex items-center justify-between p-4 flex-shrink-0 border-b border-gray-300 animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl text-gray-900">Lexify AI</h1>
                        </div>
                        <div>
                            <button className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-110">
                               <Box path={ICONS.user} className="w-8 h-8 text-gray-700"/>
                            </button>
                        </div>
                    </header>

                <div className="flex-1 overflow-y-auto p-4 pb-24 relative">
                    {showWelcome && !currentSampleData ? (
                        <WelcomeScreen 
                            predefinedTexts={predefinedTexts} 
                            onSampleClick={handleSampleClick}
                        />
                    ) : currentSampleData && messages.length === 0 ? (
                        <SampleQuestions
                            currentSampleData={currentSampleData}
                            getSampleQueries={getSampleQueries}
                            onQueryClick={handleQueryClick}
                        />
                    ) : (
                        <div className="max-w-3xl mx-auto w-full">
                           {messages.map((msg, index) => (
                                <ChatMessage key={index} message={msg} />
                            ))}
                           {loading && <LoadingIndicator />}
                           {!loading && messages.length > 0 && currentSampleData && <RemainingQuestions 
                               currentSampleData={currentSampleData}
                               getSampleQueries={getSampleQueries}
                               usedSamples={usedSamples}
                               onQueryClick={handleQueryClick}
                           />}
                           <div ref={chatEndRef} />
                        </div>
                    )}
                </div>                    <div className="w-full flex justify-center flex-shrink-0 px-4">
                        {!loading && (
                            <div className="max-w-3xl w-full bg-gray-100 rounded-full flex items-center p-2 mb-4 shadow-lg border border-gray-200">
                                <textarea
                                    rows="1"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Ask questions about the document or use samples..."
                                    className="flex-grow bg-transparent p-2 text-lg focus:outline-none resize-none overflow-hidden text-gray-800 placeholder-gray-500"
                                    style={{ maxHeight: '120px' }}
                                />
                                 <button 
                                    onClick={handleSend} 
                                    disabled={!input.trim() || loading}
                                    className={`p-3 rounded-full transition-colors ${!input.trim() || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                                >
                                    <Icon path={ICONS.send} className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const WelcomeScreen = ({ predefinedTexts, onSampleClick }) => {
    // Default welcome screen for direct access (no selected sample)
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-6xl font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-8">Hello, User</h1>
            <p className="mt-4 text-2xl text-gray-600 mb-8">How can I help you today?</p>
            
            {/* Sample Text Options */}
            <div className="w-full max-w-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Choose a sample document to analyze:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {predefinedTexts.map((textOption) => (
                        <button
                            key={textOption.id}
                            onClick={() => onSampleClick(textOption.content, textOption.id)}
                            className="p-4 text-left bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-sm"
                        >
                            <h4 className="font-medium text-gray-900 text-sm mb-2">
                                {textOption.title}
                            </h4>
                            <p className="text-xs text-gray-600">
                                Click to analyze this sample
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RemainingQuestions = ({ currentSampleData, getSampleQueries, usedSamples, onQueryClick }) => {
    if (!currentSampleData) return null;
    
    const allQueries = getSampleQueries(currentSampleData.type);
    const remainingQueries = allQueries.filter(query => !usedSamples.includes(query.id));
    
    if (remainingQueries.length === 0) {
        return null; // No more questions to show
    }

    return (
        <div className="mt-8 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
                More questions about your {currentSampleData.type === 'employment' ? 'Employment Contract' : 
                currentSampleData.type === 'rental' ? 'Rental Lease Agreement' : 'Asset Purchase Agreement'} 
                ({remainingQueries.length} remaining):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {remainingQueries.map((query) => (
                    <button
                        key={query.id}
                        onClick={() => onQueryClick(query)}
                        className="p-4 text-left bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-300 text-sm shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                Q{query.id}
                            </span>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-2 leading-tight">
                            {query.question}
                        </h4>
                        <p className="text-xs text-gray-600">
                            Click for detailed guidance
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

const SampleOptions = ({ predefinedTexts, usedSamples, onSampleClick }) => {
    const availableSamples = predefinedTexts.filter(sample => !usedSamples.includes(sample.id));
    
    if (availableSamples.length === 0) {
        return null; // No more samples to show
    }

    return (
        <div className="mt-8 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Try another sample document ({availableSamples.length} remaining):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableSamples.map((textOption) => (
                    <button
                        key={textOption.id}
                        onClick={() => onSampleClick(textOption.content, textOption.id)}
                        className="p-3 text-left bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-300 text-sm shadow-sm"
                    >
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                            {textOption.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                            Click to analyze
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

const SampleQuestions = ({ currentSampleData, getSampleQueries, onQueryClick }) => {
    const queries = getSampleQueries(currentSampleData.type);
    const contractTypeNames = {
        employment: "Employment Contract",
        rental: "Rental Lease Agreement", 
        asset: "Asset Purchase Agreement"
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-5xl font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6">
                {contractTypeNames[currentSampleData.type]} Analysis
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                I've reviewed your contract. Here are some common questions you might have:
            </p>
            
            {/* Sample Query Options */}
            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {queries.map((query) => (
                        <button
                            key={query.id}
                            onClick={() => onQueryClick(query)}
                            className="p-6 text-left bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-lg hover:shadow-xl"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                    Q{query.id}
                                </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-base mb-3 leading-tight">
                                {query.question}
                            </h4>
                            <p className="text-sm text-gray-600">
                                Click to get detailed legal guidance
                            </p>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="mt-8">
                <p className="text-sm text-gray-500">
                    You can also ask your own questions using the chat input below
                </p>
            </div>
        </div>
    );
};

const SuggestionCard = ({ icon, text }) => (
    <div className="bg-[#1e1f20] p-4 rounded-xl hover:bg-gray-700 cursor-pointer transition-colors relative aspect-square flex flex-col justify-between">
        <p className="text-left text-gray-300">{text}</p>
        <div className="self-end bg-gray-800 p-2 rounded-full">
            <Icon path={icon} className="w-6 h-6 text-gray-400"/>
        </div>
    </div>
);

const ChatMessage = ({ message }) => {
    const { role, content } = message;
    const isUser = role === 'user';

    return (
        <div className={`flex gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-[slideInFade_0.6s_ease-out]`}>
            <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-pink-500' : 'bg-blue-500'} animate-[scaleIn_0.5s_ease-out_0.2s_both]`}>
                    <Icon path={isUser ? ICONS.user : ICONS.gemini} className="w-5 h-5 text-white" />
                </div>
                <div className={`px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                    isUser 
                        ? 'bg-transparent shadow-[0_0_15px_rgba(236,72,153,0.6)] border border-pink-200 ml-2 rounded-tr-md' 
                        : 'bg-transparent shadow-[0_0_15px_rgba(59,130,246,0.6)] border border-blue-200 mr-2 rounded-tl-md'
                }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-black">
                        {content.split('\n').map((line, i) => (
                            <div key={i} className={`${i > 0 ? 'mt-2' : ''}`}>
                                {line.startsWith('**') && line.endsWith('**') ? (
                                    <div className="font-semibold text-black mb-1">
                                        {line.replace(/\*\*/g, '')}
                                    </div>
                                ) : line.startsWith('•') ? (
                                    <div className="flex items-start gap-2 mb-1">
                                        <span className={`mt-1 ${isUser ? 'text-pink-600' : 'text-blue-600'}`}>•</span>
                                        <span className="text-black">{line.substring(1).trim()}</span>
                                    </div>
                                ) : line.trim() ? (
                                    <div className="text-black">{line}</div>
                                ) : (
                                    <div className="h-2"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoadingIndicator = () => (
    <div className="flex justify-start mb-6">
        <div className="flex gap-3 max-w-[80%]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center animate-pulse">
                <Icon path={ICONS.gemini} className="w-5 h-5 text-white" />
            </div>
            <div className="px-4 py-3 bg-gray-200 rounded-2xl rounded-tl-md mr-2">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-600 animate-bounce rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 animate-bounce rounded-full" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-600 animate-bounce rounded-full" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    </div>
);


