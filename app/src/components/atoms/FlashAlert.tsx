'use client'

import React, { useEffect, useState } from "react";

interface Props{
    text: string;
    duration?: number;
    changeText: any;
}

const FlashAlert = ( { text, duration = 2000, changeText } : Props ) => {

    useEffect(() => {
        const timer = setTimeout(() => changeText(''), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (text.trim() == '') return null;

    return (
        <div className='text-xs mt-2'>
            { text }
        </div>
    )
}

export default FlashAlert