import { HiOutlineEmojiSad } from "react-icons/hi";
import { url } from "../../provider/apiInstance"; // ajuste o caminho se necessário

function ChatFooter(props) {
    const handleNoInterest = async () => {
        const userId = sessionStorage.getItem("userId");
        const petId = props.petId;
        // console.log("petId:", petId, "userId:", userId); // debug
        if (!userId || !petId) return;
        try {
            await url.delete(`/status/${petId}/${userId}`);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao remover interesse:", error);
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


// <div className="chatFooter">
//     <div className="chatInput">
//         <input type="text" />
//     </div>
//     <div className="chatFooterButtons">
//         <button>
//             <img src="../../enviar.svg" alt="" />
//         </button>
//     </div>
// </div>