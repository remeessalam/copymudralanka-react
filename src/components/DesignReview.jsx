import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
const DesignReview = ({
  handleAddToCart,
  imagestored,
  exportHighResImage,
  setOpenConfirmation,
}) => {
  const [approved, setApproved] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [cardSide, setCardSide] = useState("front");
  console.log(imagestored, "asdfasdfasdfsadf");
  const handleApprovalChange = (checked) => {
    setApproved(checked);
    if (checked) {
      setShowWarning(false);
    }
  };

  const handleContinue = () => {
    handleAddToCart();
    // if (!approved) {
    //   setShowWarning(true);
    // } else {
    //   console.log("Design approved, continuing...");
    // }
  };

  return (
    <div className="review-container">
      {/* Left - Card Preview */}
      <div className="preview-panel">
        <div className="card-preview">
          <div className="card-content">
            {cardSide === "front" && (
              <div className="card-front">
                <div className="card-front-inner">
                  <div className="card-text">
                    <img src={imagestored} alt="seleted-image" />
                  </div>
                </div>
                <div className="bottom-image">
                  <div className="bottom-image-inner"></div>
                </div>
              </div>
            )}
            {/* {cardSide === "back" && (
              <div className="card-back">
                <span className="back-text">Back of card</span>
              </div>
            )} */}
          </div>
        </div>
        {/* <div className="card-toggle-buttons">
          <button
            className={`toggle-btn ${cardSide === "front" ? "active" : ""}`}
            onClick={() => setCardSide("front")}
          >
            Front
          </button>
          <button
            className={`toggle-btn ${cardSide === "back" ? "active" : ""}`}
            onClick={() => setCardSide("back")}
          >
            Back
          </button>
        </div> */}
      </div>

      {/* Right - Review Panel */}
      <div className="review-panel">
        <div className="review-header">
          <h1 className="review-title">Review your design</h1>
          <button
            className="review-close-btn"
            onClick={() => setOpenConfirmation(false)}
          >
            <X className="icon" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <p className="instruction">
          It will be printed like this preview. Make sure you're happy before
          continuing.
        </p>

        <ul className="review-checklist">
          <li>Are the text and images clear and easy to read?</li>
          <li>Do the design elements fit in the safety area?</li>
          <li>Does the background fill out to the edges?</li>
          <li>Is everything spelled correctly?</li>
        </ul>

        {showWarning && (
          <div className="warning-box">
            <AlertCircle className="warning-icon" />
            <p>Please confirm if you approve this design.</p>
          </div>
        )}

        <div className="review-actions">
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
          <button
            className="edit-btn"
            onClick={() => setOpenConfirmation(false)}
          >
            Edit my design
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignReview;
