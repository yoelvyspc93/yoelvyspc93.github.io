'use client';
import { InputField } from '@/components/common/Form/InputField';
import { TextAreaField } from '@/components/common/Form/TextAreaField';
import styles from './Contact.module.scss';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Footer } from '@/components/common/Footer';
import { socialLinks } from '@/constants/social';
import { CONTACT } from '@/constants/content';

export function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.contactContainer}>
        <section
          id="contact"
          aria-label={CONTACT.title}
          className={styles.contact}
        >
          <div className={styles.container}>
            <div className={styles.content}>
              <h2 className={styles.title}>{CONTACT.title}</h2>
              <div className={styles.description}>
                {CONTACT.description.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
              <ul className={styles.info}>
                {socialLinks.map((sm) => (
                  <li key={sm.platform} className={styles.infoItem}>
                    <a
                      aria-label={`link to ${sm.platform}`}
                      href={sm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {sm.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <form className={styles.form}>
              <InputField
                label={CONTACT.form.email.label}
                type="email"
                id="email"
                value={email}
                onChange={setEmail}
              />
              <TextAreaField
                label={CONTACT.form.message.label}
                placeholders={CONTACT.form.message.placeholder}
                id="message"
                value={message}
                onChange={setMessage}
              />
              <Button type="submit" className={styles.button}>
                {CONTACT.form.submit}
              </Button>
            </form>
          </div>
          <Footer />
        </section>
      </div>
    </div>
  );
}
