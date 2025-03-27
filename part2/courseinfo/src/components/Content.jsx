const Part = ({ props }) => {
    const { name, exercises, id } = props;

    return (
        <p>{name} {exercises}</p>
    )
}


const Content = ({ parts }) => {
    return parts.map((part) => <Part props={part} key={part.id} />);
}

export default Content;