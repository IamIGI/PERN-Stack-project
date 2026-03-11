import type {
  ChangeEvent,
  HTMLInputTypeAttribute,
} from 'react';

interface Props {
  type: HTMLInputTypeAttribute;
  name: string;
  labelText?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = '',
  onChange,
}: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
