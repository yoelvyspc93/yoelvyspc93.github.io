'use client';
import { InputField } from '@/components/common/Form/InputField';
import { TextAreaField } from '@/components/common/Form/TextAreaField';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './Contact.module.scss';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Footer } from '@/components/common/Footer';
import { socialLinks } from '@/constants/social';

export function Contact() {
  const { t } = useTranslation('contact');
  const description = t.raw('description') as string[];
  const messagePlaceholders = t.raw('form.message.placeholder') as string[];

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.contactContainer}>
        <section
          id="contact"
          aria-label={t('title')}
          className={styles.contact}
        >
          <div className={styles.container}>
            <div className={styles.content}>
              <h2 className={styles.title}>{t('title')}</h2>
              <div className={styles.description}>
                {description.map((item, index) => (
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
                label={t('form.email.label')}
                type="email"
                id="email"
                value={email}
                onChange={setEmail}
              />
              <TextAreaField
                label={t('form.message.label')}
                placeholders={messagePlaceholders}
                id="message"
                value={message}
                onChange={setMessage}
              />
              <Button type="submit" className={styles.button}>
                {t('form.submit')}
              </Button>
            </form>
          </div>
          <Footer />
        </section>
      </div>
    </div>
  );
}
