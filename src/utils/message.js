import { toast } from 'react-toastify'

export const message = (content, status) =>{
    switch(status){
        case 'success':
            return toast.success(content, {
                    closeOnClick: true,
                    position: 'bottom-left',
                    theme: 'dark'
            })
        case 'error':
            return toast.error(content, {
                closeOnClick: true,
                position: 'bottom-left',
                theme: 'dark'
            })
        default: 
            return toast(content, {
                closeOnClick: true,
                position: 'bottom-left',
                theme: 'dark'
            })
            
    }
}