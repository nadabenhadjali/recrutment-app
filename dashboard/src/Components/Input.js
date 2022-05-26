import React from 'react'
function Input(props) {
  return (
    <div className="mb-3">
      <label className="form-label">{props.label}</label>
      <input
              type={props.type}
        className="form-control"
        value={props.value}
       // className={classnames("form-control", { "is-invalid": props.errors })}
        name={props.name}
        onChange={props.onChangeHandler}
      />
          {//{props.errors && <div class="invalid-feedback">{props.errors}</div>}
          }
    </div>
  );
}

export default Input