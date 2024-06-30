import supabase from './supabase.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function App() {

  const [error, setError] = useState(null)
  const [slots, setSlots] = useState(null)

  useEffect(() => {
    const getSlots = async() => {
      const {data, error} = await supabase
        .from('EwasteCollectionDates')
        .select()
        .is('email', null)
        .order('dateTime')

      if (error) {
        setError(error)
        setSlots(null)
      }

      if (data) {
        setSlots(data)
        setError(null)
      }
    }

    getSlots()

  }, [])

  return (
    <div className='mt-20'>

      <h1 className='text-5xl font-bold text-center mb-10'>Schedule an E-waste Collection</h1>
      <p className='text-xl text-center font-bold mb-10'>Collection for larger items: Washing machine, Television, Dishwasher, Printer, Water heaters, Desktop PCs, Monitors, Cooking range</p>

      {error && (<p>{error}</p>)}
      {slots && (<div className='flex justify-center flex-wrap'>
        {slots.map(slot => (
          <div className='p-5 bg-containerColor text-white m-10 rounded-xl flex flex-col items-center justify-center'>
            <h3 className='mb-3 text-xl'>{new Date(slot.dateTime).toLocaleDateString("en-AE", { weekday: "long" }) + ", " + new Date(slot.dateTime).toLocaleDateString("en-AE") + ", " + new Date(slot.dateTime).toLocaleTimeString("en-AE", { hour12: false, hour: "2-digit", minute: "2-digit", timeZone: "UTC" })}</h3>
            <Link to={'/'+ slot.id} className='p-1 bg-buttonColor text-white rounded-xl text-xl'>Book slot</Link>
          </div>
        ))}

      </div>)}

    </div>
  )
}

export default App
