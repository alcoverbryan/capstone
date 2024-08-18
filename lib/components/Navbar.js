export default function Navbar ({className, children}){
    return <div className={`top-0 px-4 w-full sticky z-50 flex flex-row items-center ${className}`}>{children}</div>;
}