const Input = ({ label, type, value, required, helpertext = '', disabled = false, ...props }) => (
  <div className="form-group" >
    <label htmlFor={label}>{label}{required ? "*" : ""}</label>
    <input className="form-control" type={type} value={value} disabled={(disabled) ? 'disabled' : ''} {...props} />
    {
      helpertext ? (
        <small id="emailHelp" className="form-text text-muted">{helpertext}</small>
      ) : (<></>)
    }
  </div>
)

export default Input;
