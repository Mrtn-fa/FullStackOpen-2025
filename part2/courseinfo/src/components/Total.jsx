const Total = ({ parts }) => {
    const exercises = parts.map((p) => p.exercises)
    return (
        <b>total of {exercises.reduce((acc, curr) => acc + curr, 0)} exercises</b>
    )
}

export default Total;