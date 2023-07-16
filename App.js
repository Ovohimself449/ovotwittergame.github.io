import './App.css';
import Images from './Images'
import { useState } from 'react'
import {shuffle} from 'lodash'
import ovo from './media/ovodesign.jpg'
import Confetti from 'react-confetti'


function App() {
  const [ cards, setCards] = useState( shuffle([...Images, ...Images]) );
  const [ activeCards , setActiveCards ] = useState ([])
  const [ foundMatches, setFoundMatches ] = useState([])
  const [ clickAmount, setClickAmount ] = useState(0)
  const [won , setWon ] = useState(false)
  const [remove, setRemove] = useState(false)


function flipCard(index){
  if(won){
    setCards(shuffle([...Images, ...Images]));
    setFoundMatches([])
    setWon(false)
    setClickAmount(0)
  }

  if (activeCards.length === 0){
     setActiveCards([index]);
  }
  if (activeCards.length === 1){
    setActiveCards([...activeCards, index])
  //const firstCard = activeCards[0];
    //const secondCard = index;

    if( cards[activeCards[0]] === cards[index]){
      

      
      alert('Youve found Two Influencers, keep going!!!')
      setFoundMatches( [ ...foundMatches, activeCards[0], index ] );

      if( foundMatches.length + 2 === cards.length){
        setWon(true)

      }

    }
    setActiveCards([...activeCards, index])
  }
  if(activeCards.length === 2){
    setActiveCards([index])
    /*you have to put index inside instead of leaving an empty array */
  }
    setClickAmount( clickAmount + 1);

}

const removewin =() => {
    setRemove(!remove)
}



  return (
    
    <div className="app">
      <header>
        <img src={ovo} className="ovo-image"/>
        <h1>Let's see your Memory</h1>
        <p>Find two Influencers of the same Avi</p>
      </header>
      <div className="board" >
        {cards.map((card, index) => {
          const flippedToFront = (activeCards.indexOf(index)  !== -1) || foundMatches.indexOf(index) !== -1;

          return(
            <div className={"card-outer " + ( flippedToFront ? 'flipped' : '')}
          onClick ={() => flipCard(index)} >
            <div  className="card">
              <div className="front" >
                <img src={card} alt="" />
              </div>
              <div className="back" > </div>
            </div>
          </div>
           );
        }
           
         )}
        

      </div>

      <div className="stats">  
        Clicks: {clickAmount } &nbsp; &nbsp; &nbsp; Found Matches: {foundMatches.length/2}
      </div> 
        {won && (
                  <div className="winner" id={ remove ? 'remove' : ''}>
                    <h1>You won the game werey </h1><br/> 
                    <button onClick={removewin}> ok</button> 
                    <p className="follow">Follow Me on Twitter, Dm me for responsive sites</p>
                  </div>
                )}
                {won && <Confetti className="confetti" id={ remove ? 'remove' : ''} />}
    </div>
  );
}

export default App;
