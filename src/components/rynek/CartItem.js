import React from "react";
import { TextBlock } from "./TextBlock";
import { ItemStyle } from "./Items";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";

const IconStyle = styled.img`
  max-height: 100px;
  max-width: 100px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
margin: 10px 10px;
`;
const CartItemWrapper = styled.section`
display: flex;
`;

export const CartItem = ({ name, value, orderCount, icon, onAddButton, onMinusButton }) => {
  return (
    <>
        <div>
      <IconStyle src={icon} alt=""></IconStyle></div>
      <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 20px" }}>
        <TextBlock>{name}</TextBlock>
        <TextBlock style={{fontSize: "20px"}}>wartość: {value * orderCount}</TextBlock>
      </div>
      <TextBlock>Ilość: {orderCount}</TextBlock>

      {/* <button onClick={(key) => addToCart(key)}> */}
      <button onClick={() => onMinusButton()}>
        <RemoveIcon
          style={{
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)",
            marginRight: "10px",
          }}
        />
      </button>
      <button onClick={() => onAddButton()}>
        <AddIcon style={{ boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)" }} />
      </button></div>
    </>
  );
};
