import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState([""]);
  const [cartOpened, setCartOpened] = React.useState(false);


React.useEffect(() => {

  axios.get('https://6450c1c2e1f6f1bb229e3ac6.mockapi.io/items').then(res => {
    setItems(res.data)
  });

  axios.get('https://6450c1c2e1f6f1bb229e3ac6.mockapi.io/cart').then(res => {
    setCartItems(res.data)
  });

}, []);

const onAddToCart = (obj) => {
  if(cartItems.find((item) => item.id != obj.id)){
     setCartItems(prev => prev.filter(item => item.id !== obj.id));
  }else{
   axios.post('/cart', obj);
   setCartItems((prev) => [...prev, obj]);
  }
}



const onRemoveItem = (id) => {  
   axios.delete(`/cart${id}`);
   setCartItems((prev) => prev.filter(item => item.id != id));
  
}

const onChangeSearchInput = (event) => {
  
   setSearchValue(event.target.value)
}


console.log(items)

return (
    <div className="wrapper clear">
   
    {cartOpened &&   <Drawer items={cartItems} onClose={() => setCartOpened (false)} onRemove={onRemoveItem}/> }


    <Header onClickCart={() => setCartOpened(true)} />

    <div className='slider'>
        <div className='slider__inner'>
       
              <div className='slider__left'>
          <a href='https://www.disney.com/'>
              <img className='slider__logo' src='./img/slider__logo.jpg'/>
          </a>
                <h2 className='slider__title'>Stan Smith, forever!</h2>
                <button className='slider__button'>КУПИТЬ</button>
              </div>
              <div className='slider__right'>
                  <img className='slider__img' src='./img/slider__img.png'/>
              </div>
        </div>
    </div>

       <div className="content p-40">

           <div className="d-flex align-center mb-40 justify-between">
             <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
             
             <div className="search-block d-flex">
                  <img src="/img/search.svg" alt='Search'/>
                  {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p removeBtn" src="/img/btn-remove.svg" alt="clear"/>}
                  <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
             </div>
           </div>

              <div className="flex-wrap d-flex">

                    {items
                    .filter((item) => item.title.toLowerCase().includes(searchValue))
                    .map((item, index) => (
                     <Card 
                     key={index}
                     title={item.title} 
                     imageUrl={item.imageUrl}
                     price={item.price} 
                     onFavorite={() => console.log("Добавили в закладки")}
                     onPlus={(obj) => onAddToCart(obj)}
                     />
                   ))} 
                   
               
              </div>
       </div>
    </div>
  );
}

export default App;
