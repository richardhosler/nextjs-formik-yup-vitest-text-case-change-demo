"use client";

import { useFormik } from "formik";
import { JSX, useState } from "react";
import * as Yup from "yup";

import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Popup } from "@components/Popup";
import { Select } from "@components/Select";
import { TextInput } from "@components/TextInput";
import { ToastNotification } from "@components/ToastNotification";
import { CaseType } from "@enums/CaseType";
import { formatText } from "@utils/formatText";

const validationSchema = Yup.object().shape({
  inputString: Yup.string()
    .required("Text is required")
    .min(1, "Text cannot be empty"),
});

export default function Home(): JSX.Element {
  const [showPopup, setShowPopup] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [formattedText, setFormattedText] = useState("");

  const formik = useFormik({
    initialValues: {
      inputString: "",
      caseType: "Lower Case",
      alphaNumeric: false,
      replace: false,
      replaceString: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setFormattedText(
        formatText({
          input: values.inputString,
          caseType: values.caseType,
          options: {
            alphaNumeric: values.alphaNumeric,
            replace: values.replaceString,
          },
        })
      );
      setShowPopup(true);
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col py-12 px-12 bg-white rounded-2xl shadow-xl z-20 gap-5"
      >
        <h1 className="text-3xl font-bold text-center">Change Case Of Text</h1>
        <div className="space-y-4">
          <TextInput
            name="inputString"
            label="Enter your string here"
            placeholder="Your input text..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.inputString}
          />
          <Select
            id="caseType"
            label="Then select a case type"
            options={Object.values(CaseType)}
            onSelectOption={(value: string) => {
              formik.setFieldValue("caseType", value);
            }}
            value={formik.values.caseType}
          />
          <div className="flex flex-row space-x-2">
            <div className="flex flex-col">
              <Checkbox
                name="alphaNumeric"
                label="AlphaNumeric"
                checked={formik.values.alphaNumeric}
                onChange={(event) => {
                  formik.handleChange(event);
                }}
              />
              <Checkbox
                name="replace"
                label="Replace"
                checked={formik.values.replace}
                onChange={(event) => {
                  setShowReplace(event.target.checked);
                  formik.handleChange(event);
                }}
              />
            </div>
            {showReplace && (
              <TextInput
                name="replaceString"
                label="Replace with"
                placeholder="Replacement character..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.replaceString}
                className="max-w-40"
              />
            )}
          </div>
        </div>
        <div className="flex">
          <Button type="submit">Format my text!</Button>
        </div>
      </form>
      {showPopup && <Popup body={formattedText} setShow={setShowPopup} />}
      <ToastNotification
        messages={formik.errors}
        onErrorsProcessed={() => {
          formik.setErrors({});
        }}
      />
    </>
  );
}
