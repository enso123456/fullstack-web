// Survey Form add input from user
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return (
			<div>
				{_.map(FIELDS, ({ name, label }) => {
					return (
						<Field 
							key={name} 
							name={name} 
							label={label} 
							component={SurveyField} 
						/>
					)
				})}
			</div>
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="btn-flat orange left white-text">
						Cancel
					</Link>

					<button type="submit" className="teal btn-flat right white-text">
						Submit
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {}

	errors.recipients = validateEmails(values.recipients || '')

	_.each(FIELDS, ({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide ${name}`;
		}
	});


	return errors;
}


export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);

