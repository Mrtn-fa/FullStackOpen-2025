const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ props }) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part props={parts[0]} />
      <Part props={parts[1]} />
      <Part props={parts[2]} />
    </div>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.map((a) => { return a.exercises });
  return (
    <p>Number of exercises {exercises.reduce((acc, curr) => { return acc + curr }, 0)}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App