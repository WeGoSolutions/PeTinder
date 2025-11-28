import axios from "axios";
import { url } from "./provider/apiInstance";

const reqs = {
    listarPetsDisponiveis: async function (userId, page = 0, size = 10) {
        try {
            const response = await url.get(`/status/default/${userId}`, {
                params: { page, size }  
            });
            console.log("listarPetsDisponiveis response:", response);
            return {
                data: response.data,
                notFound: false
            };
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return { notFound: true };
            } else {
                console.error("Error fetching pets:", error);
                return { notFound: false };
            }
        }
    },

    getImagensPets: async function (petId) {
        try {
            const response = await url.get(`/pets/${petId}/imagens`);
            return response.data;
        } catch (error) {
            console.error("Error fetching pet images:", error);
            return [];
        }
    },

    listarPetsDaOng: async function (ongId, page = 0, size = 10) {
        try {
            const response = await url.get(`/ongs/${ongId}/pets`, {
                params: { page, size }
            });
            return {
                data: response.data,
                notFound: false
            };
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return { notFound: true };
            } else {
                console.error("Error fetching pets:", error);
                return { notFound: false };
            }
        }
    },

    getTodasImagensPet: async function (petId, totalImagens) {
        try {
            const promises = [];
            for (let i = 0; i < totalImagens; i++) {
                promises.push(url.get(`/pets/${petId}/imagens/${i}`));
            }

            const responses = await Promise.all(promises);
            return responses.map(response => response.data);
        } catch (error) {
            console.error("Error fetching all pet images:", error);
            return [];
        }
    },

    handleCloseModal: async function () {
        const userId = sessionStorage.getItem("userId");
        const authToken = sessionStorage.getItem("authToken");

        if (!userId) {
            return false;
        }

        try {
            const response = await url.patch(`/users/${userId}/user-novo`, null, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                sessionStorage.setItem("isNew", "false");
                return true;
            }
        } catch (error) {
            console.error("Erro ao atualizar o status de novo usuário:", error);
        }
        return false;
    },

    handleSubmit: async function (formValues) {
        const userId = sessionStorage.getItem("userId");
        const authToken = sessionStorage.getItem("authToken");

        if (!userId) {
            return false;
        }

        const formValuesToSend = {
            ...formValues,
            cpf: formValues.cpf.replace(/[^\d]/g, ""),
            cep: formValues.cep.replace(/[^\d]/g, "")
        };

        try {
            const response = await url.put(`/users/${userId}/optional`, formValuesToSend, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                await reqs.handleCloseModal();
                window.location.reload();
                return { success: true };
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            return {
                success: false,
                error: error
            };
        }
        return { success: false };
    },

    likedArea: async function (userId) {
        try {
            const response = await url.get(`/status/${userId}/LIKED`);
            return {
                data: Array.isArray(response.data) ? response.data : [],
                success: true
            };
        } catch (error) {
            console.error("Erro ao buscar pets curtidos:", error);
            return {
                data: [],
                success: false,
                error: error
            };
        }
    },

    validarEmailNoBackend: async function (email) {
        try {
            const response = await url.get(`/users/${email}/validar-email`);
            return response.status === 200;
        } catch (error) {
            console.error("Email não encontrado no banco de dados.", error);
            return false;
        }
    },

    changePassword: async function (novaSenha, email) {
        try {
            await url.patch(`/users/${email}/senha`, {
                senhaAtual: "", // Para "esqueci a senha", pode ser vazio ou um valor especial
                novaSenha: novaSenha
            });
            return {
                success: true,
                message: 'Senha atualizada com sucesso!'
            };
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            return {
                success: false,
                message: 'Erro ao atualizar a senha. Tente novamente.',
                error: error
            };
        }
    },

    getUserImage: async function (userId) {
        try {
            const response = await url.get(`/users/${userId}`);
            return {
                success: true,
                imagemUrl: response.data.imagemUrl
            };
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    imagemUrl: false,
                    notFound: true
                };
            } else {
                return {
                    success: false,
                    imagemUrl: false,
                    error: error
                };
            }
        }
    },

    getPendingChats: async function (userId) {
        try {
            const response = await url.get(`/status/pending/ong/${userId}`);
            return {
                success: true,
                data: Array.isArray(response.data) ? response.data : []
            };
        } catch (error) {
            console.error("Erro ao buscar chats pendentes:", error);
            return {
                success: false,
                data: [],
                error: error
            };
        }
    },

    saveUserAndOngImage: async function (base64Image) {
        try {
            const userId = sessionStorage.getItem("userId");
            const ongId = sessionStorage.getItem("ongId");

            if (ongId) {
                await url.put(`/ongs/${ongId}/imagem`, { imagem: base64Image });
            } else if (userId) {
                await url.post(`/users/${userId}/imagem`, { imagemUsuario: base64Image });
            } else {
                return {
                    success: false,
                    message: "Nenhum ID de usuário ou ONG encontrado."
                };
            }

            return {
                success: true,
                message: "Imagem salva com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao salvar imagem:", error);
            return {
                success: false,
                message: "Erro ao salvar imagem.",
                error: error
            };
        }
    },

    getOngImageForChat: async function (ongId) {
        try {
            const response = await url.get(`/ongs/${ongId}/imagem/arquivo`);
            return {
                success: true,
                imageUrl: response.data?.imageUrl || ""
            };
        } catch (error) {
            console.error("Erro ao buscar imagem da ONG:", error);
            return {
                success: false,
                imageUrl: "",
                error: error
            };
        }
    },

    getPetInfosAndOngImage: async function (petId) {
        try {
            // Busca o pet para pegar o ongId
            const petRes = await url.get(`/pets/${petId}`);
            const ongId = petRes.data.ongId;

            if (!ongId) {
                return {
                    success: false,
                    imageUrl: "",
                    message: "ONG ID não encontrado para este pet"
                };
            }

            // Busca a imagem da ONG
            const ongRes = await url.get(`/ongs/${ongId}/imagem/arquivo`);
            return {
                success: true,
                imageUrl: ongRes.data?.imageUrl || "",
                ongId: ongId
            };
        } catch (error) {
            console.error("Erro ao buscar pet e imagem da ONG:", error);
            return {
                success: false,
                imageUrl: "",
                error: error
            };
        }
    },

    removeInterest: async function (petId) {
        try {
            const userId = sessionStorage.getItem("userId");

            if (!userId || !petId) {
                return {
                    success: false,
                    message: "ID do usuário ou pet não encontrado."
                };
            }

            await url.delete(`/status/${petId}/${userId}`);
            return {
                success: true,
                message: "Interesse removido com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao remover interesse:", error);
            return {
                success: false,
                message: "Erro ao remover interesse.",
                error: error
            };
        }
    },

    getPendingForChatsArea: async function (userId) {
        try {
            const response = await url.get(`/status/pending/ong/${userId}`);
            return {
                success: true,
                data: Array.isArray(response.data) ? response.data : []
            };
        } catch (error) {
            console.error("Erro ao buscar chats pendentes:", error);
            return {
                success: false,
                data: [],
                error: error
            };
        }
    },

    getDashboardAdotadosENao: async function (ongId) {
        try {
            const response = await url.get(`/dashs/adotados-ou-nao/${ongId}`);
            return {
                success: true,
                data: {
                    adotados: response.data.adotados,
                    naoAdotados: response.data.naoAdotados
                }
            };
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            return {
                success: false,
                data: {
                    adotados: 0,
                    naoAdotados: 0
                },
                error: error
            };
        }
    },

    getDashboardRanking: async function (ongId) {
        try {
            const response = await url.get(`/dashs/ranking/${ongId}`);
            const labels = response.data.map((item) => item.nome);
            const data = response.data.map((item) => item.curtidas);

            return {
                success: true,
                data: {
                    labels: labels,
                    curtidas: data,
                    rawData: response.data
                }
            };
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            return {
                success: false,
                data: {
                    labels: [],
                    curtidas: [],
                    rawData: []
                },
                error: error
            };
        }
    },

    getDashboardPendenciasBadges: async function (ongId) {
        try {
            const response = await url.get(`/dashs/pendencias/${ongId}`);
            return {
                success: true,
                data: Array.isArray(response.data) ? response.data : []
            };
        } catch (error) {
            console.error("Erro ao buscar pendências:", error);
            return {
                success: false,
                data: [],
                error: error
            };
        }
    },

    marcarPetComoAdotado: async function (petId, idAdotante) {
        try {
            await url.post(`/status/adopted/${petId}/${idAdotante}`);
            return {
                success: true,
                message: "Pet marcado como adotado com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao marcar como adotado:", error);
            return {
                success: false,
                message: "Erro ao marcar como adotado",
                error: error
            };
        }
    },

    marcarComoAdotadoExterno: async function (petId) {
        try {
            await url.post(`/status/adopted/${petId}/11111111-1111-1111-1111-111111111111`);
            return {
                success: true,
                message: "Pet marcado como adotado externamente com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao marcar como adotado:", error);
            return {
                success: false,
                message: "Erro ao marcar como adotado",
                error: error
            };
        }
    },

    voltarParaAdocao: async function (petId, adotanteIdToDelete) {
        try {
            await url.delete(`/status/${petId}/${adotanteIdToDelete}`);
            return {
                success: true,
                message: "Pet voltou para adoção com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao voltar para adoção:", error);
            return {
                success: false,
                message: "Erro ao voltar para adoção",
                error: error
            };
        }
    },

    getMensagensPendentesPetCard: async function (ongId, nomePet) {
        try {
            const response = await url.get(`/ongs/${ongId}/mensagens-pendentes`);
            const dados = response.data;
            const mensagensDoPet = Array.isArray(dados)
                ? dados
                    .filter(msg => msg.nomePet === nomePet || msg.petNome === nomePet)
                    .map(msg => {
                        const idOng = msg.idOng;
                        const userId = msg.userId;
                        const petId = msg.petId;
                        const userName = msg.userName;
                        const petNome = msg.nomePet || msg.petNome;
                        return { ...msg, idOng, userId, petId, userName, petNome };
                    })
                : [];
            return {
                success: true,
                data: mensagensDoPet
            };
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            return {
                success: false,
                data: [],
                error: error
            };
        }
    },

    fetchAdotanteInfoPetCard: async function (petId) {
        try {
            const res = await url.get(`/status/adopted/${petId}`);
            return {
                success: true,
                data: res.data
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                error: error
            };
        }
    },

    getOngImageSidePanel: async function (ongId) {
        try {
            const res = await url.get(`/ongs/${ongId}/imagem/arquivo`);
            return {
                success: true,
                imageUrl: res.data.imageUrl
            };
        } catch (error) {
            console.error("Erro ao buscar imagem da ONG:", error);
            return {
                success: false,
                imageUrl: "",
                error: error
            };
        }
    },

    CadastrarUsuario: async function (userData) {
        try {
            await url.post("/users", {
                nome: userData.nome,
                email: userData.email,
                senha: userData.senha,
                dataNasc: userData.dataNasc,
                userNovo: true,
                maiorDe21: true,
            });
            return {
                success: true,
                message: "Usuário criado com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return {
                success: false,
                message: "Erro ao criar usuário",
                error: error
            };
        }
    },

    getUserDataConfig: async function (userId) {
        try {
            const res = await url.get(`/users/${userId}`);
            const data = res.data;

            const maskCPF = (value) => {
                return (value || "")
                    .replace(/\D/g, "")
                    .slice(0, 11)
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            };

            const maskCEP = (value) => {
                return (value || "")
                    .replace(/\D/g, "")
                    .slice(0, 8)
                    .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
            };

            const loadedValues = {
                nome: data.nome || "",
                email: data.email || "",
                cpf: maskCPF(data.cpf),
                dataNascimento: data.dataNascimento || "",
                cep: maskCEP(data.cep) || "",
                rua: data.rua || "",
                complemento: data.complemento || "",
                numero: data.numero || "",
                cidade: data.cidade || "",
                uf: data.uf || "",
                imagemUrl: data.imagemUrl || ""
            };

            return {
                success: true,
                data: loadedValues
            };
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            return {
                success: false,
                data: null,
                error: error
            };
        }
    },

    changePasswordConfig: async function (userId, senhaAtual, novaSenha) {
        try {
            await url.patch(`/users/${userId}/senha`, {
                senhaAtual: senhaAtual,
                novaSenha: novaSenha
            });

            return {
                success: true,
                message: "Senha atualizada com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);

            let errorType = "generic";
            if (error.response && error.response.status === 409) {
                errorType = "wrongCurrentPassword";
            }

            return {
                success: false,
                message: "Erro ao atualizar a senha",
                error: error,
                errorType: errorType
            };
        }
    },

    deleteUserAccountConfig: async function (userId) {
        try {
            await url.delete(`/users/${userId}`);
            return {
                success: true,
                message: "Conta deletada com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            return {
                success: false,
                message: "Erro ao deletar conta.",
                error: error
            };
        }
    },

    updateUserDataConfig: async function (userId, payload, userName) {
        try {
            await url.patch(`/users/${userId}`, payload);
            return {
                success: true,
                message: "Dados atualizados com sucesso!",
                userName: userName
            };
        } catch (error) {
            console.error("Erro ao atualizar dados do usuário:", error);

            if (error.response && error.response.status === 409) {
                return {
                    success: false,
                    message: "O CPF informado já está em uso. Por favor, verifique e tente novamente.",
                    error: error
                };
            }

            return {
                success: false,
                message: "Erro ao atualizar dados do usuário.",
                error: error
            };
        }
    },

    uploadUserImageInitial: async function (userId, base64Image, authToken) {
        try {
            await url.post(`/users/${userId}/imagem`, {
                imagemUsuario: base64Image
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            });
            return {
                success: true,
                message: "Imagem do usuário enviada com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao enviar imagem do usuário:", error);
            return {
                success: false,
                message: "Erro ao enviar imagem do usuário",
                error: error
            };
        }
    },

    getUserAddressInitial: async function (userId) {
        try {
            const response = await url.get(`/users/${userId}`);
            const data = response.data;

            if (data.cep) {
                return {
                    success: true,
                    data: {
                        cep: data.cep,
                        rua: data.rua,
                        numero: data.numero,
                        cidade: data.cidade,
                        uf: data.uf,
                        complemento: data.complemento,
                    }
                };
            } else {
                return {
                    success: true,
                    data: null
                };
            }
        } catch (error) {
            console.error("Erro ao buscar endereço do usuário:", error);
            return {
                success: false,
                data: null,
                error: error
            };
        }
    },

    EnviarRequestdeAdocao: async function (petId, userId) {
        try {
            await url.post(`/status/pending/${petId}/${userId}`);
            return {
                success: true,
                message: "Solicitação de adoção enviada com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao enviar solicitação de adoção:", error);
            return {
                success: false,
                message: "Erro ao enviar solicitação de adoção",
                error: error
            };
        }
    },

    likePetInitial: async function (petId, userId) {
        try {
            await url.post(`/status/liked/${petId}/${userId}`);
            return {
                success: true,
                message: "Pet curtido com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao curtir o pet:", error);
            return {
                success: false,
                message: "Erro ao curtir o pet",
                error: error
            };
        }
    },

    getPetByIdInitial: async function (petId) {
        try {
            const response = await url.get(`/pets/${petId}?userId=${sessionStorage.getItem("userId")}`);
            console.log("getPetByIdInitial response:", response);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error("Erro ao buscar dados do pet:", error);
            return {
                success: false,
                data: null,
                error: error
            };
        }
    },

    LoginUser: async function (email, senha) {
        try {
            const response = await url.post("/users/login", {
                email: email,
                senha: senha
            });

            if (response.status === 200 && response.data?.token) {
                const data = response.data;
                return {
                    success: true,
                    data: {
                        id: data.id,
                        token: data.token,
                        nome: data.nome,
                        userNovo: data.userNovo
                    }
                };
            } else {
                return {
                    success: false,
                    errorType: "invalidCredentials",
                    message: "Credenciais inválidas"
                };
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return {
                success: false,
                errorType: "networkError",
                message: "Erro de rede ao fazer login",
                error: error
            };
        }
    },

    LoginOng: async function (email, senha) {
        try {
            const response = await url.post("/ongs/login", {
                email: email,
                senha: senha
            });

            if (response.status === 200) {
                const data = response.data;
                return {
                    success: true,
                    data: {
                        id: data.id,
                        nome: data.nome
                    }
                };
            } else {
                return {
                    success: false,
                    errorType: "invalidCredentials",
                    message: "Credenciais inválidas"
                };
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return {
                success: false,
                errorType: "networkError",
                message: "Erro de rede ao fazer login",
                error: error
            };
        }
    },

    AtualizarSenhaOngConfig: async function (ongId, senhaAtual, novaSenha) {
        try {
            await url.patch(`/ongs/${ongId}/senha`, {
                senhaAtual: senhaAtual,
                novaSenha: novaSenha
            });

            return {
                success: true,
                message: "Senha atualizada com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);

            let errorType = "generic";
            if (error.response && error.response.status === 409) {
                errorType = "wrongCurrentPassword";
            }

            return {
                success: false,
                message: "Erro ao atualizar a senha",
                error: error,
                errorType: errorType
            };
        }
    },

    getOngImageConfig: async function (ongId) {
        try {
            const response = await url.get(`/ongs/${ongId}/imagem/arquivo`);
            return {
                success: true,
                imageUrl: response.data.imageUrl
            };
        } catch (error) {
            console.error("Erro ao buscar imagem da ONG:", error);
            return {
                success: false,
                imageUrl: "",
                error: error
            };
        }
    },

    listarInfosDaOngEmConfig: async function (ongId) {
        try {
            const response = await url.get(`/ongs/${ongId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error("Erro ao buscar dados da ONG:", error);
            return {
                success: false,
                data: null,
                error: error
            };
        }
    },

    updateOngInfosConfig: async function (ongId, payload) {
        try {
            await url.patch(`/ongs/${ongId}`, payload);
            return {
                success: true
            };
        } catch (error) {
            console.error("Erro ao atualizar dados da ONG:", error);
            return {
                success: false,
                error: error
            };
        }
    },

    pegarCpfOuCnpjDaOng: async function (ongId) {
        try {
            const response = await url.get(`/ongs/${ongId}`);
            const data = response.data;
            return {
                success: true,
                data: {
                    cpf: data.cpf || "",
                    cnpj: data.cnpj || ""
                }
            };
        } catch (error) {
            console.error("Erro ao buscar documentos da ONG:", error);
            return {
                success: false,
                data: {
                    cpf: "",
                    cnpj: ""
                },
                error: error
            };
        }
    },

    dashboardInfosDosPets: async function (ongId) {
        try {
            const response = await url.get(`/ongs/${ongId}/pets`);
            return {
                success: true,
                pets: response.data
            };
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return {
                    success: true,
                    pets: []
                };
            } else {
                console.error('Erro ao buscar pets:', error);
                return {
                    success: false,
                    pets: [],
                    error: error
                };
            }
        }
    },

    homeOngCharts: async function (ongId) {
        try {
            const response = await url.get(`/ongs/${ongId}/pets`);
            return {
                success: true,
                pets: response.data
            };
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return {
                    success: true,
                    pets: []
                };
            } else {
                console.error('Erro ao buscar pets:', error);
                return {
                    success: false,
                    pets: [],
                    error: error
                };
            }
        }
    },

    interessadosMensagens: async function (ongId) {
        try {
            const response = await url.get(`/ongs/${ongId}/mensagens-pendentes`);
            const dados = response.data;
            return {
                success: true,
                mensagens: Array.isArray(dados) ? dados : []
            };
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            return {
                success: false,
                mensagens: [],
                error: error
            };
        }
    },

    editarInfosDoPet: async function (modo, editingPetId, payload) {
        try {
            if (modo === "Editar") {
                await url.put(`/pets/${editingPetId}`, payload);
            } else {
                await url.post("/pets", payload);
            }
            return {
                success: true,
                message: modo === "Editar" ? "Pet editado com sucesso!" : "Pet criado com sucesso!"
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: modo === "Editar" ? "Erro ao editar pet" : "Erro ao criar pet",
                error: error
            };
        }
    },

    // listarPetsDaOng: async function (ongId, page) {
    //     try {
    //         const response = await url.get(`/ongs/${ongId}/pets?page=${page}&size=10`);
    //         const petsData = Array.isArray(response.data) ? response.data.map(pet => ({
    //             id: pet.petId,
    //             nome: pet.petNome,
    //             src: pet.imageUrl && pet.imageUrl.length > 0 ? pet.imageUrl[0] : "",
    //             isAdopted: Array.isArray(pet.status) && pet.status.includes('ADOPTED'),
    //         })) : [];
    //         return {
    //             success: true,
    //             pets: petsData
    //         };
    //     } catch (error) {
    //         console.error("Erro ao buscar pets da ONG:", error);
    //         return {
    //             success: false,
    //             pets: [],
    //             error: error
    //         };
    //     }
    // },

    modalDeEdicao: async function (petId) {
        try {
            const response = await url.get(`/pets/${petId}`);
            return {
                success: true,
                pet: response.data
            };
        } catch (error) {
            console.error("Erro ao buscar pet para edição:", error);
            return {
                success: false,
                pet: null,
                error: error
            };
        }
    },

    deletarPet: async function (petId) {
        try {
            await url.delete(`/pets/${petId}`);
            return {
                success: true,
                message: "Pet deletado com sucesso!"
            };
        } catch (error) {
            console.error("Erro ao deletar pet:", error);
            return {
                success: false,
                message: "Erro ao deletar pet",
                error: error
            };
        }
    },

    //continuar do Teste.jsx - Até então tudo parece funcional
    // ong cadastrada: petinder@gmail.com - Felipe@00
    // user: felipe@hotmail.com - Felipe@00

};

export default reqs;