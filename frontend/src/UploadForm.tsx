import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [allFiles, setAllFiles] = useState<File | null>(null);
  const [category , setCategory] = useState<string>("");

  console.log(title,category,allFiles);
  const navigate = useNavigate();

  useEffect(()=>{
    getFiles();
  },[]);


  const getFiles = async ()=>{
    const result = await axios.get("http://localhost:5000/get-files");
  setAllFiles(result.data.data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement upload logic here
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);

    if (file) {
      formData.append("file", file);
    }
    // console.log("Submitting:", title, file);
    const result = await axios.post("http://localhost:5000/upload-files",formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if(result.status === 200){
      alert("File uploaded successfully!");
      navigate("/");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold flex items-center mb-2">
        <span className="text-blue-500 mr-2 text-3xl">📄</span>
        Upload Document
      </h2>
      <p className="text-gray-500 mb-6">
        Add a new document to your digital vault
      </p>

      <form onSubmit={handleSubmit} className="space-y-6" method="POST">
        {/* Document Name */}
        <div>
          <label className="block font-semibold mb-1 text-sm">
            Document Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Passport, PAN Card, Marksheet"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Document Category */}
        <div>
          <label className="block font-semibold mb-1 text-sm">
            Document Category<span className="text-red-500">*</span>
          </label>
          <select
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="id">Identity Proof</option>
            <option value="education">Educational Document</option>
            <option value="financial">Financial Record</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-semibold mb-1 text-sm">
            Upload Document<span className="text-red-500">*</span>
          </label>
          <div className="w-full border-2 border-dashed rounded-md border-gray-300 p-6 text-center">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              required
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-3xl mb-2">📤</div>
              <p className="text-gray-600 font-semibold">
                Drag and drop your file here or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports PDF, JPG, PNG, DOC up to 5MB
              </p>
              <button
                type="button"
                className="mt-4 px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
              >
                Browse Files
              </button>
            </label>
            {file && (
              <p className="mt-4 text-green-600 font-medium">
                Selected File: {file.name}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-md disabled:opacity-50"
          disabled={!file}
        >
          Upload Document
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
