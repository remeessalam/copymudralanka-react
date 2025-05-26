import { PiCaretUpBold } from "react-icons/pi";

const ScrollToTopButton = () => {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo(0, 0)}
      className="scroll-to-target scroll-to-top"
      style={{ cursor: "pointer" }}
    >
      <PiCaretUpBold size={20} />
    </button>
  );
};

export default ScrollToTopButton;
