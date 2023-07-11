import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAddTask }) => {
  return (
    <div>
      <header className='header'>
        <h1>{ title }</h1>
        <Button color={ showAddTask ? 'orange' : 'green' }
                text={ showAddTask ? 'Close' : 'Add' }
                onClick={ onAdd }/>
      </header>
    </div>
  );
};

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.protoTypes = {
  title: PropTypes.string.isRequired,
}

//info CSS in React style={ headerStyle }
// const headerStyle = {
// color: 'red',
// backgroundColor: 'green' }

export default Header;
