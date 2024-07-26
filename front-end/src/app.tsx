import { AlignJustify, CircleChevronDown, Info, LayoutGrid, Search, ShoppingCart } from "lucide-react"
import products from './data/products.json'
import { useEffect, useRef, useState } from "react"

export function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [isInfoModal, setIsInfoModal] = useState(false)
  const [isMoreInfoModal, setIsMoreInfoModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedInfo, setSelectedtInfo] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null)

  const filteredProducts = selectedCategory === 'Todos' ? products 
  : products.filter(product => product.category === selectedCategory)

  function toggleInfo(id: number){
    const productInfo = products.find(p => p.id === id)

    if(productInfo){
      setSelectedProduct(productInfo.description)
      setSelectedtInfo(productInfo.moreinfo)
      openInfoModal()
    }

  }

  function openInfoModal(){
    setIsInfoModal(true)
  }

  function closeInfoModal(){
    setIsInfoModal(false)
    setIsMoreInfoModal(false)
  }

  function inverterMoreInfoModal(){
    setIsMoreInfoModal(!isMoreInfoModal)
  }

  useEffect(() => {
    function hundleClickOutSide(e: MouseEvent){
      if(modalRef.current && !modalRef.current.contains(e.target as Node)){
        closeInfoModal()
      }
    }

    if (isInfoModal){
      document.addEventListener('mousedown', hundleClickOutSide)
    } else{
      document.removeEventListener('mousedown', hundleClickOutSide)
    }

    return () => {
      document.removeEventListener('mousedown', hundleClickOutSide)
    }
  })
  
  return (
    <div className="py-6 px-5">
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <button className="bg-purple-400 rounded-lg px-5 py-2 hover:bg-purple-600">
            <AlignJustify className="size-5" />
          </button>
          <h1 className="text-3xl font-bold">
            Página de Produtos
          </h1>
          <button className="bg-purple-400 rounded-lg px-5 py-2 hover:bg-purple-600">
            <ShoppingCart className="size-5"/>
          </button>
        </div>

        <div className="gap-1 flex justify-center items-center py-8">
          <input type="text" className="bg-zinc-200 rounded-lg py-2" />
          <button className="bg-purple-400 rounded-lg px-5 py-2 hover:bg-purple-600">
            <Search className="size-5"/>
          </button>
        </div>
      
        <div className="flex justify-center items-center ">
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setSelectedCategory('Todos')} className="bg-orange-400 rounded-lg px-5 py-2 font-medium hover:bg-orange-600">
            <LayoutGrid className="size-5"/>
            </button>
            <button onClick={() => setSelectedCategory('one-piece')} className="bg-orange-400 rounded-lg px-5 py-2 font-medium hover:bg-orange-600">
              One Piece
            </button>
            <button onClick={() => setSelectedCategory('naruto')} className="bg-orange-400 rounded-lg px-5 py-2 font-medium hover:bg-orange-600">
              Naruto
            </button>
            <button onClick={() => setSelectedCategory('jujutsu-kaisen')} className="bg-orange-400 rounded-lg px-5 py-2 font-medium hover:bg-orange-600">
              Jujutsu Kaisen
            </button>
            <button onClick={() => setSelectedCategory('hunter-x-hunter')} className="bg-orange-400 rounded-lg px-5 py-2 font-medium hover:bg-orange-600">
              Hunter x Hunter
            </button>
            <button onClick={() => setSelectedCategory('pokemon')} className="bg-orange-400 rounded-lg px-5 py-2 font-medium hover:bg-orange-600">
              Pokemon
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center">

          <div className="">
            <ul className="bg-zinc-100 py-5 px-5 max-w-7xl rounded-md flex flex-wrap gap-3">
              
              {filteredProducts.map(product => (
                <li key={product.id} className="bg-zinc-200 p-5 rounded-md flex flex-col min-w-[200px] xl:w-1/6">
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto object-cover my-2"
                    />
                  </div>
                  <div className="flex justify-between items-end mt-auto">
                    <span>Preço: R$ {product.price.toFixed(2)}</span>
                    <button>
                      <Info onClick={() => toggleInfo(product.id)} className="size-5"/>
                    </button>
                  </div>
                </li>
              ))}

              {isInfoModal &&(
                <div  className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                  <div ref={modalRef} className="w-[640px] max-h-full overflow-auto rounded-xl py-5 px-6 shadow-shape bg-zinc-100 space-y-5">
                    <h2 className="font-semibold">Descrição</h2>
                    <p className="text-zinc-800">
                      {selectedProduct}
                    </p>
                    <div className="flex justify-center space-x-2">
                      <span className="text-sm text-zinc-600">Mais informações</span>
                      <button><CircleChevronDown onClick={inverterMoreInfoModal} className="size-5"/></button> 
                    </div>
                    {isMoreInfoModal && (
                      <div className="text-zinc-800">
                        <p>{selectedInfo}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default App
