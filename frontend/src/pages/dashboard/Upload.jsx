import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold text-purple-500 mb-8">
        Upload Bank Statement
      </h1>

      <div className="bg-slate-900 p-8 rounded-2xl shadow-lg max-w-xl">
        <p className="text-gray-300 mb-6">
          Upload your bank statement (PDF, CSV, Image)
        </p>

        <input
          type="file"
          accept=".pdf,.csv,.jpg,.png"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

        {file && (
          <p className="text-green-400 mb-4">
            Selected: {file.name}
          </p>
        )}

        <button className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700 transition">
          Analyze Statement
        </button>
      </div>
    </div>
  );
}

export default Upload;