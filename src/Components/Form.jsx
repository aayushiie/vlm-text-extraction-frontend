import React, { useState, useEffect } from 'react';

const Form = () => {
  const [isDark, setIsDark] = useState(false)
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme =
        document.documentElement.getAttribute(
          "data-theme"
        )
      setIsDark(theme === "dark")
    }
    checkTheme()
    const observer = new MutationObserver(
      checkTheme
    )
    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["data-theme"],
      }
    )
    return () => observer.disconnect()

  }, [])

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      setFiles(Array.from(selectedFiles));
      setFileNames(Array.from(selectedFiles).map(file => file.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Select at least one PDF file.");

    setLoading(true);
    setReport(null); // Clear out historical dashboard logs before a fresh tracking push

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("https://vlm-text-extraction-backend.onrender.com/process-attendance", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Server responded with status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (jsonErr) {
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Error processing documents:", error);
      // alert(`Backend Execution Failure: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // const dark = 'bg-[#1B3038] text-[#FAF9F6] border-blue-900 hover:bg-black';
  const dark = 'bg-blue-50 text-[#1B3038] border-blue-100 hover:bg-blue-100';
  const light = 'bg-blue-50 text-[#1B3038] border-blue-100 hover:bg-blue-100';
  const lightreport = 'bg-blue-50 text-[#1B3038] border-blue-100';
  const darkreport = 'bg-blue-50 text-[#1B3038] border-blue-100'
  
  return (
    <div className="p-6 font-mono text-lg">
      <form onSubmit={handleSubmit} className='font-bold flex flex-col gap-y-6 w-full'>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          id="fileUpload"
          style={{ display: 'none' }}
        />

        <label htmlFor="fileUpload" className={`cursor-pointer border p-3 rounded-4xl text-center ${isDark ? dark : light}`}
>
          Choose Files | PDF(s)
        </label>

        {fileNames.length > 0 && (
          <ul className="text-sm font-normal list-disc pl-5">
            {fileNames.map((name, index) => <li key={index}>{name}</li>)}
          </ul>
        )}

        <button
          type="submit"
          // className="p-2 rounded hover:underline cursor-pointer disabled:text-gray-400"
          className="w-full text-center py-3 rounded-xl border border-transparent font-medium bg-[#18181B] text-white hover:bg-black transition-colors duration-200 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-auto"
          disabled={loading}
        >
          {loading ? "processing pages..." : "submit"}
        </button>
      </form>

      {report && (
        <div className={`mt-8 p-6 border rounded-xl ${isDark ? darkreport : lightreport}`}>
        
          <h2 className="text-lg font-bold mb-4">Mini Report</h2>
          <p><strong>Total Files Processed:</strong> {report.summary.total_files}</p>
          <p><strong>Total Pages Parsed:</strong> {report.summary.total_pages}</p>
          <p><strong>Total Rows Found:</strong> {report.summary.total_people}</p>
          <p><strong>Signed Attendees:</strong> {report.summary.total_signed}</p>
          <p><strong>Unsigned Attendees:</strong> {report.summary.total_unsigned}</p>

          <div className="mt-6 flex gap-4">
            <a
              href={`http://localhost:8000${report.downloads.csv}`}
              download
              className="bg-blue-200 px-4 py-2 font-semibold rounded-xl text-sm no-underline hover:bg-blue-300"
            >
              Download CSV
            </a>
            <a
              href={`http://localhost:8000${report.downloads.excel}`}
              download
              className="bg-blue-200 px-4 py-2 rounded-xl font-semibold text-sm no-underline hover:bg-blue-300"
            >
              Download Excel
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
