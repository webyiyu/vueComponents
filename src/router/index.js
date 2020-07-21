import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import CheckBox from '@/pages/checkbox';
import HelloWorld from "@/pages/helloworld";
import Display from "@/pages/display";
import Alert from "@/pages/alert"

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/checkbox',
            name: 'CheckBox',
            component: CheckBox
        },
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/display',
            name: 'Display',
            component: Display
        },
        {
            path: '/alert',
            name: 'Alert',
            component: Alert
        },

    ]
})