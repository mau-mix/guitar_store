import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

//esta funcion revisa si hay algun elemento y lo envia y si no pone un array vacio

    function initialCart(){
        const LocalStorageCart = localStorage.getItem('cart')
        return LocalStorageCart ? JSON.parse(LocalStorageCart) : []

    }

  const [data] = useState(db) 
  const [cart, setCart] = useState(initialCart)
  const maxItems = 5
  const minItems = 1

// almacenar los datos en localStorage solo permite almacenar strings
  useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  
//esta funcion sirve para saber si hay un elemento repetido
//si no existe lo agrega y si existe solo lo actualiza
//udemy 72
  function addToCard(item){

        const itemExists = cart.findIndex(guit => guit.id === item.id)
        if(itemExists >=0){
            if(cart[itemExists].quantity >= maxItems) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }else {
            item.quantity = 1
            setCart([...cart, item])
        }
   
}
function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}
// agregar articulos a carrito
function increaseQuantity(id){
    const upDateCart = cart.map( item => {
        if(item.id === id && item.quantity < maxItems) {
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
    })
    setCart(upDateCart)

}
//eliminar articulos de carrito
function deceaserQuantit(id){
    const deletDateCart = cart.map(item => {
        if(item.id === id && item.quantity > minItems) {
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    setCart(deletDateCart)
}

//eliminar todos los articulos del carrito
function clearArt(){
    setCart([])
}


  return (
    <>
    <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        deceaserQuantit={deceaserQuantit}
        clearArt={clearArt}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map(guitar => (
                <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    cart={cart}
                    setCart={setCart}
                    addToCard={addToCard}
                />
            ))}
           
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
