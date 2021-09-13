import axios from 'axios'
import * as urls from '../constants/urls'
import * as types from '../constants/ActionTypes'
export const fetchHomeData = () =>  {
    return (dispatch, getState) => {
      
        const url = `../../assets/data.json`
        return axios.get(url)
            .then(resp => {
              const { ret, data } = resp.data;
              if(ret) {
                  dispatch({
                      type: types.RECEIVE_HOME,
                      homeData: data.wx,
                  })
              } else {
                console.error(`接口报错：${url}; ${message};`)
              }
            })
    }
}
