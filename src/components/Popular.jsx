import { useEffect, useState } from "react";
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';


function Popular() {


  
  const [popular, setPopular] = useState([]);

  useEffect(() =>{
    getPopular();
  }, []);
  
  // Checking if popular is saved in our storage
  const getPopular = async () => {

    const check = localStorage.getItem('popular');


    // If there is, then we dont do fetching, if no, well do fetching
    if(check){
      setPopular(JSON.parse(check));
    }else{
       const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=446c2ef054c44530b5968e19217fb438&number=9`
      );
          const data = await api.json();

          localStorage.setItem('popular', JSON.stringify(data.recipes));
          setPopular(data.recipes);
          console.log(data.recipes);
    }
  };
  
  
  
  
  return <div>
     
       
       <Wrapper>
        <h3>Popular Picks</h3>

          <Splide options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
          }}>

        {popular.map((recipe) => {
          return(
            <SplideSlide key={recipe.id}>
            <Card>
              <Link to={'/recipe/' + recipe.id}>
              <p>{recipe.title}</p>
              <img src={recipe.image} alt={recipe.title} />
              <Gradient />
               </Link>
            </Card>
            </SplideSlide>
          );
        })}
        </Splide>
       </Wrapper>
        
     
    </div>; 
}

const Wrapper = styled.div`
margin: 4rem 0rem;
`
const Card = styled.div`
min-height: 15rem;
border-radius: 2rem;
overflow: hidden;
position: relative;

img{
  border-radius: 2rem;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

p{
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 7%;
  transform: translate(-50%, 0%);
  color: white;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

}

`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;



export default Popular;