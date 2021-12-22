import React, { useState } from "react";

const ScrollOnMountDiv: React.FC = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  return (
    <div
      ref={(element: HTMLDivElement | null) => {
        if (element && !hasScrolled) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          setHasScrolled(true);
        }
      }}
    >
      {children}
    </div>
  );
};

export default ScrollOnMountDiv;
