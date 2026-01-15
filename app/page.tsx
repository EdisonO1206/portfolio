import Image from "next/image";
import Title from "./src/components/atoms/Title";
import InfoCardsContainer from "./src/components/organisms/InfoCardsContainer";

export default function Home() {
    return (
        <div className='flex flex-col lg:flex-row items-center justify-center'>
            <div className='flex flex-col items-center sm:w-full md:mb-4 lg:w-5/12 justify-center'>
                <Image 
                    src={"/Edison photo.jpg"} 
                    alt='Edison developer photo'
                    width={300}
                    height={400}
                    className="rounded-full floating-blue mb-4 cursor-pointer"
                    loading="eager"
                >
                </Image>
                <Title 
                    titleA='<Edison ' 
                    titleB='Orozco/>' 
                    changeColorOnHover={true}
                    subTitle='Desarrollador full-stack junior en Medellín 🇨🇴' 
                    inlineTitles={false}
                    subTitleClassName='text-xl'
                >
                </Title>
            </div>
            <div className='grid grid-cols-2 flex-1 mt-4 md:mt-0 gap-10 items-center justify-items-center w-full'>
                <InfoCardsContainer></InfoCardsContainer>
            </div>
        </div>
    );
}
