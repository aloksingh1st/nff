import Image from "next/image";

export default function Plan({
  title,
  price,
  duration,
  description,
  from,
  to,
  updatePage,
  odd,
}) {
  const styles = `
.oddcard{
  position:relative;
  top:5rem;

}

.evencard{
  margin-top:9rem;
}

@media screen and (min-width: 768px) {
  .evencard{
    margin-top:0;
  }
}
`;

  return (
    <>
      <style>{styles}</style>
      <div
        className={` ${odd} h-[29rem] w-min-[480px] md:w-[25%] border-[1.3px] rounded-2xl md:mx-4 bg-gradient-to-b ${from} ${to} mt-6 md:mt-0 mx-auto`}
      >
        <div className="border-b border-[#ffffffc0] px-6 pt-8 pb-2">
          <h1 className="text-2xl md:xl lg:text-2xl xl:text-4xl md:mb-2 font-medium">
            {title}
          </h1>
          <h1 className="text-sm md:mb-2">
            <span className="text-base font-medium">&#8377;</span>
            <span className="text-base font-medium">{price}</span>/
            {`${duration}`}
          </h1>
          <h1 className="text-[10px] text-[#ffffff8f]">One time payment</h1>
        </div>
        <div className="px-6 pb-2.5 mt-6 md:mt-10 w-full">
          <div className="mb-10 md:mb-28 w-full">
            {description.map((item, ind) => (
              <div key={ind} className="flex items-center mt-6">
                <Image
                  src="/componentsgraphics/student/paymentgateway/plan/Tick.png"
                  alt="tick"
                  width={10}
                  height={10}
                  className="h-5 w-5 mr-2"
                />
                <p className="text-sm">{item}</p>
              </div>
            ))}
            <button
              className="bg-[#A145CD] flex items-center m-auto justify-center text-sm w-full p-[12px] mt-[6rem] rounded-xl"
              onClick={(e) => updatePage(e)}
            >
              Start Free Trial Now
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
