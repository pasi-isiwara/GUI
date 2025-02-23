import React from 'react'
import NavBar from "./NavBar";

export const Course = () => {
  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
        <NavBar />
    <h1>MODULE NAME <span style={{ float: "right" }}>total hrs</span></h1>
    
    <h2>Contents</h2>
    <ul>
      <li>#Content1 <span style={{ float: "center" }}>tick (completed or not)</span></li>
      <li>#Content1 <span style={{ float: "center" }}>tick (completed or not)</span></li>
      <li>#Content1 <span style={{ float: "center" }}>tick (completed or not)</span></li>
      <li>#Content1 <span style={{ float: "center" }}>tick (completed or not)</span></li>
      <li>#Content1 <span style={{ float: "center" }}>tick (completed or not)</span></li>
      <li>#Content1 <span style={{ float: "center" }}>tick (completed or not)</span></li>
    </ul>
    
    <h2>Continuous Assessments</h2>
    <p>CA-1 Marks out of 40</p>
    <p>CA-1 Marks out of 40</p>
    <p>CA-1 Marks out of 40</p>
    <p>CA-1 Marks out of 40</p>
    
    <h2>More Marks You Need to Get</h2>
    <p>A pass - 34</p>
    <p>B pass - 34</p>
    <p>C pass - 34</p>
    <p>D pass - 34</p>
  </div>
  )
}
