import { useUser, } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
// import { ModeToggle } from "./components/mode-toggle";
import NavbarIndex from "./NavbarIndex";

type UploadedFile = {
  title: string;
  file: string;
  _id?: string;
  category: string;
};

const getCategoryLabel = (value: string) => {
  switch (value) {
    case "id":
      return "Identity Proof";
    case "education":
      return "Educational Document";
    case "financial":
      return "Financial Record";
    default:
      return "Other";
  }
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

  const deleteFile = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`http://localhost:5000/delete-file/${id}`);
      setFiles((prev) => prev.filter((file) => file._id !== id));
    } catch (err) {
      console.error("Error deleting file:", err);
      alert("Failed to delete the file. Please try again.");
    }
  };

  const copyShareLink = async (filename: string) => {
    const link = `http://localhost:5000/files/${filename}`;

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Sign in to view this page</div>;

  return (
    <>
    <NavbarIndex/>
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Hello {user.firstName}!
          </h1>
          <p className="text-gray-600">
            Manage and organize all your documents in one place
          </p>
        </div>
      </div>

      {/* Upload Button */}
      <div className="mb-6">
        <Link
          to="/upload"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Upload File
        </Link>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet.</p>
        ) : (
          files.map((file) => (
            <Card
              key={file._id}
              className="hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="pt-4 space-y-2">
                <CardTitle className="text-lg font-semibold truncate">
                  {file.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Category: {getCategoryLabel(file.category)}
                </CardDescription>

                <a
                  href={`http://localhost:5000/files/${file.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm block"
                >
                  View
                </a>

                {/* Buttons Row */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => file._id && deleteFile(file._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyShareLink(file.file)}
                  >
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
    </>
  );
}
