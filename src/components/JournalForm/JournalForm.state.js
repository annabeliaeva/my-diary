export const INITIAL_STATE = {
	isFormValid: {
		title: true,
		date: true,
		post: true
	},
	values: {
		title: '',
		date: '',
		post: '',
		tag: ''
	},
	isFormReadyToSubmut: false
}

export function formReducer(state, action) {
	switch (action.type) {
		case 'RESET_VALIDITY':
			return { ...state, isFormValid: INITIAL_STATE.isFormValid }
		case 'SUBMIT': {
			const titleValidity = state.values.title?.trim().length;
			const postValidity = state.values.post?.trim().length;
			const dateValidity = state.values.date;
			return {
				...state,
				isValid: {
					post: postValidity,
					title: titleValidity,
					date: dateValidity
				},
				isFormReadyToSubmut: titleValidity && postValidity && dateValidity
			}
		}
		case 'SET_FIELD':
			return { ...state, values: { ...state.values, ...action.payload } };
		case 'UPDATE_FORM':
			return {
				...state, values: { ...state.values, ...action.data }
			}
		case 'CLEAR_FIELD':
			return {
				...state,
				values: INITIAL_STATE.values,
				isFormReadyToSubmut: false
			}
	}

}
