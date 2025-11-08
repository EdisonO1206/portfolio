import Title from "../../atoms/Title"
import ContactButtons from "../../molecules/ContactButtons"
import SecondaryTitle from "../../atoms/SecondaryTitle"
import PopupBase from "../../molecules/PopupBase"
import CustomInput from "../../atoms/CustomInput"
import CustomTextarea from "../../atoms/CustomTextarea"
import CustomInputSubmit from "../../atoms/CustomInputSubmit"
import FormTemplate from "../../atoms/FormTemplate"

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

                    <FormTemplate>
                        <CustomInput
                            name="subject"
                            title="Asunto"
                            type="text"
                        ></CustomInput>
                        <CustomInput
                            name="name"
                            title="Nombre"
                            type="text"
                        ></CustomInput>
                        <CustomTextarea
                            name="message"
                            title="Mensaje"
                        ></CustomTextarea>
                        <CustomInputSubmit
                            showPlane={true}
                        ></CustomInputSubmit>
                    </FormTemplate>
                </div>
            </div>
        </PopupBase>
    )
}

export default ContactPopup