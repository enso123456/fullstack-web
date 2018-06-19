import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions/';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewfields = _.map(formFields, ({ label, name }) => {
		return (
			<div key={name}>
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
			<button 
				className="green darken-3 btn-flat right white-text"
				onClick={() => submitSurvey(formValues, history)}
			>
				Submit review
				<i className="material-icons right">email</i>
			</button>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		formValues: state.form.formValues.value
	}
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));