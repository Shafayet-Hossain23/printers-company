import { useEffect } from "react"
import { useState } from "react"

export const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState('')
    const [adminLoading, setAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`https://printers-server.vercel.app/users/admin?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.isAdmin) {
                    setIsAdmin(data?.isAdmin)
                    setAdminLoading(false)
                }
                if (!data?.isAdmin) {
                    setAdminLoading(false)
                }
            })
    }, [email])
    return [isAdmin, adminLoading]
}