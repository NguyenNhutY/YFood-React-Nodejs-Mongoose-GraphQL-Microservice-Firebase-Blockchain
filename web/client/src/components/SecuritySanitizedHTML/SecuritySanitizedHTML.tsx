import React  from "preact/hooks";
import DOMPurify from "dompurify";
import { FunctionalComponent } from "preact";

// Define the type for the props
interface SanitizedHTMLProps {
  data: string;
}

const SanitizedHTML: FunctionalComponent<SanitizedHTMLProps> = ({ data }) => {
  // Sanitize the HTML content
  const sanitizedHTML = DOMPurify.sanitize(data);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default SanitizedHTML;
