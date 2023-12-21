"use client";

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import emailjs from '@emailjs/browser'

export default function Index() {

    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
        setUserForm();
    }

    const [userForm, setUserForm] = useState({
        productId : Number(id),
        fname : '',
        lname : '',
        email : '' ,
    });


console.log(userForm)

    //Remplir les champs du formulaire
    const handleChange = (e) => {
        console.log(userForm)
        setUserForm({
        ...userForm,
        [e.target.name]: e.target.value
        })
    }

    // A UTILISER QUAND LE SMTP MARCHE (EMAIL)
    const submitForm = async (e) => {
        e.preventDefault();

        emailjs.sendForm('service_myr85yk', 'template_37c4bzs', e.target, 'Q3QhFw4kOWDePSZFD')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        const data = await fetch("http://localhost:3030/api/products/interested",{
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: `fname=${userForm.fname}&lname=${userForm.lname}&email=${userForm.email}&interestingProducts=${userForm.productId}`,
            }
          );

          const body = await data.json();

          if (body.error) {
            console.error(body.error);
          }
          if (body){
            console.log('ok reussit')
            setOpenModal(!openModal)
          }

    }

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
                                id="fname"
                                name="fname"
                                value={userForm?.fname}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <div className="mb-2 mt-2 block">
                                <Label htmlFor="nom" value="Votre nom" />
                            </div>
                            <TextInput
                                id="lname"
                                name="lname"
                                value={userForm?.lname}
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