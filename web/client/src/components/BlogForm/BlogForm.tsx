import React, { useState, useContext }  from "preact/hooks";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { NewBlogPost } from "../../types/typesBlog";
import { StoreContext } from "../../context/StoreContext";
import ReactQuill from "react-quill";
import "./blogForm.scss";
import { modules, formats } from "../../types/quillConfig";
import ImageResize from "quill-image-resize-module-react";
import ImageDrop from "quill-image-drop-module";
import Quill from "quill";
import { assets } from "../../assets/frontend_assets/assets"; // Import cross icon
import { FunctionalComponent } from "preact";

interface BlogFormProps {
  onAddBlog: (newBlog: NewBlogPost) => void;
}

const BlogForm: FunctionalComponent<BlogFormProps> = ({ onAddBlog }) => {
  const [forbiddenWordsList, setForbiddenWordsList] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const { extractForbiddenWords } = useContext(StoreContext)!;

  const validationSchema = Yup.object({
    title: Yup.string().required("*"),
    summary: Yup.string().required("*"),
    content: Yup.string()
      .required("*")
      .test(
        "no-forbidden-words",
        "Content contains forbidden words",
        (value) => {
          if (!value) return true;
          const forbiddenWordsInMessage = extractForbiddenWords(value);
          setForbiddenWordsList(forbiddenWordsInMessage);
          return forbiddenWordsInMessage.length === 0;
        }
      ),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (
    values: NewBlogPost,
    { setSubmitting }: FormikHelpers<NewBlogPost>
  ) => {
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      values.content += `<img src="${imageUrl}" alt="uploaded image" />`;
    }
    onAddBlog(values);
    setSuccessMessage("Blog added successfully!");
    setSubmitting(false);
  };

  return (
    <div class='blog-form'>
      <h2>Add New Blog</h2>
      {successMessage && (
        <div class='success-message'>{successMessage}</div>
      )}
      <Formik
        initialValues={{ title: "", summary: "", content: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div class='form-group'>
              <label htmlFor='title'>Title:</label>
              <Field name='title' type='text' placeholder='Blog Title' />
              <ErrorMessage name='title' component='div' class='error' />
            </div>
            <div class='form-group'>
              <label htmlFor='summary'>Summary:</label>
              <Field name='summary' type='text' placeholder='Blog Summary' />
              <ErrorMessage name='summary' component='div' class='error' />
            </div>
            <div class='form-group'>
              <label htmlFor='content'>Content:</label>
              <ReactQuill
                name='content'
                value={values.content}
                onChange={(value) => {
                  setFieldValue("content", value);
                  const forbiddenWordsInMessage = extractForbiddenWords(value);
                  setForbiddenWordsList(forbiddenWordsInMessage);
                }}
                modules={modules}
                formats={formats}
              />
              <ErrorMessage name='content' component='div' class='error' />
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
              <label htmlFor='imageUpload'>Upload Image:</label>
              <input
                id='imageUpload'
                name='imageUpload'
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <div class='image-preview'>
                  <button
                    type='button'
                    class='btn-remove-image'
                    onClick={handleImageRemove}
                  >
                    <img src={assets.cross_icon} alt='Remove' />
                  </button>
                  <img src={imagePreview} alt='Preview' />
                </div>
              )}
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              class='btn-submit-blog'
            >
              Add Blog
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogForm;
