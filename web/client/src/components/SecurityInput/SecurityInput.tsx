import React, { forwardRef, useState }  from "preact/hooks";
import TextInput from "../TextInput/TextInput";
import TextArea from "../TextArea/TextArea";
import "./securityInput.scss";

interface SecurityInputProps {
  type?: "text" | "password" | "email" | "textarea";
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  class?: string;
  onKeyDown?: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

// Sanitize input to remove unwanted characters
const sanitizeInput = (input: string) => {
  return input.replace(/[^\w\s]/gi, "");
};

// Validate email format
const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
};

// Escape HTML characters to prevent XSS
const escapeHTML = (str: string) => {
  return str.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#039;";
      default:
        return match;
    }
  });
};

const SecurityInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  SecurityInputProps
>((props, ref) => {
  const { type = "text", onChange } = props;
  const [isValid, setIsValid] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;

    // Sanitize and escape input
    value = sanitizeInput(value);
    value = escapeHTML(value);

    // Validate input if type is email
    const valid = type === "email" ? validateEmail(value) : true;
    setIsValid(valid);

    // Limit input length for textareas
    if (type === "textarea" && value.length > 1000) {
      return; // Limit textarea input length
    }

    // Call the parent onChange handler if provided
    onChange && onChange(e);
  };

  if (type === "textarea") {
    return (
      <TextArea
        {...props}
        onChange={handleChange}
        ref={ref as React.Ref<HTMLTextAreaElement>}
      />
    );
  }

  return (
    <TextInput
      type={type}
      {...props}
      onChange={handleChange}
      ref={ref as React.Ref<HTMLInputElement>}
    />
  );
});

SecurityInput.displayName = "SecurityInput";
export default SecurityInput;
