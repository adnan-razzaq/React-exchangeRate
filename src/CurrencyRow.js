import React from "react";
export default function CurrencyRow({
  codes,
  onchangecurrency,
  selectedCurrency,
  Amount,
  handelInput,
}) {
  return (
    <div>
      <input
        className="w-64 p-4 mt-2 text-2xl border rounded-md border-solid border-teal-500 outline-none shadow-md"
        type="number"
        value={isNaN(Amount) ? 0 : Amount}
        onChange={handelInput}
      />
      <select
        value={selectedCurrency}
        onChange={onchangecurrency}
        className="ml-4 text-xl p-2 outline-none "
      >
        {codes.map((code, index) => (
          <option key={index} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
}
