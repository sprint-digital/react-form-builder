// eslint-disable-next-line max-classes-per-file
import React from 'react';
import Select from 'react-select';
import SignaturePad from 'react-signature-canvas';
import ReactBootstrapSlider from 'react-bootstrap-slider';

import StarRating from './star-rating';
import DatePicker from './date-picker';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';
import myxss from './myxss';

const FormElements = {};

class Header extends React.Component {
  render() {
    // const headerClasses = `dynamic-input ${this.props.data.element}-input`;
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <h3 className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class Paragraph extends React.Component {
  render() {
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <p className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class Label extends React.Component {
  render() {
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <label className={`${classNames} form-label`} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }}/>
      </div>
    );
  }
}

class LineBreak extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <hr />
      </div>
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = 'text';
    props.className = 'form-control';
    props.name = this.props.data.field_name;
    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <input {...props} />
        </div>
      </div>
    );
  }
}

class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = 'text';
    props.className = 'form-control';
    props.name = this.props.data.field_name;
    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props}/>
          <input {...props} />
        </div>
      </div>
    );
  }
}

class PhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = 'tel';
    props.className = 'form-control';
    props.name = this.props.data.field_name;
    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props}/>
          <input {...props} />
        </div>
      </div>
    );
  }
}

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = 'number';
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <input {...props} />
        </div>
      </div>
    );
  }
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props}/>
          <textarea {...props} />
        </div>
      </div>
    );
  }
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <select {...props}>
            {this.props.data.options.map((option) => {
              const this_key = `preview_${option.key}`;
              return <option value={option.value} key={this_key}>{option.text}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
}

class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue,
      hasSigned: false,
      signatureMode: props.custom_value || 'draw', // 'draw' or 'type'
      typedSignature: '',
    };
    this.inputField = React.createRef();
    this.canvas = React.createRef();
    this.textCanvas = React.createRef();
    this.timer = null;
  }

  clear = () => {
    if (this.state.defaultValue) {
      this.setState({ defaultValue: '', typedSignature: '' });
    } else if (this.canvas.current) {
      this.canvas.current.clear();
    }
    this.setState({ hasSigned: false });
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  getSignatureImg = () => {
    if (this.canvas.current) {
      const signatureData = this.canvas.current.toDataURL().split(',')[1];
      this.setState({ defaultValue: signatureData });
      return signatureData;
    }
    return this.state.defaultValue;
  }

  createTextSignature = (text) => {
    if (!text || text.trim() === '') return '';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 300;
    canvas.height = 150;

    // Set font style - cursive/handwriting style
    ctx.font = '200 36px "Dancing Script", "Brush Script MT", cursive';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the text
    ctx.fillStyle = '#000000';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert to base64
    const signatureData = canvas.toDataURL().split(',')[1];
    return signatureData;
  }

  handleTextChange = (e) => {
    this.setState({ typedSignature: e.target.value });
  }

  handleTextBlur = () => {
    const { typedSignature } = this.state;
    if (typedSignature.trim()) {
      const signatureData = this.createTextSignature(typedSignature);
      this.setState({ defaultValue: signatureData });
    }
  }

  toggleSignatureMode = () => {
    this.setState(prevState => ({
      signatureMode: prevState.signatureMode === 'draw' ? 'type' : 'draw'
    }));
    setTimeout(() => {
      this.clear();
    }, 100);
  }

  handleEnd = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.getSignatureImg();
    }, 3000);
  }

  handleStart = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { defaultValue, signatureMode, typedSignature } = this.state;
    let canClear = !!defaultValue;
    const props = {};
    props.type = 'hidden';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = defaultValue;
      props.ref = this.inputField;
    }
    const padProps = {
      canvasProps: {
        width: 300,
        height: 150,
      }
    };
    if (this.props.mutable) {
      padProps.defaultValue = defaultValue;
      padProps.ref = this.canvas;
      padProps.onEnd = this.handleEnd;
      padProps.onBegin = this.handleStart;
      canClear = !this.props.read_only;
    }
    padProps.clearOnResize = false;

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    let sourceDataURL;
    if (defaultValue && defaultValue.length > 0) {
      sourceDataURL = `data:image/png;base64,${defaultValue}`;
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {/* Mode toggle buttons */}
          {this.props.mutable && !this.props.read_only && (
            <div className="signature-mode-toggle" style={{ marginBottom: '10px' }}>
              <button
                type="button"
                className={`btn btn-sm ${signatureMode === 'draw' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={this.toggleSignatureMode}
                style={{ marginRight: '5px' }}
              >
                <i className="fas fa-pen"></i> Draw
              </button>
              <button
                type="button"
                className={`btn btn-sm ${signatureMode === 'type' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={this.toggleSignatureMode}
              >
                <i className="fas fa-keyboard"></i> Type
              </button>
            </div>
          )}

          {this.props.read_only === true || !!sourceDataURL ? (
            <img src={sourceDataURL} alt="Signature" />
          ) : (
            <div>
              {signatureMode === 'draw' ? (
                <SignaturePad {...padProps} />
              ) : (
                <div className="signature-text-input">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your signature here..."
                    value={typedSignature}
                    onChange={this.handleTextChange}
                    onBlur={this.handleTextBlur}
                    style={{
                      fontFamily: '"Dancing Script", "Brush Script MT", cursive',
                      fontSize: '24px',
                      textAlign: 'center',
                      height: '60px'
                    }}
                  />
                  <small className="form-text text-muted">
                    Type your name and it will be converted to a signature when you click away
                  </small>
                </div>
              )}
            </div>
          )}
          {canClear && (
            <i className="fas fa-times clear-signature" onClick={this.clear} title="Clear Signature" style={{ cursor: 'pointer', marginTop: '10px' }}></i>
          )}
          <input {...props} />
        </div>
      </div>
    );
  }
}

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    const { defaultValue, data } = props;
    this.state = { value: this.getDefaultValue(defaultValue, data.options) };
  }

  getDefaultValue(defaultValue, options) {
    if (defaultValue) {
      if (typeof defaultValue === 'string') {
        const vals = defaultValue.split(',').map(x => x.trim());
        return options.filter(x => vals.indexOf(x.value) > -1);
      }
      return options.filter(x => defaultValue.indexOf(x.value) > -1);
    }
    return [];
  }

  // state = { value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(',') : [] };

  handleChange = (e) => {
    this.setState({ value: e || [] });
  };

  render() {
    const options = this.props.data.options.map(option => {
      option.label = option.text;
      return option;
    });
    const props = {};
    props.isMulti = true;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;

    props.options = options;
    if (!this.props.mutable) { props.value = options[0].text; } // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.isDisabled = this.props.read_only;
      props.value = this.state.value;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <Select {...props} />
        </div>
      </div>
    );
  }
}

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = 'custom-control custom-checkbox';
    if (this.props.data.inline) { classNames += ' option-inline'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.data.options.map((option) => {
            const this_key = `preview_${option.key}`;
            const props = {};
            props.name = `option_${option.key}`;

            props.type = 'checkbox';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue !== undefined && (self.props.defaultValue.indexOf(option.key) > -1 || self.props.defaultValue.indexOf(option.value) > -1);
            }
            if (this.props.read_only) {
              props.disabled = 'disabled';
            }
            return (
              <div className={classNames} key={this_key}>
                <input id={`fid_${this_key}`} className="custom-control-input" ref={c => {
                  if (c && self.props.mutable) {
                    self.options[`child_ref_${option.key}`] = c;
                  }
                }} {...props} />
                <label className="custom-control-label" htmlFor={`fid_${this_key}`}>{option.text}</label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class RadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = 'custom-control custom-radio';
    if (this.props.data.inline) { classNames += ' option-inline'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.data.options.map((option) => {
            const this_key = `preview_${option.key}`;
            const props = {};
            props.name = self.props.data.field_name;

            props.type = 'radio';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined &&
                (self.props.defaultValue.indexOf(option.key) > -1 || self.props.defaultValue.indexOf(option.value) > -1));
            }
            if (this.props.read_only) {
              props.disabled = 'disabled';
            }

            return (
              <div className={classNames} key={this_key}>
                <input id={`fid_${this_key}`} className="custom-control-input" ref={c => {
                  if (c && self.props.mutable) {
                    self.options[`child_ref_${option.key}`] = c;
                  }
                }} {...props} />
                <label className="custom-control-label" htmlFor={`fid_${this_key}`}>{option.text}</label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class Image extends React.Component {
  render() {
    const style = (this.props.data.center) ? { textAlign: 'center' } : null;

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style, ...style }} className={baseClasses} >
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        { this.props.data.src &&
          <img src={this.props.data.src} width={this.props.data.width} height={this.props.data.height} />
        }
        { !this.props.data.src &&
          <div className="no-image">No Image</div>
        }
      </div>
    );
  }
}

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.name = this.props.data.field_name;
    props.ratingAmount = 5;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.disabled = this.props.read_only;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <StarRating {...props} />
        </div>
      </div>
    );
  }
}

class HyperLink extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
        <label className={'form-label'}>
          <a target="_blank" href={this.props.data.href} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }}/>
          </label>
        </div>
      </div>
    );
  }
}

class Download extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <a href={`${this.props.download_path}?id=${this.props.data.file_path}`}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = { img: null, previewImg: null };
  }

  displayImage = (e) => {
    const self = this;
    const target = e.target;
    if (target.files && target.files.length) {
      self.setState({ img: target.files[0], previewImg: URL.createObjectURL(target.files[0]) });
    }
  };

  clearImage = () => {
    this.setState({
      img: null,
      previewImg: null,
    });
  };

  getImageSizeProps({ width, height }) {
    const imgProps = { width: '100%' };
    if (width) {
      imgProps.width = width < window.innerWidth
      ? width
      : 0.9 * window.innerWidth;
    }
    if (height) {
      imgProps.height = height;
    }
    return imgProps;
  }

  render() {
    const imageStyle = { objectFit: 'scale-down', objectPosition: (this.props.data.center) ? 'center' : 'left' };
    let baseClasses = 'SortableItem rfb-item';
    const name = this.props.data.field_name;
    const fileInputStyle = this.state.img ? { display: 'none' } : null;
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }
    let sourceDataURL;
    if (this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0) {
      if (this.props.defaultValue.indexOf(name > -1)) {
        sourceDataURL = this.props.defaultValue;
      } else {
        sourceDataURL = `data:image/png;base64,${this.props.defaultValue}`;
      }
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.read_only === true &&
          this.props.defaultValue &&
          this.props.defaultValue.length > 0 ? (
            <div>
              <img
                style={imageStyle}
                src={sourceDataURL}
                {...this.getImageSizeProps(this.props.data)}
              />
            </div>
          ) : (
            <div className="image-upload-container">
              <div style={fileInputStyle}>
                <input
                  name={name}
                  type="file"
                  accept="image/*"
                  capture="camera"
                  className="image-upload"
                  onChange={this.displayImage}
                />
                <div className="image-upload-control">
                  <div className="btn btn-default">
                    <i className="fas fa-camera"></i> Upload Photo
                  </div>
                  <p>Select an image from your computer or device.</p>
                </div>
              </div>

              {this.state.img && (
                <div>
                  <img
                    onLoad={() => URL.revokeObjectURL(this.state.previewImg)}
                    src={this.state.previewImg}
                    height="100"
                    className="image-upload-preview"
                  />
                  <br />
                  <div
                    className="btn btn-image-clear"
                    onClick={this.clearImage}
                  >
                    <i className="fas fa-times"></i> Clear Photo
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: props.defaultValue ? {
        name: props.defaultValue.name || 'Uploaded File',
        size: props.defaultValue.size || 0,
        type: props.defaultValue.type || 'application/octet-stream',
        data: props.defaultValue.data
      } : null
    };
  }

  displayFileUpload = (e) => {
    const self = this;
    const target = e.target;
    let file;

    if (target.files && target.files.length > 0) {
      file = target.files[0];
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        window.alert('File size exceeds 5MB limit. Please choose a smaller file.');
        target.value = ''; // Clear the input
        return;
      }
      const reader = new window.FileReader();
      reader.onload = (event) => {
        const binaryData = event.target.result;
        self.setState({
          fileUpload: {
            name: file.name,
            size: file.size,
            type: file.type,
            data: binaryData
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  clearFileUpload = () => {
    this.setState({
      fileUpload: null,
    });
  };

  saveFile = (e) => {
    e.preventDefault();
    if (this.state.fileUpload && this.state.fileUpload.data) {
      const link = document.createElement('a');
      link.href = this.state.fileUpload.data;
      link.download = this.state.fileUpload.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  render() {
    let baseClasses = 'SortableItem rfb-item';
    const name = this.props.data.field_name;
    const fileInputStyle = this.state.fileUpload ? { display: 'none' } : null;
    if (this.props.data.pageBreakBefore) {
      baseClasses += ' alwaysbreak';
    }
    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />

          <div className='image-upload-container'>
            <div style={fileInputStyle}>
              <input
                name={name}
                type='file'
                accept={this.props.data.fileType || '*'}
                className='image-upload'
                onChange={this.displayFileUpload}
              />
              <div className='image-upload-control'>
                <div className='btn btn-default'>
                  <i className='fas fa-file'></i> Upload File
                </div>
                <p>Select a file from your computer or device. (Max size: 5MB)</p>
              </div>
            </div>

            {this.state.fileUpload && (
              <div>
                <div className='file-upload-preview'>
                  <div
                    style={{ display: 'inline-block', marginRight: '5px' }}
                  >
                    {`Name: ${this.state.fileUpload.name}`}
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '5px' }}>
                    {this.state.fileUpload.size.length > 6
                      ? `Size:  ${Math.ceil(
                          this.state.fileUpload.size / (1024 * 1024)
                        )} mb`
                      : `Size:  ${Math.ceil(
                          this.state.fileUpload.size / 1024
                        )} kb`}
                  </div>
                </div>
                <br />
                <div
                  className='btn btn-file-upload-clear'
                  onClick={this.clearFileUpload}
                >
                  <i className='fas fa-times'></i> Clear File
                </div>
              </div>
            )}
          </div>

          {this.state.fileUpload && this.state.fileUpload.data && (
            <div>
              <button
                className='btn btn-default btn-download'
                onClick={this.saveFile}
              >
                <i className='fas fa-download'></i> Download File
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.state = {
      value: props.defaultValue !== undefined ? parseInt(props.defaultValue, 10) : parseInt(props.data.default_value, 10),
    };
  }

  changeValue = (e) => {
    const { target } = e;
    this.setState({
      value: target.value,
    });
  }

  render() {
    const props = {};
    const name = this.props.data.field_name;

    props.type = 'range';
    props.list = `tickmarks_${name}`;
    props.min = this.props.data.min_value;
    props.max = this.props.data.max_value;
    props.step = this.props.data.step;

    props.value = this.state.value;
    props.change = this.changeValue;

    if (this.props.mutable) {
      props.ref = this.inputField;
    }

    const datalist = [];
    for (let i = parseInt(props.min, 10); i <= parseInt(props.max, 10); i += parseInt(props.step, 10)) {
      datalist.push(i);
    }

    const oneBig = 100 / (datalist.length - 1);

    const _datalist = datalist.map((d, idx) => <option key={`${props.list}_${idx}`}>{d}</option>);

    const visible_marks = datalist.map((d, idx) => {
      const option_props = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length - 1) { w = oneBig / 2; }
      option_props.key = `${props.list}_label_${idx}`;
      option_props.style = { width: `${w}%` };
      if (idx === datalist.length - 1) { option_props.style = { width: `${w}%`, textAlign: 'right' }; }
      return <label {...option_props}>{d}</label>;
    });

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} duplicateCard={this.props.duplicateCard} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div className="range">
            <div className="clearfix">
              <span className="float-left">{this.props.data.min_label}</span>
              <span className="float-right">{this.props.data.max_label}</span>
            </div>
            <ReactBootstrapSlider {...props} />
          </div>
          <div className="visible_marks">
            {visible_marks}
          </div>
          <input name={name} value={this.state.value} type="hidden" />
          <datalist id={props.list}>
            {_datalist}
          </datalist>
        </div>
      </div>
    );
  }
}

FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.Label = Label;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.EmailInput = EmailInput;
FormElements.PhoneNumber = PhoneNumber;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.FileUpload = FileUpload;
FormElements.Range = Range;

export default FormElements;