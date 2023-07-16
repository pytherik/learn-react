import { useState } from 'react';

import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit." +
      " Accusantium, quaerat temporibus quas dolore provident nisi ut" +
      " aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt " +
      "commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis " +
      "aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];


const AccordionItem = ({ num, title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const icon = isOpen ? '-' : '+';

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`item ${isOpen && "open"}`} onClick={ handleToggle }>
      <p className="number">{ `0${num + 1}`.slice(-2) }</p>
      <p className="text">{ title }</p>
      <p className="icon">{ icon }</p>
      { isOpen && <div className="content-box">{text}</div>}
    </div>
  )
}


const Accordion = ({ data }) => {
  return (
    <div className="accordion">
      { data.map((el, idx) => <AccordionItem title={ el.title }
                                             num={ idx }
                                             text={ el.text }
                                             key={idx}/>)}
     </div>
  );
}

const App = () => {
  return (
    <div>
      <Accordion data={faqs}/>
    </div>
  );
}

export default App;
