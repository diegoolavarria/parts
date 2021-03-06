import React from 'react'
import Select from 'react-select'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'

export default class SelectField extends React.Component {
  static propTypes = {
    fieldName: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    passProps: PropTypes.object,
    errorMessage: PropTypes.node,
    label: PropTypes.node,
    description: PropTypes.node,
    placeholder: PropTypes.string,
    multi: PropTypes.bool,
    options: PropTypes.array
  }

  static defaultProps = {
    options: []
  }

  state = {}

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.options, this.props.options)) {
      if (!this.getValue()) {
        this.props.onChange(null)
      }
    }
  }

  @autobind
  onChange(params) {
    const {multi} = this.props
    if (multi) {
      this.props.onChange(params.map(item => item.value))
    } else {
      if (params.value) {
        this.props.onChange(params.value)
      } else {
        this.props.onChange(null)
      }
    }
  }

  getValue() {
    const {value, options, multi} = this.props
    if (multi) {
      const selectedOptions = (value || []).map(optionValue =>
        (options || []).find(option => option.value === optionValue)
      )
      return selectedOptions.filter(option => !!option)
    } else {
      const selectedOption = options.find(option => option.value === value)
      if (!selectedOption) return null
      return selectedOption
    }
  }

  render() {
    return (
      <div>
        <div className="label">{this.props.label}</div>
        <Select
          classNamePrefix="orion-select"
          isMulti={this.props.multi}
          name={this.props.fieldName}
          value={this.getValue()}
          onChange={this.onChange}
          options={this.props.options}
          placeholder={this.props.placeholder}
          {...this.props.passProps}
        />
        <div className="description">{this.props.description}</div>
        <div className="os-input-error">{this.props.errorMessage}</div>
      </div>
    )
  }
}
