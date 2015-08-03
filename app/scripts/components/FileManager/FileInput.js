import React, {Component, PropTypes} from 'react';
import cx from 'bem-classnames';
import bem from './bem-classes';

export default class FileInput extends Component {
	constructor() {
		super();
		this._onChange = this._onChange.bind(this);
	}

	onClick() {
		this.refs.fileInput.getDOMNode().click();
	}

	_onChange() {
		this.props.onChange && this.props.onChange(this.refs.fileInput.getDOMNode().files);
	}

	render() {
		return (
			<div className={cx(bem.file)}>
				<input
						accept={this.props.accept.join(',')}
						multiple={this.props.multiple ? true : false}
						ref="fileInput"
						onChange={this._onChange}
						type="file" />
			</div>
		);
	}

}

FileInput.defaultProps = {multiple: false};

FileInput.propTypes = {
	multiple: PropTypes.bool,
	accept: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func
};
