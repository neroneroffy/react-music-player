/**
 * Author: NERO
 * Date: 2020/1/31 0031
 * Time: 21:16
 *
 */
import React from 'react'
export default (props) => (
  <div>
    {props.in ? props.children() : null}
  </div>
)