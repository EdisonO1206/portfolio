import CustomSelect from "../atoms/CustomSelect";

interface Props{
    page: number;
    limit: number;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const PaginationButtons = ({ hasNextPage, onPageChange, page, limit, onLimitChange } : Props) => {
    const options = [5, 10, 20, 50]

    return (
        <nav aria-label="Page navigation" className='mt-4 flex flex-col md:flex-row items-center justify-between w-full'>

            <div className="w-1/12"></div>

            <ul className="flex justify-center items-center w-10/12 -space-x-px text-sm">
                <li>
                    <button 
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        className="cursor-pointer transition-all duration-300 rounded-l-md flex items-center justify-center text-blue-500 hover:bg-gray-800 border text-sm w-11 h-11 focus:outline-none"
                    >

                        <span className="sr-only">Previous</span>
                        <svg className="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/></svg>
                    </button>
                </li>
                
                <li>
                    <span className="px-10 py-2">Página {page}</span>
                </li>

                <li>
                    <button 
                        disabled={!hasNextPage}
                        onClick={() => onPageChange(page + 1)}
                        className="cursor-pointer transition-all duration-300 rounded-r-md flex items-center justify-center text-blue-500 hover:bg-gray-800 border text-sm w-11 h-11 focus:outline-none"
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
                    </button>
                </li>
            </ul>

            <CustomSelect 
                name="limit"
                title="Registros"
                isEdit={false}
                options={options}
                selected={`${limit}`}
                onChangeValue={(e: any) => {onLimitChange(e.target.value)}}
                className="md:w-32 translate-y-3"
            />
        </nav>
    )
}

export default PaginationButtons