// Survey Form add input from user
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipient List', name: 'emails' },

];

class SurveyForm extends Component {
	renderFields() {
		return (
			<div>
				{_.map(FIELDS, ({ name, label }) => {
						return <Field key={name} name={name} label={label} component={SurveyField} />
					})}
			</div>
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
					<button>Submit</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'surveyForm'
})(SurveyForm);