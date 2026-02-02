import React, { useContext, useState, ChangeEvent }  from "preact/hooks";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { StoreContext } from "../../context/StoreContext"; // Adjust path as needed
import SecurityInput from "../../components/SecurityInput/SecurityInput";
import IntroTourButton from "../../components/IntroBtn/IntroBtn";
import { feedbackIntroSteps } from "../../types";
import "./feedback.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { assets } from "../../assets/frontend_assets/assets";
import { FunctionalComponent } from "preact";

interface FeedbackFormValues {
  name: string;
  email: string;
  message: string;
}

const FeedbackForm: FunctionalComponent = () => {
  const { extractForbiddenWords } = useContext(StoreContext)!;
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [messageLength, setMessageLength] = useState<number>(0);
  const [charLimitExceeded, setCharLimitExceeded] = useState<boolean>(false);
  const [forbiddenWordsList, setForbiddenWordsList] = useState<string[]>([]);
  const maxCharCount = 500;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (files.length + selectedFiles.length > 5) {
        alert("You can only upload up to 5 files.");
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
    message: Yup.string()
      .required("*")
      .test(
        "no-forbidden-words",
        "Message contains forbidden words",
        (value) => {
          if (!value) return true;
          const forbiddenWordsInMessage = extractForbiddenWords(value);
          setForbiddenWordsList(forbiddenWordsInMessage);
          return forbiddenWordsInMessage.length === 0;
        }
      ),
  });

  const handleSubmit = (
    values: FeedbackFormValues,
    { setSubmitting }: FormikHelpers<FeedbackFormValues>
  ) => {
    console.log("Feedback submitted:", values);
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      <button class='btn-back-history' onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowUp} class='fontawe' />
      </button>
      <IntroTourButton
        class='btn-intro-feedback'
        steps={feedbackIntroSteps}
      />
      <div class='feedback-form-container'>
        <h2>Feedback Form</h2>
        {submitted ? (
          <p>Thank you for your feedback!</p>
        ) : (
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form class='feedback-form'>
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
                  <label htmlFor='message'>Message:</label>
                  <Field
                    name='message'
                    as={SecurityInput}
                    type='textarea'
                    placeholder='Your Message'
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      const value = e.target.value;
                      setFieldValue("message", value);
                      setMessageLength(value.length);
                      setCharLimitExceeded(value.length > maxCharCount);
                      const forbiddenWordsInMessage = extractForbiddenWords(
                        value
                      );
                      setForbiddenWordsList(forbiddenWordsInMessage);
                    }}
                  />
                  <ErrorMessage
                    name='message'
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
                              alt=''
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type='submit'
                  disabled={isSubmitting || charLimitExceeded}
                  class='btn-submit-feedback'
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

export default FeedbackForm;
