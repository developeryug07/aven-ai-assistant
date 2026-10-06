import { useState } from "react";
import { useEffect,useRef } from "react";
import "./App.css";
import { VscSend } from "react-icons/vsc";
import { URL } from "./constants";
import Answer from "./components/Answer";
import AvenLogo from "./components/AvenLogo";
import AvenIntro from "./components/AvenIntro";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [userName, setUserName] = useState("");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const[loading,setLoading]=useState(false);

  useEffect(() => {
  const handleMessage = (event) => {

    if (event.data?.type === "vismeForms:submitSuccess") {
      const submittedData = event.data.submitSuccessData;
    }
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, []);

  function changeHandler(event) {
    setQuestion(event.target.value);
  }

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };

  const askQuestion = async () => {
    if(!question){
      return false;
    }
    const currentQuestion=question;
    setResult((prev)=>[
      ...prev,{
        type:"q",
        text:currentQuestion,
      },
    ]);
      setQuestion("");
      setLoading(true);
    
    try{
    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error(" Sorry for the inconvinience caused ,Due to heavy request service unavailable at the moment .... Please try after some time ! ");
      }

    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;

     setResult((prev) => [
        ...prev,
        {
          type: "a",
          text: dataString,
        },
      ]);
    }
    
   catch (error) {

      setResult((prev) => [
        ...prev,
        {
          type: "error",
          text: "Sorry for the inconvinience caused ,Due to heavy request service unavailable at the moment .Please try after some time ....",
        },
      ]);
    } finally {
      setLoading(false);
    }

  };

  return (
    <>{showIntro ? (
  <AvenIntro
    setUserName={setUserName}
    setShowIntro={setShowIntro}
  />
) : (
   <div className="min-h-screen bg-[#f7f9fc] text-gray-900 flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-5 py-2.5 flex items-center gap-3">

         <AvenLogo />

<div>
  <h1 className="font-semibold text-lg">
    Aven
  </h1>
 <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Online
          </div>
  
</div >
<div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
           <p className="text-xs text-gray-500">
    Your AI companion
  </p>
  
</div >

         

        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">

       {result.length === 0 && (
  <div className="h-[58vh] flex flex-col items-center justify-center text-center">

    {/* Aven Animation */}
    
 <div className="w-40 h-54 mb-4 rounded-4xl overflow-hidden">
  <video
    src="/aven.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover object-[center_18%]"
  />
</div>

    <h2 className="text-2xl font-bold text-gray-800">
      How can I help you?
    </h2>

    <p className=" mt-2 text-gray-500 max-w-md">
      Ask Aven anything. Learn, explore ideas,
      solve problems, or just have a conversation.
    </p>

  </div>
)}

        <div className="space-y-6">

          {result.map((item, index) => (

            item.type === "q" ? (

              /* USER MESSAGE */
              <div
                key={index}
                className="flex justify-end items-end gap-3"
              >
                  <div>
                       <p className="text-xs text-gray-400 text-right mb-1">
                        {`${userName} (You)`}
                      </p>

      <div className="flex justify-end ml-15">
  <div className="w-fit max-w-[450px] bg-blue-700 text-white px-5 py-3 rounded-2xl rounded-br-md shadow-sm">
    <p className="text-white font-normal break-words">
      {item.text}
    </p>
  </div>
</div>
              </div>

                 </div>

            ) : item.type === "a" ? (

              /* BOT MESSAGE */
              <div className="flex items-start gap-3 ">

           <AvenLogo size="w-9 h-9 shrink-0" />

    <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">
           Aven
            </p>

         <div className="bg-white border border-gray-200 shadow-sm px-5 py-4 rounded-2xl rounded-tl-md">
           <Answer ans={item.text} />
          </div>
       </div>

       </div>
            ) : (

              /* ERROR MESSAGE */
              <div
                key={index}
                className="flex items-start gap-3"
              >

                <div className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center">
                  ⚠️
                </div>

                <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-3 rounded-2xl w-fit max-w-[85%] md:max-w-[500px]">
                  {item.text}
                </div>

              </div>

            )

          ))}

          {/* Loading */}
          {loading && (
  <div className="flex items-start gap-3">

    <AvenLogo size="w-9 h-9" />

    <div>
      <p className="text-xs font-semibold text-gray-500 mb-1">
        Aven
      </p>

      <div className="bg-white border border-gray-200 shadow-sm px-5 py-4 rounded-2xl rounded-tl-md">

        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>

          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>

          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>

      </div>
    </div>

  </div>
)}

        </div>
      </main>

      {/* Input */}
      <footer className="sticky bottom-0 bg-gradient-to-t from-[#f7f9fc] via-[#f7f9fc] to-transparent pt-6 pb-5">

        <div className="max-w-4xl mx-auto px-4">

          <div className="bg-white border border-gray-200 shadow-lg shadow-gray-200/50 rounded-2xl p-2 flex items-center gap-2 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 transition">

            <input
              type="text"
              value={question}
              onChange={changeHandler}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  askQuestion();
                }
              }}
              placeholder="Ask Aven anything..."
              className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-800 placeholder:text-gray-400"
            />

            <button
              onClick={askQuestion}
              disabled={loading}
             className="w-12 h-12 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shadow-sm hover:bg-[#1d4ed8] active:scale-95 transition disabled:opacity-50"
            >
              <VscSend size={19} />
            </button>

          </div>

          <p className="text-center text-[11px] text-gray-400 mt-3">
            AI can make mistakes. Check important information.
          </p>

        </div>

      </footer>

    </div>
   )}
  </>
);
}

export default App;