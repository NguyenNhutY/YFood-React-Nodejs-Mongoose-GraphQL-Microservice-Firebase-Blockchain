import React  from "preact/hooks";

interface TextInputProps {
  type: "text" | "password" | "email";
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  class?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, ...props }, ref) => (
    <input
      type={type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      class={props.class}
      onKeyDown={props.onKeyDown}
      onFocus={props.onFocus}
      ref={ref}
    />
  )
);

TextInput.displayName = "TextInput";
export default TextInput;
