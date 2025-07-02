"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFilesAdded: (files: File[]) => void;
}

export function FileUploader({ onFilesAdded }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAdded(acceptedFiles);
    setIsDragging(false);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: {
      "audio/flac": [".flac"],
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "audio/ogg": [".ogg"],
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Music</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-muted-foreground/50 rounded-lg p-10 text-center cursor-pointer transition-colors",
            isDragActive || isDragging ? "bg-secondary border-primary" : "hover:bg-secondary"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <UploadCloud className="w-10 h-10" />
            <p className="font-semibold">
              {isDragActive ? "Drop the files here..." : "Drag & drop files here, or click to select"}
            </p>
            <p className="text-sm">Supports FLAC, MP3, WAV, OGG</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
