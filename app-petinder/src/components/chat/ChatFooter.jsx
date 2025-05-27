import { HiOutlineEmojiSad } from "react-icons/hi";

function ChatFooter(props) {
    return (
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
        <div className="chatFooterNoChat">
            <button>
                <HiOutlineEmojiSad size={30} />
                <p>Não tenho mais interesse</p>
            </button>
        </div>
    )
}

export default ChatFooter;