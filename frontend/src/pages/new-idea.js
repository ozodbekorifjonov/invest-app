import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import * as emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

function NewIdea() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          if (result.text === 'OK') {
            toast.success('Email sent successfully!');
          }
        },
        (error) => {
          console.log(error);
          toast.error(error);
        }
      );
    form.current.reset();
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-10 offset-1">
            <h4>Send your idea</h4>
            <div className="card">
              <div className="card-body">
                <form ref={form} onSubmit={sendEmail}>
                  <div className="app-form-control">
                    <label>Name</label>
                    <input type="text" name="user_name" />
                  </div>
                  <div className="app-form-control">
                    <label>Email</label>
                    <input type="email" name="user_email" />
                  </div>
                  <div className="app-form-control">
                    <label>Message</label>
                    <textarea name="message" />
                  </div>
                  <div className="app-form-control">
                    <button className="app-form-button app-button-success text-decoration-none d-block text-black">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewIdea;
