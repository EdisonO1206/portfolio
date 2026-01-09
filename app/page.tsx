import Image from "next/image";
import Title from "./src/components/atoms/Title";
import InfoCardsContainer from "./src/components/organisms/InfoCardsContainer";

export default function Home() {
    return (
        <div className='flex flex-row items-center'>
            <div className='flex flex-col items-center w-5/12'>
                <Image 
                    src={"/Edison photo.jpg"} 
                    alt='Edison developer photo'
                    width={250}
                    height={300}
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
            <div className='grid grid-cols-2 w-7/12 gap-10 items-center'>
                <InfoCardsContainer></InfoCardsContainer>
            </div>
        </div>
    );
}
