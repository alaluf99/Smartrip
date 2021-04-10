import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoadingPage() {
  const pageStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    marginTop: "-50px",
    marginLeft: "-100px",
  };

  return (
    <div style={pageStyle}>
      <CircularProgress />
    </div>
  );
}
