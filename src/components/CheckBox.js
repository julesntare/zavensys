import React from "react";

const CheckBox = ({ label, checked, onChange }) => {
  return (
    <div className="flex justify-center">
      <div>
        <div className="form-check">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label inline-block text-gray-800">
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
