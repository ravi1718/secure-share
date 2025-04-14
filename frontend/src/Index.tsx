import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

type UploadedFile = {
  title: string;
  file: string;
  _id?: string;
};

export default function Example() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    if (isSignedIn) {
      fetchFiles();
    }
  }, [isSignedIn]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-files");
      setFiles(res.data.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Sign in to view this page</div>;

  return (
    <div className="p-6">
      <h6 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
        Hello {user.firstName}!
      </h6>
      <p className="mb-4">Manage and organize all your documents in one place</p>
      
      <Link to="/upload" className="bg-blue-500 text-white px-4 py-2 rounded inline-block mb-6">
        Upload File
      </Link>

      {/* Display Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {files.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet.</p>
        ) : (
          files.map((file, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="space-y-2 pt-4">
                <CardTitle className="text-lg font-semibold truncate">{file.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">Uploaded file</CardDescription>
                <a
                  href={`http://localhost:5000/files/${file.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View / Download
                </a>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
