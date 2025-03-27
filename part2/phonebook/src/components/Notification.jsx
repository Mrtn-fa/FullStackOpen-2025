const Notification = ({ message, type = 'success' }) => {
    console.log("type is", type)
    if (!message) {
        return null;
    }
    return (
        <div className={`notification ${type}`} > {message}</div >
    )
}

export default Notification;