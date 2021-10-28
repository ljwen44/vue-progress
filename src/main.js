import Vue from 'vue'
import App from './App.vue'

import { registerMicroApps, start, initGlobalState } from 'qiankun'
import store from './store/index.js'
import router from './router/index.js'
import ElementUI from 'element-ui';
import { looseEqual } from './utils/index'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/styles/custom.css'

Vue.config.productionTip = false
// 子应用需要支持跨域
const apps = [
	{
		name: 'vue-app',
		entry: '//localhost:8082',
		container: '#vue',
		activeRule: '/vue-qiankun',
		props: {
			state: store.state.childState
		}
	},
	{
		name: 'react-app',
		entry: '//localhost:8083',
		container: '#react',
		activeRule: '/react-qiankun',
		props: {
			state: {
				firstName: 'react',
				lastName: 'qiankun'
			}
		}
	}
]
let actions = initGlobalState({
	firstName: 'Zhou',
	lastName: 'Jie Lun'
})
actions.onGlobalStateChange((state, prev) => {
	if (!looseEqual(state, prev)) {
		console.log(state, prev)
	}
});
Vue.prototype.$actions = actions
registerMicroApps(apps, {
    beforeLoad: [
      app => {
		app.props.data = {
			lifeCycleData: 'beforeLoad'
		}
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
})

start({
	sandbox: {
		strictStyleIsolation: true
	}
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
