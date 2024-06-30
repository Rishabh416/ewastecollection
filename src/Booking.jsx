import { useParams, useNavigate } from "react-router-dom"
import supabase from './supabase.js'
import { useEffect, useState } from 'react'

function Booking() {

    const navigate = useNavigate()

    const {id} = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [location, setLocation] = useState("")
    const [items, setItems] = useState("")
    const [available, setAvailable] = useState()

    useEffect(() => {
        const getSlot =  async () => {
            const {data, error} = await supabase
                .from('EwasteCollectionDates')
                .select()
                .eq('id', id)
                .single()
                
            if (data.email == null) {
                setAvailable(true)
            }
        }
        getSlot()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {data, error} = await supabase
        .from('EwasteCollectionDates')
        .update({name, email, mobile, location, items})
        .eq('id', id)
        .select()

        if (error) {
            console.log(error)
        }
        if (data) {
            navigate('/')
        }
    }

    return(
        <div>
            {available ? 

            (<form className="m-20 flex flex-col items-center justify-center" onSubmit={handleSubmit}>

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="m-2 p-3 rounded-xl bg-containerColor text-white placeholder-white"/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="m-2 p-3 rounded-xl bg-containerColor text-white placeholder-white"/>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" required className="m-2 p-3 rounded-xl bg-containerColor text-white placeholder-white"/>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Collection Location" required className="m-2 p-3 rounded-xl bg-containerColor text-white placeholder-white"/>
            <input type="text" value={items} onChange={(e) => setItems(e.target.value)} placeholder="Item(s) to be collected" required className="m-2 p-3 rounded-xl bg-containerColor text-white placeholder-white"/>
            <button className='mt-16 p-2 bg-buttonColor text-white rounded-xl text-xl'>Book collection slot</button>

            </form>)
            
            : (<p>Slot is already booked</p>)}
        
        </div>
    )
}

export default Booking