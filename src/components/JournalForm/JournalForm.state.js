export const INITIAL_STATE = {
	isFormValid: {
		header: true,
		date: true,
		post: true
	},
	values: {
		header: undefined,
		date: undefined,
		post: undefined
	},
	isFormReadyToSubmut: false
}

export function formReducer(state, action) {
	switch (action.type) {
		case 'RESET_VALIDITY':
			return { ...state, isFormValid: INITIAL_STATE.isFormValid }
		case 'SUBMIT': {
			const headerValidity = action.payload.header.trim().length
			const postValidity = action.payload.post.trim().length
			const dateValidity = action.payload.date
			return {
				values: action.payload,
				isFormValid: {
					header: headerValidity,
					date: dateValidity,
					post: postValidity
				},
				isFormReadyToSubmut: headerValidity && postValidity && dateValidity
			}
		}
	}

}
