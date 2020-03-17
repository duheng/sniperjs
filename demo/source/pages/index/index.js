import React from '@react';
import { GlobalTheme } from '@common/GlobalTheme/index'; //@common 别名在package.json中配置
import Layout from '@components/Layout/index';
import AnotherComponent from '@components/AnotherComponent/index';
import './index.scss';


// import { observer, inject } from 'mobx-react';
// import { toJS } from 'mobx';

// console.log(observer);
// console.log(toJS);
// console.log(inject);


// var fac = function(){
//     console.log(123);
//   }
  
  
  // 这里是模块定义A1模块
  // define('A1', function(){
  //   return {
  //     a: 1,
  //     b: 2
  
  //   }
  // })
  
//   if (typeof exports === 'object' && typeof module !== 'undefined' ) {
//     fac();
//   } else {
//     define(['A1'], function (a) {
//       console.log(a);
//     })
//   }



var mmm = 0;
class P extends React.Component {
    state = {
        anyVar: { color: 'red' },
        list: {
            a: {
                b: []
            }
        }
    };
    componentDidMount() {
        // eslint-disable-next-line
      //console.error('2323423');

      function p() {
        return new Promise((rel, rej) => {
            rej(new Error('sdfsdfs'));
        });
    }

    p();

        //console.log(abc);
       wx.request({
            url: 'https://beta.bayeasy.cn/api/wxapp/company/agreement2',
            method: 'POST',
            timeout: 5000,
            data: {
                a: 1,
                b: 2,
                c: 3
            },
            header: {
                'content-type': 'application/json'
            }
            
       });


        

    }
    onTap(e) {
        
        if (mmm === 3) {
            var x = {
                y: null
            }
            console.log(x.y());
        }
        mmm++;
        
    }
    onTap2() {
        console.log(123);
    }
    render() {
        console.log(this.state.anyVar, '!!')
        return (<div class="page" >
            <button data-x={this.state.anyVar}  onTouchStart = {this.onTap.bind(this)}>234</button>
            <button onTap = {this.onTap2.bind(this)}>last</button>
            {/* {
                this.state.list?.a?.b.map(function(el){
                return <div>{el.id}</div>
                })
            } */}

            <div onTouchStart={this.onTap.bind(this)} >2234234</div>
        </div>
        );
    }
}



export default P;