import Title from "../../atoms/Title";
import SecondaryTitle from "../../atoms/SecondaryTitle";
import ProyectCard from "../../molecules/ProyectCard";
import PopupBase from "../../molecules/PopupBase";

interface Props{
    onClose: any;
}

const ProyectsPopup = ( { onClose } : Props) => {
    return (
        <PopupBase>
            <div className='flex justify-between border-b pb-4 mb-4'>
                <Title titleA="<Proy" titleB="ectos/>" subTitle="" titleClassName="text-3xl" changeColorOnHover={true}></Title>
                <button onClick={onClose} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>
            <div>
                <SecondaryTitle title="Mis principales proyectos destacados"></SecondaryTitle>
                <div className="grid grid-cols-3 mt-4 gap-4">
                    <ProyectCard date="1/10/2025" className="col-span-1" description={"test test"} technologies="PHP" title="Test" to="" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJpJ1fugCbqf-HY9AzWFqLkIDg_XnryylTTg&s"/>
                    <ProyectCard date="1/10/2025" className="col-span-1" description={"test test"} technologies="PHP" title="Test" to="" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJpJ1fugCbqf-HY9AzWFqLkIDg_XnryylTTg&s"/>
                    <ProyectCard date="1/10/2025" className="col-span-1" description={"test test"} technologies="PHP" title="Test" to="" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJpJ1fugCbqf-HY9AzWFqLkIDg_XnryylTTg&s"/>
                    <ProyectCard date="1/10/2025" className="col-span-1" description={"test test"} technologies="PHP" title="Test" to="" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJpJ1fugCbqf-HY9AzWFqLkIDg_XnryylTTg&s"/>
                </div>
            </div>
        </PopupBase>
    )
}

export default ProyectsPopup