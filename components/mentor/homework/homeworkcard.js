import Image from 'next/image';
import { useRouter } from 'next/router';

const HomeWorkCard = ({
  title,
  desc,
  level,
  sessions,
  language,
  category,
  banner
}) => {
  const router = useRouter();
  return (
    <div className=' rounded-2xl shadow-lg bg-[#141518] h-[17rem] md:w-[355px] py-[10px] px-4 md:p-5 flex flex-col justify-around'>
      <div className='flex justify-between '>
        <div>
          <Image
            src={
              banner || '/pagesgraphics/student/coursedescription/laptop.svg'
            }
            width={100}
            height={100}
            alt='f'
            className='md:w-[80px] md:h-[80px] w-[80px] h-[80px] p-2 pb-0'></Image>
        </div>
        <div className='text-[10px] md:text-sm text-[#E1348B] '>
          <span className='mr-3'>check</span>
        </div>
      </div>
      <a href='#!' data-mdb-ripple='true' data-mdb-ripple-color='light'></a>
      <div className=''>
        <h1 className='text-slate-400 text-[15px] md:text-sm font-medium'>
          COURSE
        </h1>
        <h1 className='text-white text-sm md:text-2xl font-medium'>
          {title.length > 16 ? title.slice(0, 16) + '...' : title}
        </h1>
        <div className='text-left pr-3'>
          <p className='text-white text-sm md:text-[0.8rem] w-[280px] mb-1 md:mb-6 overflow-hidden overflow-ellipsis leading-2 md:line-clamp-3 line-clamp-2'>
            {desc}
          </p>
        </div>

        <div className='flex justify-between pt-4'>
          <div className=' text-[#E1348B] '>submit : 67</div>
          <span className=' text-[#E1348B]  text-xs md:text-sm md:p-0 p-2'>
            Due by- 16/11/2022
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeWorkCard;
