import { useRef, useState } from "react"

function ToastContainer() {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({});
    const closeToast = (id) => {
        clearTimeout(timersRef.current[id])
        delete timersRef.current[id]
        setToasts((prevToasts) => {
            const filteredArr = prevToasts.filter((toast) => {
                return toast.id !== id;
            })
            return filteredArr;
        });
    }
    const handleAdd = (message, type) => {
        const id = new Date().getTime()
        const newToast = [...toasts, {id, message, type}]
        setToasts(newToast)
        timersRef.current[id] = setTimeout(() => closeToast(id), 5000)
    }
  return (
    <div>
        <div className="toast-container fixed top=[0.5rem] right-[0.5rem] ">
            {
                toasts.map((toast) => {
                    return (
                        <div key={toast.id} className={`toast px-5 py-3 w-[250px] flex justify-between mb-2 rounded-md ${toast.type}`}>
                           {toast.message} toast <span className="cursor-pointer" onClick={() => closeToast(toast.id)}>x</span>
                        </div>
                    )
                })
            }
        </div>
        <div className="button-container">
            <button className="px-4 py-2 rounded-md m-3 bg-green-500 text-white" onClick={() => handleAdd("Success", "success")}>Success Toast</button>
            <button className="px-4 py-2 rounded-md m-3 bg-blue-500 text-white" onClick={() => handleAdd("Info", "info")}>Info Toast</button>
            <button className="px-4 py-2 rounded-md m-3 bg-yellow-500 text-white" onClick={() => handleAdd("Warning", "warning")}>Warning Toast</button>
            <button className="px-4 py-2 rounded-md m-3 bg-red-500 text-white" onClick={() => handleAdd("Error", "error")}>Error Toast</button>
        </div>
    </div>
  )
}
export default ToastContainer