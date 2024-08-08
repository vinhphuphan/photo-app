import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return ( 
        <Toaster
            toastOptions={{
                style : {
                    animation : "none"
                }
            }} 
        />
     );
}
 
export default ToasterProvider;