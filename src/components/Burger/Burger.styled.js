import styled from 'styled-components';

export const StyledBurger = styled.button`
  position: absolute;
  top: 8.5vh;
  left: 1.2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.8vw;
  height: 4vh;
  background: transparent;
  border: none;
  cursor: pointer;

  padding-left: 0.4vw;
  padding-right:0.4vw;
  padding-top:0.5vh;
  padding-bottom:0.5vh;
  z-index: 200;
  
  &:focus {
    outline: none;
  }

  &:hover {
    outline: none;
    background-color: black;

    & > *{
      background-color: white;
    }
  }
  
  div {
    width: 2vw;
    height: 0.55vh;
    background-color: black;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
        transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
      }

      :nth-child(2) {
        opacity: ${({ open }) => open ? '0' : '1'};
        transform: ${({ open }) => open ? 'translateX(1.5vw)' : 'translateX(0)'};
      }


      :nth-child(3) {

        transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
      }

    }

    div:hover {

  
        :first-child{
            background-color: #8a5100;
        }

    
          :nth-child(2):{
            background-color: #226600;
          }
      
          :nth-child(3){
            background-color: #226600;
            
          }
      }
  }
`;