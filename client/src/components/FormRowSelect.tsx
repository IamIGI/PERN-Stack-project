interface Props {
  name: string;
  labelText: string;
  list: string[];
  defaultValue?: string;
}

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = '',
}: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
