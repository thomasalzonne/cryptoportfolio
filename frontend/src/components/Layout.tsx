import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }: any) {
    
    return(
        <div className='min-h-screen w-screen flex flex-col p-4'>
            <Header/>
            <div className="flex space-x-4 mt-8">
                <Navbar/>
                {children}
            </div>
        </div>
    )
}