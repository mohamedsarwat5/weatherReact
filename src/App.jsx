import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function App() {

  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    getData('paris')
  }, [])

  let date = new Date()
  let dayName = date.toLocaleDateString('en-us', { weekday: 'long' })
  let month = date.toLocaleDateString('en-us', { month: 'long' })
  let dayNumber = date.getDate()

  return (<>
    <div className='min-h-[100dvh] bg-dark-gray p-6 flex flex-col items-center justify-center'>

      {isLoading ? <div className="loader"></div> : <div className='bg-[#001A31] w-full max-w-[400px] h-[600px] mx-auto rounded-4xl p-5 text-center flex flex-col items-center justify-center'>
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
      </div>}




    </div>
  </>
  )
}
