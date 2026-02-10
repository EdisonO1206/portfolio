import Title from "../../atoms/Title";
import PopupBase from "../../molecules/PopupBase";
import Button from "../../atoms/Button";
import React from "react";

interface Props{
    onConfirm: () => void;
    onCancel: () => void;
    loading: boolean;
    errorMessage?: string;
}

const ConfirmationPopup = ( { onCancel, onConfirm, loading, errorMessage } : Props ) => {
    return (
        <PopupBase className="z-50">
            <div className="flex py-10 flex-col items-center justify-center">
                <Title 
                    titleA="<Acción "
                    titleB="Irreversible/>"
                    subTitle="¿Estás seguro de realizar esta acción?"
                    inlineTitles={false}
                    titleClassName="text-xl md:text-5xl"
                    subTitleClassName="text-center mt-4"
                    changeColorOnHover={true}                
                />

                {errorMessage?.trim() !== '' && (
                    <p className="text-red-500">{errorMessage}</p>
                )}

                <div className="flex justify-between mt-10 w-1/2">
                    <Button
                        text="Confirmar"
                        base={true}
                        disabled={loading}
                        onClickButton={() => { onConfirm() }}
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