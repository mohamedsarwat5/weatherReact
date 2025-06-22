import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function App() {

  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  function getData(city) {
    setIsLoading(true)
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=5322639b90b94e7b960163718241312&q=${city}&days=7`)
      .then(res => {
        setWeather(res.data)
        console.log(res.data)
      })
      .catch(err => err)
      .finally(() => setIsLoading(false));

  }

  useEffect(() => {
    getData('cairo')
  }, [])

  let date = new Date()
  let dayName = date.toLocaleDateString('en-us', { weekday: 'long' })
  let month = date.toLocaleDateString('en-us', { month: 'long' })
  let dayNumber = date.getDate()

  return (<>
    <div className='min-h-[100dvh] bg-dark-gray p-6 flex flex-col items-center justify-center'>


      {isLoading ? <div className="loader"></div> : <div className='relative bg-[#001A31] w-full max-w-[400px] h-[600px] mx-auto rounded-4xl p-5 text-center flex flex-col items-center justify-center'>
        {isOpen && <>
          <div className='absolute z-20 inset-0 bg-[#001A31] w-full max-w-[400px] h-[600px] mx-auto rounded-4xl p-9 text-center '>
            <div className='relative flex items-center text-white/35'>
              <i className="fa-solid fa-location-dot absolute mx-3 pointer-events-none"></i>
              <input className='outline-none w-full text-white p-3 pl-8 rounded-4xl ring ring-white' placeholder='Enter a City name' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className='flex  items-center justify-center gap-5 mt-5 text-white'>
              <button onClick={() => { getData(city), setIsOpen(false), setCity('') }} className='bg-white/20 px-3 py-2 rounded-4xl cursor-pointer hover:bg-white/35 duration-300 transition-all'> <i className='text-[14px] fa-solid fa-magnifying-glass'></i> Search</button>
              <button onClick={() => setIsOpen(prev => !prev)} className='cursor-pointer'>Cancel</button>
            </div>
          </div>
        </>}
        <h2 className='text-white text-4xl font-extralight mb-3'>{dayName}, {month} {dayNumber}</h2>
        <h2 className='text-center  text-white text-3xl'> {weather?.location?.name}, <span className='text-3xl'>{weather?.location?.country.slice(0, 2).toUpperCase()}</span></h2>
        <div className='mt-10 text-white'>
          <img src={weather?.current?.condition?.icon} className='scale-300 mx-auto ' alt="" />
          <h2 className='mt-10 text-3xl font-extralight'>{weather?.current?.condition?.text}</h2>
          <h2 className='text-4xl mt-3'>{weather?.current?.temp_c} °C</h2>
        </div>
        <div className='flex items-center justify-center gap-6 mt-10 mx-auto'>
          {weather?.forecast?.forecastday.map((day, i) => {
            let dayy = new Date(day.date)
            let dayN = dayy.toLocaleDateString('en-us', { weekday: 'short' })
            let isToday = new Date().toDateString() === new Date(day.date).toDateString();
            return (
              <div key={i} className='flex flex-col text-white items-center justify-center'>
                <img src={day.day.condition.icon} alt="" />
                <h2 className='font-extralight text-2xl mt-2'> {isToday ? "Today" : dayN}</h2>
                <h2 className='mt-3 text-[22px]'>{day.day.maxtemp_c} °C</h2>
              </div>
            )
          })}
        </div>
        <button onClick={() => setIsOpen(prev => !prev)} className='absolute end-3 bottom-3 text-white bg-white/10 hover:bg-white/20 duration-300 transition-all cursor-pointer rounded-full p-2 w-9 h-9 md:p-5 md:w-[20px] md:h-[20px] flex items-center justify-center '> <i class="fa-solid fa-magnifying-glass"></i> </button>
      </div>}




    </div>
  </>
  )
}
