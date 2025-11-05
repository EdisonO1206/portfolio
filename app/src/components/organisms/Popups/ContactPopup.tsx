import Title from "../../atoms/Title"
import ContactButtons from "../../molecules/ContactButtons"
import SecondaryTitle from "../../atoms/SecondaryTitle"
import PopupBase from "../../molecules/PopupBase"

interface Props {
  onClose: () => void
}

const ContactPopup = ({ onClose } : Props) => {
    return (
        <PopupBase>
            <div className='flex justify-between border-b pb-4 mb-4'>
                <Title titleA="<Contac" titleB="tame/>" subTitle="" titleClassName="text-3xl" changeColorOnHover={true}></Title>
                <button onClick={onClose} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="flex flex-col">
                <div>
                    <SecondaryTitle title="Mis principales redes de contacto: "></SecondaryTitle>
                    <ContactButtons></ContactButtons>
                </div>
                <div className="mt-4">
                    <SecondaryTitle title="Enviame un correo"></SecondaryTitle>

                    <div>
                        <form action="" className="grid grid-cols-2 gap-6 p-5">
                            <div className="relative z-0 w-full mb-5 group col-span-1">
                                <input type="text" name="floating_subject" id="floating_subject" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_subject" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Asunto</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-1">
                                <input type="text" name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-2">
                                <textarea name="floating_message" id="floating_message" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required></textarea>
                                <label htmlFor="floating_message" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mensaje</label>
                            </div>
                            <div className="col-span-1">
                                <input type="submit" value="Enviar correo" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PopupBase>
    )
}

export default ContactPopup