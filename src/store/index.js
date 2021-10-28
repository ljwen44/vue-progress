import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		childState: {
			firstName: 'Lin',
			lastName: 'Jun Jie'  
		}
	},
	mutations: {
		setChildState(state, data) {
			state.childState = data
		},
		changeChildState(state, data) {
			state.childState = data
		}
	}
})
export default store