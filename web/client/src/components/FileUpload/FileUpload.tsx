import React  from "preact/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent } from "preact";

interface FileUploadProps {
  selectedFiles: File[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: (index: number) => void;
}

const FileUpload: FunctionalComponent<FileUploadProps> = ({
  selectedFiles,
  handleFileChange,
  handleFileRemove,
}) => (
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
              <FontAwesomeIcon class='icon-remove-file' icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FileUpload;
