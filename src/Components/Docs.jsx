import React from 'react'

const Docs = () => {
  return (
     <div className="font-mono py-8">
      <div className='py-4'>
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
      </div>

      <section className="py-4">
        <h2 className="text-xl font-bold border-b pb-1">Specs</h2>
        <ul className="list-disc pl-5 py-2 text-sm">
          <li>Frontend Framework: React.js structured with Tailwind CSS for layouts</li>
          <li>Backend Router: FastAPI running on a Uvicorn ASGI server network block</li>
          <li>PDF Extraction: PyMuPDF for rendering document sheets directly to image memory arrays</li>
          <li>Preprocessing: OpenCV for contrast normalization, Otsu binarization, and structural deskewing</li>
          <li>Data Engineering: Pandas and OpenPyXL for dataframe translation and static document outputs</li>
          <li>VLM Cloud Infrastructure: Groq Cloud API executing regional OCR processing</li>
          <li>Deployment: Frontend-Netlify, Backend-Render</li>
        </ul>
      </section>

      <section className="py-4">
        <h2 className="text-xl font-bold border-b pb-1">Relevant Details</h2>
        <ul className="list-disc pl-5 py-2 text-sm">
          <li>Zero Disk Footprint: Streams page data inside RAM via byte buffers to bypass temporary local storage lag</li>
          <li>Memory Crash Mitigation: Uses natural resolution rendering to prevent giant pixel arrays from overloading systems</li>
        </ul>
      </section>
    </div>
  )
}

export default Docs
