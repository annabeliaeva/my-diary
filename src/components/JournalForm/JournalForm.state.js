export const INITIAL_STATE = {
	isFormValid: {
		header: true,
		date: true,
		post: true
	},
	values: {
		header: '',
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
			const headerValidity = state.values.header.trim().length
			const postValidity = state.values.post.trim().length
			const dateValidity = state.values.date
			return {
				...state,
				isFormValid: {
					header: headerValidity,
					date: dateValidity,
					post: postValidity
				},
				isFormReadyToSubmut: headerValidity && postValidity && dateValidity
			}
		}
		case 'SET_FIELD':
			return {
				...state, values: {
					...state.values,
					[action.field]: action.value,
				}
			}
		case 'CLEAR_FIELD':
			return {
				...state, values: INITIAL_STATE.values,
				isFormReadyToSubmut: false
			}
	}

}
