import { url } from "./provider/apiInstance";

const reqs = {
    listarPetsDisponiveis: async function (userId) {
        try {
            const response = await url.get(`/status/default/${userId}`); // <-- Adicione await aqui
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
                return true;
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
        return false;
    },
};

export default reqs;