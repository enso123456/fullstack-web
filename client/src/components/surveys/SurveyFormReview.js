import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({onCancel, formValues}) => {
	const reviewfields = _.map(formFields, ({ label, name }) => {
		return (
			<div>
				<label>{label}</label>
				<div>
					{formValues[name]}
				</div>
			</div>
		)
	});

	return (
		<div>
			<h5>Show your survey review</h5>
			{reviewfields}
			<button 
				className="yellow darken-3 btn-flat"
				onClick={onCancel}
			>
				Cancel
			</button>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		formValues: state.form.surveyForm.values
	}
}

export default connect(mapStateToProps)(SurveyFormReview);