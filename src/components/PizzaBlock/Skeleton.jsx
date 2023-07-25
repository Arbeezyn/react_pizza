import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="150" r="125" />
    <rect x="0" y="292" rx="10" ry="10" width="280" height="23" />
    <rect x="-1" y="323" rx="10" ry="10" width="280" height="95" />
    <rect x="2" y="439" rx="10" ry="10" width="95" height="30" />
    <rect x="121" y="438" rx="10" ry="10" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
