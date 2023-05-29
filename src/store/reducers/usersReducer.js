const initState = {
	authorized: false,
	nickname : '',
	login : '',
	registred : '',
	catwarId : 0
}

export function userReducer(state = initState, action){
	switch(action.type){
		case 'LOGOUT':
			return initState
		case 'LOGIN':
			return {
				...state,
				authorized: true,
				nickname : action.nickname,
				login : action.login,
				registred : action.registred,
				catwarId : action.catwarId
			}
		default:
			return state
	}
}