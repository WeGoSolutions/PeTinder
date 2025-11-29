import React, { useState } from 'react';
import styles from './teste.module.css';
import FormInput from '../components/FormInput';
import { convertImagesToBase64 } from '../utils/utils';
import { url } from '../provider/apiInstance';

function Teste() {
    const [formData, setFormData] = useState({
        nome: '',
        peso: '',
        altura: '',
        curtidas: '',
        descricao: '',
        imagemBase64: [], // Agora é uma lista
    });

    const tags = ["Vacinado", "Brincalhão", "Amigável", "Inteligente", "Protetor", "Leal", "Carinhoso"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (event) => {
        const files = event.target.files;

        try {
            const base64Images = await convertImagesToBase64(files);
            setFormData((prevData) => ({
                ...prevData,
                imagemBase64: [...prevData.imagemBase64, ...base64Images],
            }));
        } catch (error) {
            console.error('Erro ao processar as imagens:', error);
        }
    };

const handleSubmit = async () => {
    const payload = {
        idade: 3,
        nome: formData.nome,
        peso: parseFloat(formData.peso),
        altura: parseFloat(formData.altura),
        curtidas: parseInt(formData.curtidas, 10),
        tags: tags,
        descricao: formData.descricao,
        imagemBase64: formData.imagemBase64,
    };

    try {
        const response = await url.post('/pets', payload);
    } catch (error) {
        console.error('Erro ao cadastrar o pet:', error);
    }
};

    return (
        <div className={styles.container}>
            <div className={styles.area}>
                <FormInput
                    id="nome"
                    name="nome"
                    label="Nome do Pet"
                    type="text"
                    required
                    onChange={handleInputChange}
                />
                <FormInput
                    id="peso"
                    name="peso"
                    label="Peso do Pet"
                    type="number"
                    required
                    onChange={handleInputChange}
                />
                <FormInput
                    id="altura"
                    name="altura"
                    label="Altura do Pet"
                    type="number"
                    required
                    onChange={handleInputChange}
                />
                <FormInput
                    id="curtidas"
                    name="curtidas"
                    label="Curtidas do Pet"
                    type="number"
                    required
                    onChange={handleInputChange}
                />
                <FormInput
                    id="descricao"
                    name="descricao"
                    label="Descrição do Pet"
                    type="text"
                    required
                    onChange={handleInputChange}
                />
                <div className={styles.inputGroup}>
                    <label htmlFor="imagem">Imagens do Pet</label>
                    <input
                        id="imagem"
                        name="imagem"
                        type="file"
                        accept="image/*"
                        multiple // Permite múltiplos arquivos
                        onChange={handleImageUpload}
                    />
                </div>
                {formData.imagemBase64.length > 0 && (
                    <div className={styles.preview}>
                        <p>Preview das Imagens:</p>
                        {formData.imagemBase64.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className={styles.imagePreview}
                            />
                        ))}
                    </div>
                )}
                <button className={styles.submitButton} onClick={handleSubmit}>
                    Cadastrar Pet
                </button>
            </div>
        </div>
    );
}

export default Teste;