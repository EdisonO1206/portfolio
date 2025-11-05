import Title from "../../atoms/Title"
import PopupBase from "../../molecules/PopupBase"

interface Props {
  onClose: () => void
}

const AboutPopup = ({ onClose }: Props) => {
    return (
        <PopupBase>
            <div className='flex justify-between border-b pb-4 mb-4'>
                <Title titleA="<Sobre " titleB="Mi/>" subTitle="" titleClassName="text-3xl" changeColorOnHover={true}></Title>
                <button onClick={onClose} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {[
                    "Me inicié en el mundo del desarrollo en 2020 con el objetivo de convertirme en un desarrollador full-stack. Empecé de forma autodidacta, creando proyectos personales para familiarizarme con distintas tecnologías, y en 2022 comencé mi formación académica formal como desarrollador de software.",
                    "Me especializo en PHP, Python y JavaScript, utilizando frameworks como Laravel, Symfony, Django, Flask, FastAPI, React (con Next.js y Vite) y Angular.",
                    "Mi enfoque principal está en el desarrollo backend y la automatización de procesos, aunque también disfruto trabajar en el frontend y la integración completa de aplicaciones.",
                    "Me considero una persona curiosa, perseverante y comprometida con el aprendizaje continuo. Creo firmemente que la tecnología es una herramienta poderosa para crear soluciones que generen impacto positivo."
                ].map((text, i) => (
                <div key={i} className="
                    bg-gray-950 border border-gray-800 rounded-md p-5 font-mono text-sm 
                    shadow-inner shadow-green-900/30 hover:shadow-lg 
                    hover:sha6ow-green-500/20 transition-all duration-500 relative
                ">
                    <span className="absolute top-2 left-3 text-green-600 opacity-60">C:\Users\Admin&gt;...</span>
                    <pre className="text-justify whitespace-pre-wrap leading-relaxed my-4">
                        {text}
                    </pre>
                    
                </div>
                ))}
            </div>
        </PopupBase>
    )
}

export default AboutPopup