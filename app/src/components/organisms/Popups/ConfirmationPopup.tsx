import Title from "../../atoms/Title";
import PopupBase from "../../molecules/PopupBase";
import Button from "../../atoms/Button";

interface Props{
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationPopup = ( { onCancel, onConfirm } : Props ) => {
    return (
        <PopupBase className="z-50">
            <div className="flex flex-col items-center justify-center">
                <Title 
                    titleA="<Acción "
                    titleB="Irreversible/>"
                    subTitle="¿Estás seguro de realizar esta acción?"
                    inlineTitles={false}
                    titleClassName="text-xl md:text-5xl"
                    subTitleClassName="text-center mt-4"
                    changeColorOnHover={true}                
                />

                <div className="flex justify-between mt-10 w-1/2">
                    <Button
                        text="Confirmar"
                        base={true}
                        onClickButton={onConfirm}
                    ></Button>
                    <Button
                        secondary={true}
                        text="Cancelar"
                        onClickButton={onCancel}
                    ></Button>
                </div>
            </div>
        </PopupBase>
    )
}

export default ConfirmationPopup