import React, { useEffect, useState } from 'react';

export default function ToggleSwitch({ value, onChange }) {
  return (
    <div
      onClick={() => onChange()}
      className={`flex items-center h-5 w-10 rounded-full border-[1px] border-gray-500 transition-all ease-out duration-500 ${
        value ? 'bg-blue-500' : 'bg-gray-800'
      }`}
    >
      <span
        className={`flex items-center justify-center h-4 w-4 rounded-full transition-all ease-in-out duration-500 ${
          value ? 'ml-5 bg-gray-200' : 'bg-gray-200'
        }`}
      ></span>
    </div>
  );
}
