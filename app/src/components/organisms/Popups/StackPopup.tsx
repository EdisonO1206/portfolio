import Title from "../../atoms/Title"
import PopupBase from "../../molecules/PopupBase"
import LineStack from "../../molecules/LineStack"
import SecondaryTitle from "../../atoms/SecondaryTitle"

interface Props {
  onClose: () => void
}

const StackPopup = ({ onClose } : Props) => {
    const languages = {
        python: "70%",
        php: "80%",
        javascript: "80%",
        typescript: "70%",
        jquery: "60%"
    }

    const frameworks = {
        django: "40%",
        fastapi: "70%",
        flask: "80%",
        laravel: "90%",
        symfony: "50%",
        react_vite: "70%",
        node_js: "70%",
        react_nextjs: "80%",
        angular: "60%"
    }

    const arquitectures = ["Atomic Design", "Microservicios", "MVC", "MVVM"]

    const databases = ["MySQL", "SQL Server", "MongoDB", "MariaDB", "Prisma", "PostgreSQL"]

    const methodologies = ["BEM", "Scrum", "Kanban"]

    const extras = ["Bootstrap", "TailwindCSS", "OAuth", "Middlewares", "Azure DevOps", "Suit Office", "Power BI", "Manejo de IA en desarrollo", "Agentes en flujos n8n", "Librerías", "Git", "GitHub", "Figma", "ISO 27000-1"]

    return (
        <PopupBase>
            <div className='flex justify-between border-b pb-4 mb-4'>
                <Title titleA="<Mi " titleB="Stack/>" subTitle="" titleClassName="text-3xl text-xl md:text-5xl" changeColorOnHover={true}></Title>
                <button onClick={onClose} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>


            {/* Languages */}
            <SecondaryTitle title="Lenguajes de programación"></SecondaryTitle>
            <div className="grid grid-cols-4 gap-6 mt-2 mb-4">
                {Object.entries(languages).map(object => (
                    <LineStack key={object[0]} percentage={object[1]} title={object[0]} className="col-span-4 md:col-span-2 lg:col-span-1"></LineStack>
                ))}
            </div>

            {/* Frameworks */}
            <SecondaryTitle title="Frameworks"></SecondaryTitle>
            <div className="grid grid-cols-4 gap-6 mt-2 mb-4">
                {Object.entries(frameworks).map(object => (
                    <LineStack key={object[0]} percentage={object[1]} title={object[0].replace("_", " ")} className="col-span-4 md:col-span-2 lg:col-span-1"></LineStack>
                ))}
            </div>

            {/* Arquitectures */}
            <SecondaryTitle title="Arquitecturas"></SecondaryTitle>
            <div className="grid grid-cols-4 gap-6 mt-2 mb-4">
                {arquitectures.map(o => (
                    <LineStack key={o} isVisiblePercentage={false} percentage="100%" title={o} className="col-span-4 md:col-span-2 lg:col-span-1"></LineStack>
                ))}
            </div>

            {/* Databases */}
            <SecondaryTitle title="Bases de datos"></SecondaryTitle>
            <div className="grid grid-cols-4 gap-6 mt-2 mb-4">
                {databases.map(o => (
                    <LineStack key={o} isVisiblePercentage={false} percentage="100%" title={o} className="col-span-4 md:col-span-2 lg:col-span-1"></LineStack>
                ))}
            </div>

            {/* Methodologies */}
            <SecondaryTitle title="Metodologías"></SecondaryTitle>
            <div className="grid grid-cols-4 gap-6 mt-2 mb-4">
                {methodologies.map(o => (
                    <LineStack key={o} isVisiblePercentage={false} percentage="100%" title={o} className="col-span-4 md:col-span-2 lg:col-span-1"></LineStack>
                ))}
            </div>

            {/* Extras */}
            <SecondaryTitle title="Extras"></SecondaryTitle>
            <div className="grid grid-cols-4 gap-6 mt-2 mb-4">
                {extras.map(o => (
                    <LineStack key={o} isVisiblePercentage={false} percentage="100%" title={o} className="col-span-4 md:col-span-2 lg:col-span-1"></LineStack>
                ))}
            </div>

        </PopupBase>
    )
}

export default StackPopup