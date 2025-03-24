import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    const { _, name, parts } = course;


    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )

}

const Courses = ({ courses }) => {
    return courses.map((course) => <Course course={course} key={course.id} />)
}

export default Courses