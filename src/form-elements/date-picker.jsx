import React from 'react';
import { format, parse, isValid } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();

    const { formatMask } = DatePicker.updateFormat(props, null);
    this.state = DatePicker.updateDateTime(props, { formatMask }, formatMask);
  }

  // formatMask = '';

  handleChange = (dt) => {
    // This handler is called when a date is selected from the picker calendar or cleared
    const { formatMask } = this.state;
    if (!dt || (dt && !dt.target)) {
      // Date selected from picker or cleared (dt is null when clear button is clicked)
      this.setState({
        value: (dt) ? format(dt, formatMask) : '',
        internalValue: dt || undefined,
        placeholder: dt ? '' : formatMask.toLowerCase(),
      });
    }
  };

  formatDateInput = (input) => {
    // Remove all non-numeric characters
    const digitsOnly = input.replace(/\D/g, '');
    const { formatMask } = this.state;

    if (digitsOnly.length === 0) {
      return '';
    }

    // Analyze the format mask to determine the date format structure
    // Common formats: MM/dd/yyyy, dd/MM/yyyy, yyyy/MM/dd, etc.
    const formatLower = formatMask.toLowerCase();

    // Determine the separator used in the format
    const separator = formatMask.match(/[^a-zA-Z0-9]/)?.[0] || '/';

    // Determine the positions of day, month, and year in the format
    const monthIndex = formatLower.indexOf('m');
    const dayIndex = formatLower.indexOf('d');
    const yearIndex = formatLower.indexOf('y');

    // Create an array of format parts with their positions
    const formatParts = [
      { type: 'month', index: monthIndex, length: 2 },
      { type: 'day', index: dayIndex, length: 2 },
      { type: 'year', index: yearIndex, length: 4 },
    ].sort((a, b) => a.index - b.index);

    // Format the digits based on the detected format
    let formatted = '';
    let digitIndex = 0;

    for (let i = 0; i < formatParts.length; i++) {
      const part = formatParts[i];
      const partLength = part.length;

      if (digitIndex >= digitsOnly.length) {
        break;
      }

      const partDigits = digitsOnly.slice(digitIndex, digitIndex + partLength);
      formatted += partDigits;
      digitIndex += partLength;

      // Add separator after each part except the last one
      if (i < formatParts.length - 1 && digitIndex < digitsOnly.length) {
        formatted += separator;
      }
    }

    return formatted;
  };

  handleChangeRaw = (e) => {
    // This handler is called when the user manually types in the input field
    const inputValue = e.target.value;
    const { formatMask } = this.state;

    // If input is empty, clear the date
    if (inputValue === '') {
      this.setState({
        value: '',
        internalValue: undefined,
        placeholder: formatMask.toLowerCase(),
      });
    }

    // Allow typing - React DatePicker will handle the input display
  };

  handleBlur = (e) => {
    // This handler is called when the input loses focus (on blur)
    const inputValue = e.target.value;
    const { formatMask } = this.state;

    // If input is empty, just clear
    if (inputValue === '') {
      this.setState({
        value: '',
        internalValue: undefined,
        placeholder: formatMask.toLowerCase(),
      });
      return;
    }

    // Auto-format the input on blur (e.g., "08081995" -> "08/08/1995")
    const formattedInput = this.formatDateInput(inputValue);

    // Try to parse the formatted input
    try {
      const parsedDate = parse(formattedInput, formatMask, new Date());

      // Check if the parsed date is valid
      if (isValid(parsedDate)) {
        const finalFormattedDate = format(parsedDate, formatMask);
        this.setState({
          value: finalFormattedDate,
          internalValue: parsedDate,
          placeholder: '',
        });
      } else {
        // Invalid date after formatting - clear the input
        this.setState({
          value: '',
          internalValue: undefined,
          placeholder: formatMask.toLowerCase(),
        });
      }
    } catch (error) {
      // Parsing failed - clear the input
      this.setState({
        value: '',
        internalValue: undefined,
        placeholder: formatMask.toLowerCase(),
      });
    }
  };

  static updateFormat(props, oldFormatMask) {
    const { showTimeSelect, showTimeSelectOnly, showTimeInput } = props.data;
    const dateFormat = showTimeSelect && showTimeSelectOnly ? '' : props.data.dateFormat;
    const timeFormat = (showTimeSelect || showTimeInput) ? props.data.timeFormat : '';
    const formatMask = (`${dateFormat} ${timeFormat}`).trim();
    const updated = formatMask !== oldFormatMask;

    return { updated, formatMask };
  }

  static updateDateTime(props, state, formatMask) {
    let value;
    let internalValue;
    const { defaultToday } = props.data;
    if (defaultToday && (props.defaultValue === '' || props.defaultValue === undefined)) {
      value = format(new Date(), formatMask);
      internalValue = new Date();
    } else {
      value = props.defaultValue;

      if (value === '' || value === undefined || value === null) {
        internalValue = undefined;
      } else {
        internalValue = parse(value, state.formatMask, new Date());
      }
    }
    return {
      value,
      internalValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday,
      formatMask: state.formatMask,
    };
  }

  // componentWillReceiveProps(props) {
  //   const formatUpdated = this.updateFormat(props);
  //   if ((props.data.defaultToday !== !this.state.defaultToday) || formatUpdated) {
  //     const state = this.updateDateTime(props, this.formatMask);
  //     this.setState(state);
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    const { updated, formatMask } = DatePicker.updateFormat(props, state.formatMask);
    if ((props.data.defaultToday !== state.defaultToday) || updated) {
      const newState = DatePicker.updateDateTime(props, state, formatMask);
      return newState;
    }
    return null;
  }

  render() {
    const { showTimeSelect, showTimeSelectOnly, showTimeInput } = this.props.data;
    const props = {};
    props.type = 'date';
    props.className = 'form-control';
    props.name = this.props.data.field_name;
    const readOnly = this.props.data.readOnly || this.props.read_only;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const placeholderText = this.state.formatMask.toLowerCase();

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses} style={{ ...this.props.style }}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div>
            { readOnly &&
              <input type="text"
                     name={props.name}
                     ref={props.ref}
                     readOnly={readOnly}
                     placeholder={this.state.placeholder}
                     value={this.state.value}
                     className="form-control" />
            }
            { iOS && !readOnly &&
              <input type="date"
                     name={props.name}
                     ref={props.ref}
                     onChange={this.handleChange}
                     dateFormat="MM/DD/YYYY"
                     value={this.state.value}
                     className = "form-control" />
            }
            { !iOS && !readOnly &&
              <ReactDatePicker
                name={props.name}
                ref={props.ref}
                onChange={this.handleChange}
                onChangeRaw={this.handleChangeRaw}
                onBlur={this.handleBlur}
                selected={this.state.internalValue}
                todayButton={'Today'}
                className = "form-control"
                isClearable={true}
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={showTimeSelectOnly}
                showTimeInput={showTimeInput}
                dateFormat={this.state.formatMask}
                portalId="root-portal"
                autoComplete="off"
                placeholderText={placeholderText} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DatePicker;
