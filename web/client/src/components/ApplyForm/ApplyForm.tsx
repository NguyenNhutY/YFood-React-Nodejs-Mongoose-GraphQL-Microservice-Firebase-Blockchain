import React, { useState, ChangeEvent, useContext }  from "preact/hooks";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { StoreContext } from "../../context/StoreContext"; // Adjust path as needed
import SecurityInput from "../../components/SecurityInput/SecurityInput";
import "./applyForm.scss";
import { assets } from "../../assets/frontend_assets/assets";
import { FunctionalComponent } from "preact";

// Define the interface for ApplyForm props
interface ApplyFormValues {
  name: string;
  email: string;
  resume: string;
  files: File[];
}

const ApplyForm: FunctionalComponent = () => {
  const { extractForbiddenWords } = useContext(StoreContext)!;
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [messageLength, setMessageLength] = useState<number>(0);
  const [charLimitExceeded, setCharLimitExceeded] = useState<boolean>(false);
  const [forbiddenWordsList, setForbiddenWordsList] = useState<string[]>([]);
  const maxCharCount = 500;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const maxFileCount = 5;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (files.length + selectedFiles.length > maxFileCount) {
        alert(`You can only upload up to ${maxFileCount} files.`);
        return;
      }
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("*"),
    email: Yup.string()
      .email("Invalid email address")
      .required("*"),
    resume: Yup.string()
      .required("*")
      .test(
        "no-forbidden-words",

        (value) => {
          if (!value) return true;
          const forbiddenWordsInResume = extractForbiddenWords(value);
          setForbiddenWordsList(forbiddenWordsInResume);
          return forbiddenWordsInResume.length === 0;
        }
      ),
    files: Yup.array()
      .of(Yup.mixed().required("*"))
      .required("At least one file is required"),
  });

  const handleSubmit = (
    values: ApplyFormValues,
    { setSubmitting }: FormikHelpers<ApplyFormValues>
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("resume", values.resume);

    values.files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    console.log("Application submitted:", values);
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      <div class='apply-form-container'>
        <h2>Apply Form</h2>
        {submitted ? (
          <p>Thank you for your application!</p>
        ) : (
          <Formik
            initialValues={{ name: "", email: "", resume: "", files: [] }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form class='apply-form'>
                <div class='form-group'>
                  <label htmlFor='name'>Name:</label>
                  <Field
                    name='name'
                    as={SecurityInput}
                    type='text'
                    placeholder='Your Name'
                  />
                  <ErrorMessage name='name' component='div' class='error' />
                </div>
                <div class='form-group'>
                  <label htmlFor='email'>Email:</label>
                  <Field
                    name='email'
                    as={SecurityInput}
                    type='email'
                    placeholder='Your Email'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    class='error'
                  />
                </div>
                <div class='form-group'>
                  <label htmlFor='resume'>Resume:</label>
                  <Field
                    name='resume'
                    as={SecurityInput}
                    type='textarea'
                    placeholder='Your Resume'
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      const value = e.target.value;
                      setFieldValue("resume", value);
                      setMessageLength(value.length);
                      setCharLimitExceeded(value.length > maxCharCount);
                      const forbiddenWordsInResume = extractForbiddenWords(
                        value
                      );
                      setForbiddenWordsList(forbiddenWordsInResume);
                    }}
                  />
                  <ErrorMessage
                    name='resume'
                    component='div'
                    class='error'
                  />
                  <div class='message-length'>
                    Character count: {messageLength}/{maxCharCount}
                  </div>
                  {charLimitExceeded && (
                    <div class='error char-limit-exceeded'>
                      You have exceeded the maximum character limit of{" "}
                      {maxCharCount} characters.
                    </div>
                  )}
                  <div class='forbidden-words-list'>
                    {forbiddenWordsList.length > 0 && (
                      <div class='error'>
                        <p>Forbidden words detected:</p>
                        <div class='forbidden-words-container'>
                          {forbiddenWordsList.map((word, index) => (
                            <span key={index} class='forbidden-word'>
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div class='form-group'>
                  <label htmlFor='files'>Upload Files:</label>
                  <input
                    type='file'
                    name='files'
                    onChange={handleFileChange}
                    multiple
                    accept='image/*,video/*'
                  />
                  {selectedFiles.length > 0 && (
                    <div class='file-preview'>
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          class={
                            file.type.startsWith("image/")
                              ? "file-preview-image-container"
                              : "file-preview-video-container"
                          }
                        >
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`preview-${index}`}
                              class='file-preview-image'
                            />
                          ) : (
                            <video
                              src={URL.createObjectURL(file)}
                              controls
                              class='file-preview-video'
                            />
                          )}
                          <button
                            type='button'
                            class='btn-remove-file'
                            onClick={() => handleFileRemove(index)}
                          >
                            <img
                              class='icon-remove-file'
                              src={assets.cross_icon}
                              alt='Remove'
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  class='btn-submit-apply'
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default ApplyForm;
