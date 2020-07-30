// state
const state = {
    token:'',
    username:'',
}
// mutations
const mutations = {
    set_token(state, token) {
        state.token = token
        localStorage.token = token
    },
    set_username(state, username) {
        state.username = username
        localStorage.username = username
    },
}
// getters
const getters = {}
// actions
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

