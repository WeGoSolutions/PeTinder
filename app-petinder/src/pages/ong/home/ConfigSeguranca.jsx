import { useNavigate } from "react-router-dom";
import "../../../components/components.css";
import FormInput from "../../../components/FormInput";
import SecondaryButton from "../../../components/SecondaryButton";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

export default function ConfigSeguranca() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        senhaAtual: "",
        novaSenha: "",
        confirmarSenha: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;

        if (formValues.novaSenha !== formValues.confirmarSenha) {
            alert("A nova senha e a confirmação não coincidem.");
            return;
        }

        axios.patch(`http://localhost:8080/ongs/${ongId}/senha`, {
            senhaAtual: formValues.senhaAtual,
            novaSenha: formValues.novaSenha
        })
        .then(() => {
            alert("Senha alterada com sucesso!");
            setFormValues({
                senhaAtual: "",
                novaSenha: "",
                confirmarSenha: ""
            });

            //POR UM NAVIGATE PARA A PÁGINA DE LOGIN
        })
        .catch(err => {
            console.error("Erro ao atualizar senha:", err);
            alert("Erro ao atualizar senha. Verifique se a senha atual está correta.");
        });
    };

    return (
        <div className="segurancaContainer">
            <div className="segurancaTitle">
                <h1>Segurança</h1>
                <h2>Mudança de senha</h2>
            </div>

            <div className="senhaAtual">
                <FormInput
                    id="senhaAtual"
                    name="senhaAtual"
                    label="Senha atual"
                    type="password"
                    value={formValues.senhaAtual}
                    onChange={handleChange}
                    required
                />
                <h3>
                    <IoMdInformationCircleOutline size={14}/> Esqueceu sua senha atual? Faça o processo de “Esqueci a senha” na tela de Login.
                </h3>
            </div>

            <div className="inputSenhas">
                <FormInput
                    id="novaSenha"
                    name="novaSenha"
                    label="Nova senha"
                    type="password"
                    value={formValues.novaSenha}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    id="confirmarSenha"
                    name="confirmarSenha"
                    label="Confirmar senha"
                    type="password"
                    value={formValues.confirmarSenha}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="buttonsAct">
                <div onClick={handleSubmit}>
                    <SecondaryButton type="button" text="Salvar"/>
                </div>
            </div>
        </div>
    );
}








//COM O TOAST
// import { useNavigate } from "react-router-dom";
// import "../../../components/components.css";
// import FormInput from "../../../components/FormInput";
// import SecondaryButton from "../../../components/SecondaryButton";
// import { IoMdInformationCircleOutline } from "react-icons/io";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Toast from "../../../components/Toast";

// export default function ConfigSeguranca() {
//     const navigate = useNavigate();

//     const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });

//     const [formValues, setFormValues] = useState({
//         senhaAtual: "",
//         novaSenha: "",
//         confirmarSenha: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = () => {
//         const ongId = sessionStorage.getItem("ongId");
//         if (!ongId) return;

//         if (formValues.novaSenha !== formValues.confirmarSenha) {
//             setToast({
//                 mensagem: 'A nova senha e a confirmação não coincidem.',
//                 tipo: 'erro'
//             });
//             return;
//         }

//         axios.patch(`http://localhost:8080/ongs/${ongId}/senha`, {
//             senhaAtual: formValues.senhaAtual,
//             novaSenha: formValues.novaSenha
//         })
//             .then(() => {
//                 setToast({
//                     mensagem: 'Senha alterada com sucesso!',
//                     tipo: 'sucesso'
//                 });

//                 setFormValues({
//                     senhaAtual: "",
//                     novaSenha: "",
//                     confirmarSenha: ""
//                 });
//             })
//             .catch(err => {
//                 console.error("Erro ao atualizar senha:", err);
//                 setToast({
//                     mensagem: 'Erro ao atualizar senha. Verifique se a senha atual está correta.',
//                     tipo: 'erro'
//                 });
//             });
//     };

//     // Faz o Toast desaparecer automaticamente após 3 segundos
//     useEffect(() => {
//         if (toast.mensagem) {
//             const timer = setTimeout(() => {
//                 setToast({ mensagem: '', tipo: 'sucesso' });
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [toast.mensagem]);

//     return (
//         <div className="segurancaContainer">
//             <div className="segurancaTitle">
//                 <h1>Segurança</h1>
//                 <h2>Mudança de senha</h2>
//             </div>

//             <div className="senhaAtual">
//                 <FormInput
//                     id="senhaAtual"
//                     name="senhaAtual"
//                     label="Senha atual"
//                     type="password"
//                     value={formValues.senhaAtual}
//                     onChange={handleChange}
//                     required
//                 />
//                 <h3>
//                     <IoMdInformationCircleOutline size={14} /> Esqueceu sua senha atual? Faça o processo de “Esqueci a senha” na tela de Login.
//                 </h3>
//             </div>

//             <div className="inputSenhas">
//                 <FormInput
//                     id="novaSenha"
//                     name="novaSenha"
//                     label="Nova senha"
//                     type="password"
//                     value={formValues.novaSenha}
//                     onChange={handleChange}
//                     required
//                 />

//                 <FormInput
//                     id="confirmarSenha"
//                     name="confirmarSenha"
//                     label="Confirmar senha"
//                     type="password"
//                     value={formValues.confirmarSenha}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="buttonsAct">
//                 <div onClick={handleSubmit}>
//                     <SecondaryButton type="button" text="Salvar" />
//                 </div>
//             </div>

//             {/* Toast aparece aqui se houver mensagem */}
//             {toast.mensagem && (
//                 <Toast mensagem={toast.mensagem} tipo={toast.tipo} />
//             )}
//         </div>
//     );
// }

