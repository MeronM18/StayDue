import React from "react";

export const Button = (props: { label: string; onClick?: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors"
    >
      {props.label}
    </button>
  );
};

