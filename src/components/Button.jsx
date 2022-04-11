import PropTypes from 'prop-types'

export default function Button({onClick, text, type, className}){
    let classes = `max-h-12 px-4 py-3 lg:px-6 text-white text-sm font-normal rounded-md hover:opacity-90 ${className}`
    return (
        <button type={type} onClick={onClick} className={classes} >{text}</button>
    )
}

Button.defaultProps = {
    type: "button",
}

Button.propTypes = {
    text: PropTypes.string.isRequired
}