import { useEffect, useState } from "react"
import { getBundles, getDay } from "./services"
import { Bundle } from "./types/bundleType"
import Marquee from "react-fast-marquee"

function App() {

  const [bundles, setBundles] = useState<Bundle[]>([])
  const [day, setDay] = useState<Date>(new Date())

  const [currentSection, setCurrentSection] = useState('bundles');

  function handleChangeSection(section: string) {
    setCurrentSection(section);
  }

  function handleSectionContent() {
    switch (currentSection) {
      case 'bundles':
        return (bundles.length > 0 ? <div className="grid md:grid-cols-3 gap-4 animate-slidein500 opacity-0">
          {bundles.map((bundle) => (
            <div key={bundle.id}
              className="col-span-1 rounded-lg overflow-hidden bg-cover bg-center w-full relative bg-blue-500 flex flex-col"
              style={{
                backgroundImage: `url(${bundle.images.background})`,
              }}
            >
              <img src={bundle.images.items} alt={bundle.name} className="flex-1" />
              <div className='bg-gray-800 w-full'>
                {bundle.name.length > 30 ?
                  (
                    <Marquee direction="left" speed={50} delay={0} pauseOnHover>
                      <h3 className='text-white text-lg font-bold text-center pt-5 pb-3 whitespace-nowrap w-full'>{bundle.name.toUpperCase()}</h3>
                    </Marquee>
                  ) : (
                    <h3 className='text-white text-lg font-bold text-center pt-5 pb-3'>
                      {bundle.name.toUpperCase()}
                    </h3>
                  )
                }
                <div className='flex flex-row gap-2 justify-end items-center bg-gray-900 overflow-clip h-7'>
                  <p className='text-lg font-primary text-center'>{bundle.price}</p>
                  <img src="https://fortnite-api.com/images/vbuck.png" alt='paVos' className='w-10 h-10 inline-block' />
                </div>
              </div>  
            </div>
          ))}
        </div> : 
        <div className="flex justify-center items-center flex-1">
          <p className="text-3xl font-bold animate-pulse">Cargando...</p>
        </div>)
      case 'items':
        return (<div className="flex justify-center items-center flex-1">
          <p className="text-3xl font-bold">Muy pronto...</p>
        </div>)
    }
  }

  useEffect(() => {
    getBundles().then(
      (bundles) => setBundles(bundles)
    )
    getDay().then(
      (day) => setDay(new Date(day))
    )
  }, [])

  return (
    <div className="p-4 flex flex-col gap-4 items-center min-h-dvh">
      <h1 className="flex flex-col">
        <span className="text-3xl text-center font-bold">Tienda</span>
        <span className="text-lg text-center animate-slidein500 opacity-0">{day.toLocaleDateString(
            'es-419',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
          )}
        </span>
      </h1>
      <div className="flex gap-10 relative text-center">
        <button type="button" className={`${currentSection == 'bundles' ? "text-black" : "text-white"} font-bold w-full cursor-pointer`}
        onClick={() => handleChangeSection('bundles')}>LOTES</button>
        <button type="button" className={`${currentSection == 'items' ? "text-black" : "text-white"} font-bold w-full cursor-pointer`}
        onClick={() => handleChangeSection('items')}>ITEMS</button>
        <span className={`absolute rounded-full bg-white h-6 w-24 -z-10 transform ${currentSection == 'bundles' ? "-translate-x-5" : "translate-x-[4.5rem]"} transition-all duration-500`}></span>
      </div>
      {handleSectionContent()}
    </div>
  )
}

export default App
