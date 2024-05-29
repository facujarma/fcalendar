import { MdNavigateBefore } from "react-icons/md"
import { useNavigate } from "react-router-dom"

function Header({ title, description }) {
    const navigate = useNavigate()
    return (
        <header className="max-w-sm">
            <div className="flex items-center gap-2">
                <MdNavigateBefore
                    className="text-3xl text-white"
                    onClick={() => navigate("/")}
                    cursor="pointer"
                />
                <h1 className="text-2xl text-white font-bold">{title}</h1>
            </div>
            <p className="text-sm text-[#ABABAB] mt-2 ml-9 text-pretty">
                {description}
            </p>
        </header>
    )
}

export default Header