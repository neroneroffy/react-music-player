import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
const Abc = () => {
  return <div>
    abc
    <CSSTransitionGroup
      transitionName='cool-player-list-show'
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    ></CSSTransitionGroup>
  </div>
}
export default Abc