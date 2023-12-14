"use client";

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import { getProduct } from '@/services/api/product.api.js';

export default function Index() {

    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let product = await getProduct(id);
                if (product) {
                    setProduct(product.data);
                }
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false);
            }
        }
        if (id) {
            fetchProduct();
        }
    }, [id]);

    function onCloseModal() {
        setOpenModal(false);
        setUserForm();
    }

    const [userForm, setUserForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        product: id
    });

    //Creation du compte
    // const {fetchData, data, error, loading} = useFetch({url:'/auth/register', method:"POST", body:userForm, token:null})

    //Remplir les champs du formulaire
    const handleChange = (e) => {
        console.log(userForm)
        setUserForm({
        ...userForm,
        [e.target.name]: e.target.value
        })
    }

    // Quand on clique cela crée le compte
    const submitForm = (e) => {
        e.preventDefault();
        fetchData();
        if (data){
          alert('Merci pour votre confiance !')
        }
        // else (error)
        // console.log(error);
    }

    //A UTILISER QUAND LE SMTP MARCHE (EMAIL)
    // const submitForm = (e) => {
    //     e.preventDefault();
    //     fetchData();
    //     if (error){
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     if (data.success == true){
    //         alert('Merci pour votre confiance !')
    //     }
    // }, [data]);

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Je suis intéressé(e) !</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-3">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Inscription</h3>
                            <form onSubmit={(e) => {submitForm(e)}}>

                            <div className="mb-2 block">
                                <Label htmlFor="firstName" value="Votre prénom" />
                            </div>
                            <TextInput
                                id="firstName"
                                name="firstName"
                                value={userForm?.firstName}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <div className="mb-2 mt-2 block">
                                <Label htmlFor="nom" value="Votre nom" />
                            </div>
                            <TextInput
                                id="lastName"
                                name="lastName"
                                value={userForm?.lastName}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <div className="mb-2 mt-2 block">
                                <Label htmlFor="email" value="Votre email" />
                            </div>
                            <TextInput
                                id="email"
                                name="email"
                                value={userForm?.email}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <div className="mt-5 block">
                                <Button type="submit">S'inscrire</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>    
        </>
    );
    
}