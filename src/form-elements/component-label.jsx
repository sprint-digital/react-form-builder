import React from 'react';
import myxss from './myxss';

const ComponentLabel = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);
  const isInternal = (props.data.hasOwnProperty('isInternal') && props.data.isInternal === true);
  const labelText = myxss.process(props.data.label);
  if (!labelText) {
    return null;
  }
  return (
    <label className={props.className || 'form-label'}>
      <span dangerouslySetInnerHTML={{ __html: labelText }}/>
      {hasRequiredLabel && <span className="label-required badge badge-danger">Required</span>}
      {isInternal && <span className="label-internal badge badge-info">Internal</span>}
    </label>
  );
};

export default ComponentLabel;
