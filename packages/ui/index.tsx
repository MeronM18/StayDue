import React from "react";

export const Button = (props: { 
  label: string; 
  onClick?: () => void; 
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {props.label}
    </button>
  );
};

