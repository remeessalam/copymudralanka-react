import React from "react";

const LocationMap = () => {
  return (
    <div className="google-map" id="home-google-map">
      <iframe
        title="google-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29288.838760432258!2d79.10232548968506!3d13.210703945516122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a345e58b50b6c47%3A0x4adcc9087e6ab1e2!2s17-132%2C%20Ponniamman%20Koil%20Street%2C%20Chittoor%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1614146356048!5m2!1sen!2sin"
        className="google-map__contact"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default LocationMap;
