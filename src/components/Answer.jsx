const Answer = ({ ans }) => {
  return (
    <div className="space-y-2">
      {ans.split("\n").map((line, index) => {

        // Heading: ### Heading
        if (line.startsWith("###")) {
          return (
            <h2
              key={index}
              className="text-lg font-bold text-gray-800 mt-4"
            >
              {line.replace(/^###\s*/, "")}
            </h2>
          );
        }

        // Horizontal line: ---
        if (line.trim() === "---") {
          return (
            <hr
              key={index}
              className="my-3 border-gray-200"
            />
          );
        }

        // Bullet point
        if (line.startsWith("- ")) {
          return (
            <li
              key={index}
              className="ml-5 text-gray-600 list-disc"
            >
              {line.replace(/^- /, "")}
            </li>
          );
        }

        // Bold text: **text**
        const parts = line.split("**");

        return (
          <p
            key={index}
            className="text-gray-800 leading-7"
          >
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong
                  key={i}
                  className="font-medium text-gray-900"
                >
                  {part}
                </strong>
              ) : (
                // Remove leftover single *
                part.replace(/\*/g, "")
              )
            )}
          </p>
        );
      })}
    </div>
  );
};

export default Answer;