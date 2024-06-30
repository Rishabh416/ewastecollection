import supabase from './supabase.js'
import { useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

function Admin() {

    const [session, setSession] = useState(null)

    const [dateTime, setDateTime] = useState()
    const [allSlots, setAllSlots] = useState()
    const [error, setError] = useState()

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {data, error} = await supabase
        .from('EwasteCollectionDates')
        .insert([{dateTime}])
        
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
        }
    }

    useEffect(() => {
        const getSlots = async() => {
          const {data, error} = await supabase
            .from('EwasteCollectionDates')
            .select()
            .order('dateTime')
    
          if (error) {
            setError(error)
            setAllSlots(null)
          }
    
          if (data) {
            setAllSlots(data)
            setError(null)
          }
        }
    
        getSlots()
    
      }, [])
    

    return(          
        <div className='mt-20'>
          {!session && (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />)}
          {session && (
            <div>
              <h1 className='text-5xl font-bold text-center mb-5'>ADMIN</h1>

              <form onSubmit={handleSubmit} className='text-center'>
                  <input type="datetime-local" value={dateTime} onChange={(e) => {setDateTime(e.target.value)}}/>
                  <button className='ml-3 p-2 bg-buttonColor text-white rounded-xl text-xl'>Add slot</button>
              </form>
              
              {error && (<p>{error}</p>)}
              
              {allSlots && (<div className='flex justify-center flex-wrap'>
                  
              {allSlots.map(slot => (
              <div className='p-5 bg-containerColor text-white m-10 rounded-xl flex flex-col items-center justify-center'>
                  <h3 className='font-bold mb-2'>{new Date(slot.dateTime).toLocaleDateString("en-AE", { weekday: "long" }) + ", " + new Date(slot.dateTime).toLocaleDateString("en-AE") + ", " + new Date(slot.dateTime).toLocaleTimeString("en-AE", { hour12: false, hour: "2-digit", minute: "2-digit", timeZone: "UTC" })}</h3>
                  {slot.email ? (<p className='p-1 mb-2 bg-lightred text-black rounded-xl'>Slot Booked</p>) : (<p className='p-1 bg-lightgreen text-black rounded-xl'>Slot Available</p>)}
                  <p className='mb-2'>Name: {slot.name}</p>
                  <p className='mb-2'>Email: {slot.email}</p>
                  <p className='mb-2'>Mobile: {slot.mobile}</p>
                  <p className='mb-2'>Location: {slot.location}</p>
                  <p>Items: {slot.items}</p>
              </div>
              ))}

              </div>)}
            </div>
          )}

        </div>
    )
}

export default Admin