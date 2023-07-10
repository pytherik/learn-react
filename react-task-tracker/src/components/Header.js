import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title }) => {
  const onClick = () => {
    console.log('click');
  }
  return (
    <div>
      <header className='header'>
        <h1>{title}</h1>
        <Button color='green' text='Add' onClick={onClick}/>
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
