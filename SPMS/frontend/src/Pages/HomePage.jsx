import React from 'react'

export const HomePage = () => {
  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
        <h1>Welcome Message</h1>
      <h2>Course Categories</h2>
      <ul>
        <li>
          <strong>Common Core (Semester 1 & 2)</strong>
          <ul>
            <li>Semester 1 (2)</li>
            <li>Semester 2 (2)</li>
          </ul>
        </li>
        <li>
          <strong>Computer Engineering</strong>
          <ul>
            <li>Semester 3 (9)</li>
            <li>Semester 4 (6)</li>
            <li>Semester 5 (10)</li>
          </ul>
        </li>
      </ul>
    </div>

  )
}
