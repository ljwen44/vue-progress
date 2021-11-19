import Vue from 'vue'
import App from './App.vue'

import store from './store/index.js'
import router from './router/index.js'
import ElementUI from 'element-ui';
import { looseEqual } from './utils/index'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/styles/custom.css'

import proxySandBox from './proxySandbox.js'
import snapshotSandbox from './snapshotSandbox.js'

Vue.config.productionTip = false


import { registerMicroApps, start, initGlobalState } from 'qiankun'
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


// ------沙箱---proxy
const sandBox = new proxySandBox('proxy沙箱', { document: window.document })
sandBox.active()
const sandboxProxy = sandBox.proxy
sandboxProxy.varient = 'js沙箱--sandboxProxy1'
window.varient = 'js沙箱--window1'
console.log(sandboxProxy.varient, window.varient)
sandBox.inactive()
sandboxProxy.varient = 'js沙箱--sandboxProxy2'
window.varient = 'js沙箱--window2'
console.log(sandboxProxy.varient, window.varient)
// ------沙箱


// ------沙箱---snapshot
const sandBox1 = new snapshotSandbox('snapshot沙箱')
sandBox1.active();  // 激活沙箱
window.varient1 = 'snapshot---1'
console.log('开启沙箱：', window.varient1);
sandBox1.inactive(); //失活沙箱
console.log('失活沙箱：', window.varient1);
sandBox1.active();   // 重新激活
console.log('再次激活', window.varient1);
// ------沙箱




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
