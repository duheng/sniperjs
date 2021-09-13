import style from './style'

export const TopNav= props => {
  const { data } = props
  return <div className='TopNav'>
           <div className='TopNav-Wrap'>
            {
              Object.keys(data).map(item=>{
                const __item = data[item]
                return <div key={__item.bizTitle} className='TopNav-Item'>
                          <img src={__item.logoSrc} />
                          <span>{__item.bizTitle}</span>
                       </div>
              })
            }
     </div>
  </div>
}

export default TopNav
