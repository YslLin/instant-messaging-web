import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
	strict: true, // 严格模式, 状态变更不是由 mutation 函数引起的，将会抛出错误。
	state,
	mutations,
	modules
})

export default store