export function Xmark({className}) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18 18 6M6 6l12 12" 
            />
        </svg>
    );
}

export function Key({className}) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" 
            />
        </svg>
    );
}

export function HomeIcon({className}) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                fill="#DD1D21"
            />
        </svg>
    );
}
export function Chevron_left({className}) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    );
}

export function PlusCircle({className}) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );
}

export function Squares({ tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function ListBullet({ tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Arrow_long_left({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
    );
}
export function MagnifyingGlass({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    );
}

export function ProfileIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
            <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
            />
        </svg>
    );
}

export function LogoutIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
        </svg>
    );
}

export function Plus({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}

export function Map_pin({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path fill="currentColor" d="M11.42 21.815a1 1 0 0 0 1.16 0C12.884 21.598 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.996c-.029 6.444 7.116 11.602 7.42 11.819M12 4c3.309 0 6 2.691 6 6.004c.021 4.438-4.388 8.423-6 9.731c-1.611-1.308-6.021-5.293-6-9.735c0-3.309 2.691-6 6-6"></path>
                <path fill="currentColor" d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path>
            </svg>
        </div>
    );
}

export function Barcode({ className }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M4 18V6h16v12z"></path>
                <path fill="currentColor" d="M6 8h2v8H6zm3 0h1v8H9zm8 0h1v8h-1zm-4 0h3v8h-3zm-2 0h1v8h-1z"></path>
       
            </svg>
        </div>
    );
}
export function Book({ className }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path fill="currentColor" d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3M5 8V5c0-.805.55-.988 1-1h13v12H5z"></path>
                <path fill="currentColor" d="M8 6h9v2H8z"></path>
            </svg>
        </div>
    );
}

export function Camera({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
            <path
                fillRule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function PowerIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
        </svg>
    );
}

export function Chevron_right({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className === undefined ? "w-8 h-8" : className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    );
}
export function ClockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                clip-rule="evenodd"
            />
        </svg>
    );
}

export function AvailableIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
            />
        </svg>
    );
}

export function User({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            viewBox="0 0 24 24"
            height="1em"
            className={className === undefined ? "w-6 h-6" : className}
        >
           <path fill="currentColor" d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3m9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
        </svg>
    );
}

export function UserCircle({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Fingerprint({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M5.962 17.674C7 19.331 7 20.567 7 22h2c0-1.521 0-3.244-1.343-5.389zM16.504 3.387C13.977 1.91 7.55.926 4.281 4.305c-3.368 3.481-2.249 9.072.001 11.392c.118.122.244.229.369.333c.072.061.146.116.205.184l1.494-1.33a3.918 3.918 0 0 0-.419-.391c-.072-.06-.146-.119-.214-.188c-1.66-1.711-2.506-6.017.001-8.608c2.525-2.611 8.068-1.579 9.777-.581c2.691 1.569 4.097 4.308 4.109 4.333l1.789-.895c-.065-.135-1.668-3.289-4.889-5.167"
                />
                <path
                    fill="currentColor"
                    d="M9.34 12.822c-1.03-1.26-1.787-2.317-1.392-3.506c.263-.785.813-1.325 1.637-1.604c1.224-.41 2.92-.16 4.04.601l1.123-1.654c-1.648-1.12-3.982-1.457-5.804-.841c-1.408.476-2.435 1.495-2.892 2.866c-.776 2.328.799 4.254 1.74 5.405c.149.183.29.354.409.512C11 18.323 11 20.109 11 22h2c0-2.036 0-4.345-3.201-8.601a19.71 19.71 0 0 0-.459-.577m5.791-3.344c1.835 1.764 3.034 4.447 3.889 8.701l1.961-.395c-.939-4.678-2.316-7.685-4.463-9.748z"
                />
                <path
                    fill="currentColor"
                    d="m11.556 9.169l-1.115 1.66c.027.019 2.711 1.88 3.801 5.724l1.924-.545c-1.299-4.582-4.476-6.749-4.61-6.839m3.132 9.29c.21 1.168.312 2.326.312 3.541h2c0-1.335-.112-2.608-.343-3.895z"
                />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function CurrentLocation({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <circle cx={12} cy={12} r={4} fill="currentColor"></circle>
                <path
                    fill="currentColor"
                    d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069M12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6s6 2.691 6 6s-2.691 6-6 6"
                />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Return({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M6.758 8.758L5.344 7.344a8.05 8.05 0 0 0-1.841 2.859l1.873.701a6.05 6.05 0 0 1 1.382-2.146M19 12.999a7.94 7.94 0 0 0-2.344-5.655A7.9 7.9 0 0 0 12 5.069V2L7 6l5 4V7.089a5.94 5.94 0 0 1 3.242 1.669A5.96 5.96 0 0 1 17 13v.002c0 .33-.033.655-.086.977l-.019.131a6.05 6.05 0 0 1-1.138 2.536c-.16.209-.331.412-.516.597a6 6 0 0 1-.728.613a5.9 5.9 0 0 1-2.277 1.015c-.142.03-.285.05-.43.069c-.062.009-.122.021-.184.027a6.1 6.1 0 0 1-1.898-.103L9.3 20.819a8.1 8.1 0 0 0 2.534.136c.069-.007.138-.021.207-.03q.308-.037.61-.098l.053-.009l-.001-.005a7.9 7.9 0 0 0 2.136-.795l.001.001l.028-.019a8 8 0 0 0 1.01-.67c.27-.209.532-.43.777-.675c.248-.247.47-.513.681-.785c.021-.028.049-.053.07-.081l-.006-.004a7.9 7.9 0 0 0 1.093-1.997l.008.003c.029-.078.05-.158.076-.237q.057-.165.107-.333q.058-.21.105-.423c.022-.099.048-.195.066-.295q.047-.257.076-.516c.01-.076.023-.15.03-.227q.036-.374.037-.753q.002-.003.002-.008M6.197 16.597l-1.6 1.201a8.05 8.05 0 0 0 2.569 2.225l.961-1.754a6 6 0 0 1-1.93-1.672M5 13q0-.217.015-.429l-1.994-.143a8 8 0 0 0 .483 3.372l1.873-.701A6 6 0 0 1 5 13"
                ></path>
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Calendar({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path fill="currentColor" d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" />
                <path
                    fill="currentColor"
                    d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2M19 8l.001 12H5V8z"
                />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Calendar_Exclamation({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2m.002 16H5V8h14z"
                />
                <path fill="currentColor" d="M11 10h2v5h-2zm0 6h2v2h-2z" />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Poll({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path fill="currentColor" d="M7 11h7v2H7zm0-4h10.97v2H7zm0 8h13v2H7zM4 4h2v16H4z" />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Comments({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path fill="currentColor" d="M7 7h10v2H7zm0 4h7v2H7z" />
                <path
                    fill="currentColor"
                    d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2m0 14H6.667L4 18V4h16z"
                />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Trash({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
                />
                <path fill="currentColor" d="M9 10h2v8H9zm4 0h2v8h-2z" />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Package({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M22 8a.8.8 0 0 0 0-.21v-.08a1 1 0 0 0-.07-.16a.4.4 0 0 0-.05-.08l-.1-.13l-.08-.06l-.12-.09l-9-5a1 1 0 0 0-1 0l-9 5l-.09.07l-.11.08a.4.4 0 0 0-.07.11a.4.4 0 0 0-.08.1a.6.6 0 0 0-.06.14a.3.3 0 0 0 0 .1A.8.8 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a1 1 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06l9-5A1 1 0 0 0 22 16zm-10 3.87L5.06 8l2.76-1.52l6.83 3.9zm0-7.72L18.94 8L16.7 9.25L9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"
                ></path>
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Transfer({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M19.924 10.383a1 1 0 0 0-.217-1.09l-5-5l-1.414 1.414L16.586 9H4v2h15a1 1 0 0 0 .924-.617M4.076 13.617a1 1 0 0 0 .217 1.09l5 5l1.414-1.414L7.414 15H20v-2H5a1 1 0 0 0-.924.617"
                ></path>
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Collection({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2M5 20v-8h14l.002 8zM5 6h14v2H5zm2-4h10v2H7z"
                ></path>
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Bell({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={className === undefined ? "w-6 h-6" : className}
                style={{
                    animation: "ring 1s infinite",
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Users({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className === undefined ? "w-6 h-6" : className}>
            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
        </svg>
    );
}

export function Cog({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className === undefined ? "w-6 h-6" : className}>
            <path fill="currentColor" d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4m0-6c1.084 0 2 .916 2 2s-.916 2-2 2s-2-.916-2-2s.916-2 2-2"></path>
            <path fill="currentColor" d="m2.845 16.136l1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8 8 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8 8 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2 2 0 0 0-.731-2.732l-.505-.292a7.7 7.7 0 0 0 0-2.224l.505-.292a2 2 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8 8 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8 8 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2 2 0 0 0 .731 2.732l.505.292a7.7 7.7 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733m3.326-2.758A5.7 5.7 0 0 1 6 12c0-.462.058-.926.17-1.378a1 1 0 0 0-.47-1.108l-1.123-.65l.998-1.729l1.145.662a1 1 0 0 0 1.188-.142a6.1 6.1 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956a6.1 6.1 0 0 1 2.384 1.399a1 1 0 0 0 1.188.142l1.144-.661l1 1.729l-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378s-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649l-.998 1.729l-1.145-.661a1 1 0 0 0-1.188.142a6.1 6.1 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956a6.1 6.1 0 0 1-2.384-1.399a.99.99 0 0 0-1.188-.141l-1.144.662l-1-1.729l1.124-.651a1 1 0 0 0 .471-1.108"></path>
        </svg>
    );
}


export function ThreeDotsLoading({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className === undefined ? "w-6 h-6" : className}>
           <circle cx={18} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0.67} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
           <circle cx={12} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0.33} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
           <circle cx={6} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
        </svg>
    );
}

export function BubbleLoading({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className === undefined ? "w-6 h-6" : className}>
            <circle cx={12} cy={2} r={0} fill="currentColor"><animate attributeName="r" begin={0} calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
            <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
            <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
            <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
            <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
            <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
            <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
            <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle>
        </svg>
    );
}

export function PencilSqaure({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
        </svg>
    );
}
export function Pallette({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path
                fill="currentColor"
                d="M13.4 2.096a10.08 10.08 0 0 0-8.937 3.331A10.05 10.05 0 0 0 2.096 13.4c.53 3.894 3.458 7.207 7.285 8.246a10 10 0 0 0 2.618.354l.142-.001a3 3 0 0 0 2.516-1.426a2.99 2.99 0 0 0 .153-2.879l-.199-.416a1.92 1.92 0 0 1 .094-1.912a2.004 2.004 0 0 1 2.576-.755l.412.197c.412.198.85.299 1.301.299A3.02 3.02 0 0 0 22 12.14a10 10 0 0 0-.353-2.76c-1.04-3.826-4.353-6.754-8.247-7.284m5.158 10.909l-.412-.197c-1.828-.878-4.07-.198-5.135 1.494c-.738 1.176-.813 2.576-.204 3.842l.199.416a.98.98 0 0 1-.051.961a.99.99 0 0 1-.844.479h-.112a8 8 0 0 1-2.095-.283c-3.063-.831-5.403-3.479-5.826-6.586c-.321-2.355.352-4.623 1.893-6.389a8 8 0 0 1 7.16-2.664c3.107.423 5.755 2.764 6.586 5.826c.198.73.293 1.474.282 2.207c-.012.807-.845 1.183-1.441.894"
            ></path>
            <circle cx={7.5} cy={14.5} r={1.5} fill="currentColor"></circle>
            <circle cx={7.5} cy={10.5} r={1.5} fill="currentColor"></circle>
            <circle cx={10.5} cy={7.5} r={1.5} fill="currentColor"></circle>
            <circle cx={14.5} cy={7.5} r={1.5} fill="currentColor"></circle>
        </svg>
    );
}

export function Box({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path
                fill="currentColor"
                d="M20 3H4a2 2 0 0 0-2 2v2a2 2 0 0 0 1 1.72V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.72A2 2 0 0 0 22 7V5a2 2 0 0 0-2-2M4 5h16v2H4zm1 14V9h14v10z"
            ></path>
            <path fill="currentColor" d="M8 11h8v2H8z"></path>
        </svg>
    );
}

export function MemoryCard({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path
                fill="currentColor"
                d="M4 4v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V8a1 1 0 0 0-.293-.707l-5-5A1 1 0 0 0 14 2H6c-1.103 0-2 .897-2 2m14 4.414L18.001 20H6V4h7.586z"
            ></path>
            <path fill="currentColor" d="M8 6h2v4H8zm4 0h2v4h-2z"></path>
        </svg>
    );
}

export function Data({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path
                fill="currentColor"
                d="M20 17V7c0-2.168-3.663-4-8-4S4 4.832 4 7v10c0 2.168 3.663 4 8 4s8-1.832 8-4M12 5c3.691 0 5.931 1.507 6 1.994C17.931 7.493 15.691 9 12 9S6.069 7.493 6 7.006C6.069 6.507 8.309 5 12 5M6 9.607C7.479 10.454 9.637 11 12 11s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2zM6 17v-2.393C7.479 15.454 9.637 16 12 16s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2"
            ></path>
        </svg>
    );
}

export function DotsVertical({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 12c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"
                ></path>
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function Group({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path
                    fill="currentColor"
                    d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"
                ></path>
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function IdCard({ className, tooltip }) {
    return (
        <div className="group relative flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={className === undefined ? "w-6 h-6" : className}
            >
                <path fill="currentColor" d="M9.715 12c1.151 0 2-.849 2-2s-.849-2-2-2s-2 .849-2 2s.848 2 2 2" />
                <path
                    fill="currentColor"
                    d="M20 4H4c-1.103 0-2 .841-2 1.875v12.25C2 19.159 2.897 20 4 20h16c1.103 0 2-.841 2-1.875V5.875C22 4.841 21.103 4 20 4m0 14l-16-.011V6l16 .011z"
                />
                <path fill="currentColor" d="M14 9h4v2h-4zm1 4h3v2h-3zm-1.57 2.536c0-1.374-1.676-2.786-3.715-2.786S6 14.162 6 15.536V16h7.43z" />
            </svg>
            {tooltip && (
                <div className="absolute bottom-0 mb-8 text-nowrap transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white text-gray-800 text-sm font-semibold px-4 py-2 shadow-lg rounded-lg pointer-events-none">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export function CheckVerifiedIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
            />
        </svg>
    );
}

export function PrinterIcon({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            className={className === undefined ? "w-6 h-6" : className}
        >
            <path
                fill="currentColor"
                d="M19 7h-1V2H6v5H5c-1.654 0-3 1.346-3 3v7c0 1.103.897 2 2 2h2v3h12v-3h2c1.103 0 2-.897 2-2v-7c0-1.654-1.346-3-3-3M8 4h8v3H8zm8 16H8v-4h8zm4-3h-2v-3H6v3H4v-7c0-.551.449-1 1-1h14c.552 0 1 .449 1 1z"
            ></path>
            <path fill="currentColor" d="M14 10h4v2h-4z"></path>
        </svg>
    );
}

export function BellIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
        </svg>
    );
}








