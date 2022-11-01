/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { HTMLAttributes } from 'react';
import styles from './Footer.module.scss';
import { ReactComponent as FacebookIcon } from '../../assets/icons/FacebookIcon.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/TwitterIcon.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/InstagramIcon.svg';
import { ReactComponent as BlueLogoIcon } from '../../assets/icons/blueLogoIcon.svg';

export interface IFooterProps extends HTMLAttributes<HTMLDivElement> {}

const Footer = ({ ...props }: IFooterProps) => (
  <div className={styles.footerContainer}>
    <div className={styles.FooterWrapper}>
      <div className={styles.FooterLinks}>
        <div className={styles.FooterTitle}>
          <BlueLogoIcon />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
        <div className={styles.FooterCategories}>
          <p className={styles.FooterCategoryTitle}>Services</p>
          <div>
            <p>Who we are</p>
            <p>What do I need</p>
            <p>Start earning</p>
            <p>Benefits for Notaries</p>
          </div>
        </div>
        <div className={styles.FooterCategories}>
          <p className={styles.FooterCategoryTitle}>About</p>
          <div>
            <p>Our Story</p>
            <p>Benefits</p>
            <p>Team</p>
            <p>Careers</p>
          </div>
        </div>
        <div className={styles.FooterCategories}>
          <p className={styles.FooterCategoryTitle}>Follow Us</p>
          <div>
            <div className={styles.iconWrapper}>
              <FacebookIcon />
              <p>Facebook</p>
            </div>
            <div className={styles.iconWrapper}>
              <TwitterIcon />
              <p>Twitter</p>
            </div>
            <div className={styles.iconWrapper}>
              <InstagramIcon />
              <p>Instagram</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright © 2020. LogoIpsum. All rights reserved.</p>
        <div>
          <p>Terms & Conditions</p>
          <p className={styles.policyText}>Privacy Policy</p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
