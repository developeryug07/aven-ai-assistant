const AvenLogo = ({ size = "w-10 h-10" }) => {
  return (
    <div
      className={`${size} rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden`}
    >
      <img
        src="/aven-logo.png"
        alt="Aven"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default AvenLogo;