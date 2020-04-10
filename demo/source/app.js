

import React from '@react';

import './pages/index/index';

import Reporter from '@sniperjs/miniwx';

var x = new Reporter({
    url: 'http://127.0.0.1:3000/mini/statistics'
});

// var fundebug = require('./fundebug.1.3.1.min.js');
// fundebug.init(
// {
//     apikey : 'd4db63d829cc23a52a508a9ad904b3a4009efb148f671f383a64ab45993f677'
// })

// console.log(fundebug);

class Global extends React.Component {
    globalData = {}
    static config = {
        window: {
            navigationBarBackgroundColor: '#00afc7',
            backgroundTextStyle: 'light',
            navigationBarTitleText: 'nanachi',
            navigationBarTextStyle: 'white'
        }
    };
    onLaunch() {
        // console.log(bb);
        //针对快应用的全局getApp补丁
        if (this.$data && typeof global === 'object') {
            var ref = Object.getPrototypeOf(global) || global;
            var _this = this;
            this.globalData = this.$def.globalData;
            ref.getApp = function() {
                return _this;
            };
        }
        //console.log('App launched');//eslint-disable-line
    }
    onError(e) {
        
    }
    onUnhandledRejection(e) {
        //console.log(e.reason instanceof Error, e, 222);
    }
}
// eslint-disable-next-line
export default App(new Global());
