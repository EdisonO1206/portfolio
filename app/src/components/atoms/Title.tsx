import React from 'react'

interface Props{
    titleA?: string;
    titleB?: string;
    subTitle?: string;
    inlineTitles?: boolean;
    changeColorOnHover?: boolean;
    titleClassName?: string;
    subTitleClassName?: string;
    containerClass?: string;
}

const Title = ({ containerClass, titleA = "E", titleB="O", subTitle = "dev", inlineTitles = true, changeColorOnHover, subTitleClassName, titleClassName } : Props) => {
    return (
        <div className={`flex ${inlineTitles ? "flex-row" : "flex-col"} ${containerClass}`}>
            <div className={`font-extrabold text-5xl bungee ${titleClassName} ${changeColorOnHover ? 'hover:text-blue-600 transition-all cursor-pointer' : ''}`}>
                <span className='hover:text-4xl transition-all'>{titleA}</span>
                <span className='hover:text-4xl transition-all'>{titleB}</span>
            </div>
            <span className={`text-sm ${subTitleClassName}`}>{subTitle}</span>
        </div>
    )
}

export default Title