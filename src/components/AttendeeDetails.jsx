"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useCallback, useEffect, useState } from "react";
import DragAndDrop from "./DragDrop";
import Image from "next/image";
import Spinner from "./Spinner";

export default function AttendeeDetails({ changePage }) {
  const ticketData = JSON.parse(localStorage.getItem("tData"));
  const [loading, setLoading] = useState(false);

  const [fileURL, setFileURL] = useState(ticketData.avatar);
  const [file, setFile] = useState(null);

  const getPath = (file) => {
    setFile(file);
    setFileURL(URL.createObjectURL(file));
  };

  //   This is the client-side method for uplading images using presets hence no need for API keys
  const getImageURL = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ticket-master"); // Set this in Cloudinary

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/da8pyczxe/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    for (let i = 0; i < acceptedFiles.length; i++) {
      if (
        acceptedFiles[i].type !== "image/jpeg" &&
        acceptedFiles[i].type !== "image/png" &&
        acceptedFiles[i].type !== "image/webp"
      ) {
        return alert("File must be in png or jpg format");
      }
    }
    getPath(acceptedFiles[0]);
  });

  useEffect(() => {
    console.log("In the two");
  }, []);
  return (
    <div className="md:p-6 md:bg-primaryTwo md:w-full mt-8 md:border border-strokeMain md:rounded-[32px]">
      <section className="bg-primaryThree border border-strokeMainTwo rounded-[24px] py-5 p-5 md:p-7">
        <p className="mb-4">Upload Profile Photo</p>
        <div className="relative h-[240px] flex items-center">
          <div className="hidden md:block w-full h-[200px] bg-black bg-opacity-20"></div>
          <DragAndDrop onDrop={onDrop} url={fileURL} />
        </div>
      </section>
      <div className="w-full h-1 bg-strokeMainTwo my-8"></div>
      <section>
        <Formik
          initialValues={{
            name: ticketData.name || "",
            email: ticketData.email || "",
            request: ticketData.request || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            request: Yup.string(),
          })}
          onSubmit={async (values) => {
            // check for image here
            if (!fileURL) return alert("You must upload a photo to proceed");
            // local storage stuff
            if (file) {
              let response = await getImageURL();
              try {
                if (response) {
                  setLoading(false);
                  const data = {
                    ...ticketData,
                    avatar: response,
                    name: values.name,
                    email: values.email,
                    request: values.request,
                  };

                  localStorage.setItem("tData", JSON.stringify(data));

                  changePage(3);
                } else {
                  setLoading(false);
                  alert("Image upload failed. Try again");
                }
              } catch (err) {
                setLoading(false);
                console.log("Error", err);
              }
            } else {
              const data = {
                ...ticketData,
                name: values.name,
                email: values.email,
                request: values.request,
              };

              localStorage.setItem("tData", JSON.stringify(data));

              changePage(3);
            }
          }}
        >
          <Form>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Enter your name *</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="h-12 rounded-[8px] border border-strokeMainTwo bg-transparent w-full px-3 focus:outline-strokeMain"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Enter your email *</label>
                <div className="relative flex gap-2 items-center">
                  <div className="absolute left-3">
                    <Image
                      src={`/mail.svg`}
                      width={24}
                      height={24}
                      className="object-contain"
                      alt="upload"
                    />
                  </div>
                  <Field
                    type="text"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className="h-12 rounded-[8px] border border-strokeMainTwo bg-transparent w-full pr-3 pl-12 focus:outline-strokeMain"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Special request?</label>
                <Field
                  as="textarea"
                  name="request"
                  placeholder="Anything you want from us"
                  className="h-24 rounded-[8px] border border-strokeMainTwo bg-transparent w-full p-3 focus:outline-strokeMain"
                />
                <ErrorMessage
                  name="request"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <button
                onClick={() => changePage(1)}
                className="row-start-2 md:row-start-1 h-12 border border border-secondary text-secondary jeju rounded-[8px] hover:border-strokeLight hover:border hover:text-strokeLight"
              >
                Back
              </button>
              <button
                type="submit"
                className="h-12 border border-secondary bg-secondary jeju rounded-[8px] hover:border-strokeLight hover:border hover:text-strokeLight"
              >
                {loading ? <Spinner /> : "Get My Free Ticket"}
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </div>
  );
}
