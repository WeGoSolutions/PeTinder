import { HiOutlineEmojiSad } from "react-icons/hi";
import reqs from "../../reqs";

function ChatFooter(props) {
    const handleNoInterest = async () => {
        const result = await reqs.removeInterest(props.petId);
        
        if (result.success) {
            window.location.reload();
        } else {
            console.error("Erro ao remover interesse:", result.message);
        }
    };

    return (
        <div className="chatFooterNoChat">
            <button type="button" onClick={handleNoInterest}>
                <HiOutlineEmojiSad size={30} />
                <p>Não tenho mais interesse</p>
            </button>
        </div>
    )
}

export default ChatFooter;