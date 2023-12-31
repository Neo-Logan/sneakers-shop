import styles from './Card.module.scss'
import React from 'react';

function Card( {title, imageUrl, price, onPlus, onFavorite} ){
const [isAdded, setIsAdded] = React.useState(false);
const [isFavorite, setIsFavorite] = React.useState(false);

const onClickPlus = () => {
  onPlus({title, imageUrl, price});
   setIsAdded(!isAdded);
};

const onClickFavorite = () => {
  onFavorite({title, imageUrl, price})
  setIsFavorite(!isFavorite)
}

    return(
        <div className={styles.card}>
<div className={styles.favorite} onClick={onClickFavorite}>
<img
 src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} 
 alt="Unliked"/>
</div>
  <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
  <h5>{title}</h5>
  <div className="d-flex justify-between align-center">
    <div className="d-flex flex-column ">
      <span>цена:</span>
      <b>{price}</b>
    </div>
   
      <img className={styles.plus}
            onClick={onClickPlus} 
            src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
             alt="Plus"/>
  </div>
</div>



    )
    
}

export default Card;