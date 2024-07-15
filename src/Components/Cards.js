import React, { useEffect, useRef } from 'react';
import '../Styles/Cards.css';

const cardData = [
  {
    title: 'Quality Servicing',
    description: 'Our Services are backed with 15 days service assurance for the works we performed on the vehicle.',
    logo: 'https://cdn-icons-png.flaticon.com/128/11125/11125966.png'
  },
  {
    title: 'Expert Workers',
    description: 'Our technicians frequently undergo trainings on product handling that make them expertise in complaint diagnosis.',
    logo: 'https://cdn-icons-png.flaticon.com/128/4170/4170616.png'
  },
  {
    title: 'Genuine Spare Parts',
    description: 'We use only genuine spare parts and branded lubricants which will ensure your vehicle hassle free running.',
    logo: 'https://cdn-icons-png.flaticon.com/256/9666/9666230.png'
  }
];

const Cards = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = cardRefs.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            if (index !== -1) {
              setTimeout(() => {
                entry.target.classList.add('show');
              }, index * 1000); 
            }
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="cards-container">
      {cardData.map((card, index) => (
        <div key={index} className="card" ref={el => (cardRefs.current[index] = el)}>
          <img src={card.logo} alt={`${card.title} logo`} className="card-logo" />
          <div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
