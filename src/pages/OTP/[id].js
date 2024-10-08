import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ForgotPassword from "../../../lib/components/ForgotPassword";
import { BubbleLoading, Chevron_left } from "../../../lib/components/HeroIcons";
import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default function Enter_OTP({ UserLogIn }) {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isOtpMatched, setIsOtpMatched] = useState(false);
    const inputRefs = useRef([]);
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(100);
    const [isResendVisible, setIsResendVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
        } else {
            setIsResendVisible(true);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (otp.every((data) => data !== "")) {
        setIsLoading(true);
        setTimeout(() => {
            handleSubmit();
        }, 2000);
        }
    }, [otp]);

    const handleChange = (element, index) => {
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "") {
        if (index > 0) {
            inputRefs.current[index - 1].focus();
        }
        }
    };

    const handleSubmit = (e) => {
        const otpValue = otp.join("");
        document.getElementById("hiddenOtp").value = otpValue;

        if (otpValue === UserLogIn.otp) {
        setIsOtpMatched(true);
        alert("OTP matched successfully!");
        } else {
        alert("Invalid OTP. Please try again.");
        setIsLoading(false);
        }
    };

    if (isOtpMatched) {
        return <ForgotPassword UserLogIn={UserLogIn} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen border p-4">
            <div className="md:w-[400px] bg-yellow-600 lg:p-2 p-10 px-8 lg:h-[500px] w-full flex justify-center items-center rounded-md shadow-lg">
                <div className="">
                    <div className="text-center mb-10">
                        <h1 className="text-[1.375rem] font-semibold mb-1 tracking-wide text-light text-nowrap">
                            OTP Verification
                        </h1>
                        <p className="text-light text-wrap">Enter the OTP sent to your email</p>
                    </div>
                    <form id="otpForm" onSubmit={handleSubmit}>
                        <div class="">
                            <input name="id" id="id" type="hidden" value={`${router.query.id}`} />
                        </div>
                        <div className="flex justify-center space-x-2 mb-10">
                            {otp.map((data, index) => {
                                return (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="otp-input w-12 h-12 text-center border-b focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm rounded-md"
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    required
                                />
                                );
                            })}
                        </div>
                        <input type="hidden" id="hiddenOtp" name="otp" />
                        {isResendVisible ? (
                            <form action="/api/forgotPassword" method="POST">
                                <input type="hidden" id="email" name="email" value={UserLogIn.email} required></input>
                                <button type="submit" className="mt-6 bg-black text-white py-2 px-4 w-full rounded-md ">
                                    Resend OTP
                                </button>
                            </form>
                        ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="mt-6 bg-black text-white py-2 px-4 w-full rounded-md"
                        >
                            {isLoading ? (
                                <div className="w-full flex px-4 py-1 justify-center">
                                    <BubbleLoading className=" w-full text-10" />
                                </div>
                                ) : (
                                "Verify OTP"
                            )}
                        </button>
                        )}
                        <div className="text-center flex justify-end text-[10px] mb-4 mt-2 text-white">
                            {timeLeft > 0 && <span>Resend Code : {timeLeft} seconds</span>}
                        </div>
                    </form>
                    <div className="flex flex-col justify-center items-center">
                        <a href="/" className="text-accent1 tracking-wide text-[13px] relative">
                            <Chevron_left className="w-4 h-4 absolute left-[-20px] top-1/2 transform -translate-y-1/2" />
                            Back to LogIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ req, res, query }) {
  let db_conn = new DBManager(DB_CONF.PATH);
  await db_conn.init();

  let UserLogIn = await db_conn.getRegisterById(query.id);


  return {
    props: {
      UserLogIn: UserLogIn,
    },
  };
}