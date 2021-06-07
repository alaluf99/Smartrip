import React from "react";

export default function ErrorPage(props) {
  const { message } = props;

  return (
    <div>
      <h1>{message ? message : "There was an error"}</h1>
    </div>
  );
}
