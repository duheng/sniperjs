# sniperjs 前端错误日志无侵入搜集和上报

简单可依赖的自动搜集前端错误并上报，支持小程序（微信、百度、支付宝、头条、快应用）、浏览器。

# 特性
1. 无侵入搜集 Js 报错。
2. 自动搜集 http 错误。
3. 自动捕捉 promise rejection。
4. 还原报错时用户操作历史。
5. 自定义上报方式。
   

# 安装

```
npm install sniperjs
```

# 使用方式

> sniperjs 需在所有库加载之前完成初始化

1. 引用对应端的的SDK。
2. 实例化。

### 引用（目前只支持微信小程序）
```
// 微信小程序
import Sniper from '@sniperjs/miniwx'; 
// 浏览器端
import Sniper from '@sniperjs/brower'; 
```

### 实例化
```
new Sniper({
    url: 'your request api'
});
```

### 日志格式
```
{
	"agent": "WX_MINI_APP",
	"system": {
		
	},
	"logs": [{
		"stack": "thirdScriptError\nabc is not defined;at \"pages/index/index\" page lifeCycleMethod onReady function\nReferenceError: abc is not defined\n    at Ctor.componentDidMount (http://127.0.0.1:20424/appservice/pages/index/index.js:72:17)\n    at Se.onReady (http://127.0.0.1:20424/appservice/ReactWX.js:3084:11)\n    at Se.<anonymous> (http://127.0.0.1:20424/appservice/__dev__/WAService.js:2:1674902)\n    at Se.p.__callPageLifeTime__ (http://127.0.0.1:20424/appservice/__dev__/WAService.js:2:1674647)\n    at http://127.0.0.1:20424/appservice/__dev__/WAService.js:2:1698166\n    at Function.<anonymous> (http://127.0.0.1:20424/appservice/__dev__/WAService.js:2:1698955)\n    at http://127.0.0.1:20424/appservice/__dev__/WAService.js:2:1666024\n    at http://127.0.0.1:20424/appservice/__dev__/WAService.js:2:726686\n    at http://127.0.0.1:20424/appservice/__dev__/WAService.js:2:724745\n    at n (http://127.0.0.1:20424/appservice/__dev__/asdebug.js:1:27894)",
		"line": "72",
		"col": "17",
		"file": "http://127.0.0.1:20424/appservice/pages/index/index.js",
		"type": "ReferenceError",
		"value": "abc is not defined",
		"time": 1586930000288,
		"pageRoute": {
			"path": "pages/index/index",
			"query": {}
		},
		"breadcrumbs": []
	}]
}
}
```

### 配置参数说明

| 参数 | 说明 | 类型   | 默认值 | 必选 |
| --- | --- | --- | --- | --- |
| url | 上报接口地址  | String  | 空字符串  | 是  |
| ignoreErrors | 上报错误类型忽略 | Array<RegExp\|String> | 空数组 | 否  |
| random | 随机上报 | Number | 1 | 否  |
| repeat | 重复记录次数、超过该记录的错误不上报 | Number | 5 | 否 |
| delay | 延迟后合并上报 | Number | 1000（毫秒） | 否 |
| autoBreadcrumbs | 是否上报用户操作历史 | Boolean | true | 否 |
| breadcrumbsMax | 最多记录最近几次用户操作记录 | Number | 5 | 否  |
| beforeReport | 上报前回调函数，可在这里劫持上报日志做处理，或者在这里自定义上报方式 |  Function| function(log){return log}  |否  |


# 常见问题
- FAQ

# 开发
```
# 克隆仓库
git clone https://github.com/taotao9125/sniperjs.git

# 安装依赖
npm install

# Bootstrap lerna 依赖包
npm run bootstrap

# watch
npm run watch
```




