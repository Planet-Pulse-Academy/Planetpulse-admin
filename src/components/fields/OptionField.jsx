function OptionField({
  handleChange,
  data,
  name,
  id,
  label,
  placeholder,
  loading,
  value,
}) {
  console.log(value);
  return (
    <div>
      <label className="ml-3 text-sm font-bold leading-7 text-navy-700 dark:text-white">
        {label}
      </label>
      <select
        onChange={handleChange}
        className="form-select form-select-sm m-0 mb-5 block  w-full   appearance-none
 rounded-xl border  border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat
 px-3 py-2.5 text-sm font-semibold  text-gray-700 transition   ease-in-out  
focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
        name={name}
        id={id}
        value={value !== undefined ? value : ""}
      >
        <option defaultValue={true} value="">
          {placeholder}
        </option>
        {!loading ? (
          data.map((i, key) => (
            <option key={key} value={i._id}>
              {i.title ?? i.name}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
    </div>
  );
}

export default OptionField;
