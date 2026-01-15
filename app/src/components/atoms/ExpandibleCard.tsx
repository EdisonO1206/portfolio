'use client'
import React from "react"

interface Props {
  title: string
  image: any
  children: React.ReactNode
  className?: string
  expanded: boolean
  onToggle: () => void
  containerClassName?: string;
}

const ExpandibleCard = ({
  children,
  image,
  title,
  className,
  expanded,
  onToggle,
  containerClassName
}: Props) => {
  return (
    <>
        <div className={`block focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 ${containerClassName}`}>
            <button
                className={`cursor-pointer group w-full hover:scale-105 transition-all duration-300 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
                onClick={onToggle}
            >
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p className="group-hover:rotate-[360deg] flex items-center justify-center w-full transition-all duration-500 text-xl text-gray-700 dark:text-gray-400 text-center">
                    {image}
                </p>
            </button>
        </div>

        {expanded && (
            <div className="absolute left-0 top-0 w-full">
                {children}
            </div>
        )}
    </>
  )
}

export default ExpandibleCard