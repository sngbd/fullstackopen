import React from 'react'

const Course = ({courses}) => {
  // const course = courses.parts
  return (
    <div>
      {courses.map(course => 
        <div key={course.id}>
          <h2 key={course.id}>{course.name}</h2>
          {course.parts.map(part =>
            <p key={part.id}>{part.name} {part.exercises}</p>
          )}
          <b>total of {course.parts.reduce((p, c) => p + c.exercises, 0)} exercises</b>
        </div>
      )}
    </div>
  )
}

export default Course