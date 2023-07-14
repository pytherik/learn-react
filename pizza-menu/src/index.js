import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const Header = () => {
  return (
    <header className="header">
      <h1>Fast Pizza Shit</h1>
    </header>
  )
}

const Pizza = ({ pizzaObj }) => {
  // if (pizzaObj.soldOut === true) return null;

  return (
    <div className={`pizza ${pizzaObj.soldOut && 'sold-out'}`}>
      <img src={ pizzaObj.photoName } alt={pizzaObj.name}/>
      <li>
        <h3>{ pizzaObj.name }</h3>
        <p>{ pizzaObj.ingredients }</p>
        <span>{ pizzaObj.soldOut ? 'Ausverkauft' : pizzaObj.price }</span>
      </li>
    </div>
  )
}

const Menu = () => {
  const pizzas =  pizzaData;

  return (
    <div className="menu">
      <h2>Our Angebot</h2>
      { pizzas.length > 0 ? ( //info beim rendern von Listen wird ein key benötigt.
                              // Dann muss <React.Fragment key="blabla"> anstelle von <>
                              // verwendet werden.
        <>
          <p>
            Echte Tiefkühlpizza von Lidl oder Aldi aus dem 5er Pack. Wir backen schonend
            im Wasserbad und servieren lauwarm und vorgekaut.
          </p>
      <ul className="pizzas">
        {pizzas.map(pizza => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
        ))}
      </ul>
        </>
        ) : <h3 style={{ fontSize: '2rem' }}>Nüscht mehr da, komm morgen wieder!</h3>
      }
    </div>
  )
}

const Order = ({ closehour }) => {
  return (
  <footer className="footer">
    <div className="order">
      <p>Wir haben open bis { closehour }:00. Komm vorbei oder lass es einfach sein!</p>
      <button className="btn">Bestell mich!</button>
    </div>
  </footer> )


}
const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closehour = 22;
  const isOpen = hour >= openHour && hour <= closehour

  return <footer className="footer">
    {isOpen ? (
      <Order closehour={ closehour } />
      ) : <h1>Wir ham zuhu!</h1>}
  </footer>
}


const  App = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
