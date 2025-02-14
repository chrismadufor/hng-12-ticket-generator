import Image from "next/image";
import React from "react";
import { useDropzone } from "react-dropzone";

const DragAndDrop = ({ onDrop, accept, url }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });
  let inputProps = { ...getInputProps(), multiple: true };

  return (
    <div
      className="dropzone-div absolute top-0 left-1/2 -translate-x-1/2 h-[240px] w-[240px] bg-strokeMain border-[4px] border-secondary rounded-[32px] text-center flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      {...getRootProps()}
    >
      {url && (
        <div className="absolute top-0 left-0 h-[240px] aspect-square ">
          <Image src={url} fill className="object-cover object-top" alt="upload" />
        </div>
      )}
      <input className="dropzone-input" {...inputProps} />
      <div className={`${url && "img_overlay"} z-10 w-full h-full px-5 bg-black bg-opacity-30`}>
        <div className="flex flex-col gap-4 justify-center h-full items-center">
          <div className="relative">
            <Image
              src={`/upload.svg`}
              width={32}
              height={32}
              className="object-contain"
              alt="upload"
            />
          </div>
          <p>Drag & drop or click to upload</p>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
