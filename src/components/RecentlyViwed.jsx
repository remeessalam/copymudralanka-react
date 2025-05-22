import { Link } from "react-router-dom";
import { services } from "../constant";

const RecentlyViwed = ({ category }) => {
  return (
    <div className="section-threeContainer">
      <h3>Recently Viewed Items</h3>
      <div className="relatedproduct-container">
        {services.map((service) => (
          <div
            // to={service.path}
            key={service.title}
            className="col-5-col "
            style={{ display: category === service.title && "none" }}
          >
            <div className="service-two__single hvr-float-shadow content-margin-30">
              <img
                src={service.image}
                alt={service.title}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "1rem",
                  objectPosition: "top",
                }}
              />
              <p
                className="banner-service-title"
                style={{
                  border: "1px solid transparent",
                }}
              >
                {/* <Link to={service.path}> */}
                {service.title}
                {/* </Link> */}
              </p>
              <Link
                to={service.path}
                style={{ marginTop: "10px" }}
                className="service-four__link"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViwed;
