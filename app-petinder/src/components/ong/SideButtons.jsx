import { IoIosSettings } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { PiChatCircleText, PiChartLineUp } from "react-icons/pi";
import { IoSettingsOutline, IoPawOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";

const iconMap = {
    Home: GoHome,
    Interessados: HiOutlineUserGroup,
    Dash: PiChartLineUp,
    Pets: IoPawOutline,
    Config: IoSettingsOutline
};

export default function SideButtons({ nameButton, icon, path }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === path;
    const IconComponent = iconMap[icon];

    return (
         <div
            className={`buttonsContainer ${isActive ? "activeButton" : ""}`}
            onClick={() => navigate(path)}
        >
            {IconComponent && <IconComponent size={24} className="iconFixed" />}
            <span className="test">{nameButton}</span>
        </div>
    );
}