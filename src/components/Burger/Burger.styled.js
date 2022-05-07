import styled from 'styled-components';

export const StyledBurger = styled.button`
  position: absolute;
  top: 9vh;
  left: 0.7vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.3vw;
  height: 3vh;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 200;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2.3vw;
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
            background-color: #8a5100;
            
          }
      }
  }
`;