import { useState ,forwardRef,useImperativeHandle } from 'react'
//import PropTypes from 'prop-types'
const Toggleable=forwardRef((props,refs) => {
  const[visible,setVisible]=useState(false)
  const hide={ display:visible?'none':'' }
  const show={ display:visible?'':'none' }
  const toggle=() => {
    setVisible(!visible)
  }
  useImperativeHandle(refs,() => {
    return{
      toggle
    }
  })
  return(
    <div>
      <div style={hide}>
        <button onClick={toggle}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  )
}
)
Toggleable.displayName='Toggleable'

// Toggleable.propTypes={
//   buttonLabel:PropTypes.string.isRequired
// }
export default Toggleable