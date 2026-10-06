import { useEffect } from "react";

const AvenIntro = ({ setUserName, setShowIntro }) => {
  useEffect(() => {
    const handleMessage = (event) => {

      if (event.data?.type === "vismeForms:submitSuccess") {
        const submittedData = event.data.submitSuccessData;

        const name =
          submittedData?.[0]?.value?.firstName?.value;

        if (name) {
          setUserName(name);
          setShowIntro(false);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setUserName, setShowIntro]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://static-bundles.visme.co/forms/vismeforms-embed.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div
        className="visme_d w-full"
        data-title="Aven starting animation"
        data-url="e0m6ngdm-aven-starting-animation"
        data-domain="forms"
        data-full-page="false"
        data-min-height="400px"
        data-form-id="202474"
      ></div>
    </div>
  );
};

export default AvenIntro;