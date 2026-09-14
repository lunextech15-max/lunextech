"use client";

import { useId, useState, type ChangeEvent } from "react";

type FileUploadProps = {
  onFileNameChange: (fileName: string) => void;
};

const ACCEPTED = ".pdf,.doc,.docx";

export default function FileUpload({ onFileNameChange }: FileUploadProps) {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
    onFileNameChange(file ? file.name : "");
  };

  return (
    <div className="apply-field">
      <label htmlFor={inputId} className="apply-field-label">
        Resume
      </label>
      <div className="flex flex-wrap items-center gap-4 border border-line px-5 py-4">
        <label
          htmlFor={inputId}
          className="inline-flex cursor-pointer items-center gap-2 border border-soft-white/25 px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
        >
          Upload file
        </label>
        <input id={inputId} type="file" accept={ACCEPTED} className="sr-only" onChange={handleChange} />
        <span className="text-xs text-soft-white/50">
          {fileName ?? "No file selected"}
        </span>
        <span className="ml-auto text-[10px] font-medium tracking-[0.15em] text-soft-white/30 uppercase">
          PDF · DOC · DOCX
        </span>
      </div>
    </div>
  );
}
